import { graphql } from 'react-apollo';
import React, { Component } from 'react';
import {TouchableWithoutFeedback} from 'react-native'
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

    render() {
        const { data: { colleagues, loading, error } } = this.props;
        const { work, me, renderButton, workGroups } = this.props

        if (loading) return <Spinner />
        if (error) return <Text>{errorMessage(error)}</Text>

        return (
            <List>
                {
                    colleagues.map(colleague => (
                        <ListItem thumbnail key={colleague.id}>
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
