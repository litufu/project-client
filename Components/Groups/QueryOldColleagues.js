import { graphql } from 'react-apollo';
import React, { Component } from 'react';
import { Avatar } from 'react-native-elements'

import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Icon, Title, Spinner } from 'native-base';

import { errorMessage } from '../../utils/tools'
import GET_OLDCOLLEAGUES from '../../graphql/get_oldColleagues.query'
import COLLEAGUES_ADDED_SUBSCRIPTION from '../../graphql/colleagues_added.subscription'

class QureyOldColleagues extends Component {
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
        const { data: { oldColleagues, loading, error } } = this.props;
        const {work,me,renderButton,myOldColleagues} = this.props

        if (loading) return <Spinner />
        if (error) return <Text>{errorMessage(error)}</Text>

        return (
            <List>
                {
                    oldColleagues.map(colleague=>(
                        <ListItem thumbnail key={colleague.id}>
                        <Left>
                            <Avatar
                                medium
                                overlayContainerStyle={{ backgroundColor: "blue" }}
                                title="水滴"
                                onPress={() => console.log("Works!")}
                                activeOpacity={0.7}
                            />
                        </Left>
                        <Body>
                            <Text>{colleague.name}</Text>
                        </Body>
                        <Right>
                              {
                                  colleague.id !== me.id &&(
                                      renderButton(myOldColleagues, colleague.id, me.id, work.company.id)
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


export default graphql(GET_OLDCOLLEAGUES, {
    options: (props) => ({
        variables: {
            startTime:props.work.startTime,
            endTime:props.work.endTime,
            companyId: props.work.company.id,
        },
        fetchPolicy:"cache-and-network",
    }),
})(QureyOldColleagues)
