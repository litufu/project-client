import { graphql } from 'react-apollo';
import React, { Component } from 'react';
import { Avatar } from 'react-native-elements'

import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Icon, Title, Spinner } from 'native-base';

import { errorMessage } from '../../utils/tools'
import GET_LOCATIONGROUPUSERS from '../../graphql/get_locationGroupUsers.query'
import LOCATIONGROUPUSERS_CHANGED_SUBSCRIPTION from '../../graphql/locationGroupUsers_changed.subscription'

class QueryLocationGroupUsers extends Component {

    render() {
        const { data: { locationGroupUsers, loading, error } } = this.props;

        if (loading) return <Spinner />
        if (error) return <Text>{errorMessage(error)}</Text>

        return (
            <List>
                {
                    locationGroupUsers.map(user => {
                        return (
                            <ListItem thumbnail key={user.id}>
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
                                    <Text>{user.name}</Text>
                                </Body>
                                <Right>
                                </Right>
                            </ListItem>
                        )
                    })
                }
            </List>
        )
    }
}


export default graphql(
    GET_LOCATIONGROUPUSERS, {
        options: (props) => ({
            variables: {
                locationGroupId: props.locationGroup.id,
            },
            fetchPolicy:"cache-and-network",
        }),
    }
)(QueryLocationGroupUsers)
