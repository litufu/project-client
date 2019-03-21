import { graphql } from 'react-apollo';
import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native'
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Icon, Title, Spinner } from 'native-base';

import { errorMessage } from '../../utils/tools'
import GET_COLLEAGUES from '../../graphql/get_colleagues.query'
import COLLEAGUES_ADDED_SUBSCRIPTION from '../../graphql/colleagues_added.subscription'
import { defaultAvatar } from '../../utils/settings';

class QureyColleagues extends Component {
    componentDidMount() {
        const { data: { refetch, subscribeToMore } } = this.props;

        this.unsubscribe = subscribeToMore({
            document: COLLEAGUES_ADDED_SUBSCRIPTION,
            updateQuery: (prev) => {
                refetch();
                return prev;
            },
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    _getMyGroups = (workGroups, myId) => {
        const myGroups = workGroups.filter(workGroup => {
            for (const colleague of workGroup.colleagues) {
                if (colleague.worker.id === myId && colleague.status === '1') {
                    return true
                }
            }
            return false
        })
        if (myGroups.length > 0) {
            return myGroups
        }
        return []
    }

    _getMyWillGroups = (workGroups, myId) => {
        const myGroups = workGroups.filter(workGroup => {
            for (const colleague of workGroup.colleagues) {
                if (colleague.worker.id === myId && colleague.status === '0') {
                    return true
                }
            }
            return false
        })
        if (myGroups.length > 0) {
            return myGroups
        }
        return []
    }

    _checkWorkerInGroup = (myGroup, workerId) => {

        for (const colleague of myGroup.colleagues) {
            if (colleague.worker.id === workerId) {
                return colleague.status
            }
        }
        return '-1'
    }

    _checkWorkerInWillGroup = (myWillGroups, workerId) => {
        for (const myWillGroup of myWillGroups) {
            for (const colleague of myWillGroup.colleagues) {
                if (colleague.worker.id === workerId && colleague.status === '1') {
                    return '2'
                }
            }
        }
        return '-1'
    }

    render() {
        const { data: { colleagues, loading, error } } = this.props;
        const { work, me, renderButton, workGroups } = this.props

        if (loading) return <Spinner />
        if (error) return <Text>{errorMessage(error)}</Text>

        const myGroups = this._getMyGroups(workGroups, me.id)
        const myWillGroups = this._getMyWillGroups(workGroups, me.id)


        return (
            <List>
                {
                    colleagues.map(colleague => (
                        <ListItem
                            onPress={() => {
                                let colleagueStatus
                                if (myGroups.length > 0) {
                                    colleagueStatus = this._checkWorkerInGroup(myGroups[0], colleague.id)
                                }
                                if (!(colleagueStatus === '1' || colleagueStatus === '0')) {
                                    colleagueStatus = this._checkWorkerInWillGroup(myWillGroups, colleague.id)
                                }

                                if (colleagueStatus === "1") {
                                    this.props.navigation.navigate('UserProfile', { id: colleague.id })
                                }
                            }
                            }
                            thumbnail
                            key={colleague.id}>
                            <Left>
                                <TouchableWithoutFeedback
                                >
                                    <Thumbnail source={{ uri: colleague.avatar ? colleague.avatar.url : defaultAvatar }} />
                                </TouchableWithoutFeedback>
                            </Left>
                            <Body>
                                <Text>{colleague.name}</Text>
                            </Body>
                            <Right>
                                {
                                    colleague.id !== me.id && (
                                        renderButton(workGroups, colleague.id, me.id, work.company.id)
                                    )
                                }
                            </Right>
                        </ListItem>
                    ))
                }
            </List>
        )
    }
}


export default graphql(GET_COLLEAGUES, {
    options: (props) => ({
        variables: {
            companyId: props.work.company.id,
        },
        fetchPolicy: "cache-and-network",
    }),
})(QureyColleagues)
