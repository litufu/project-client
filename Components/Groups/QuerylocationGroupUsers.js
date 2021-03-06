import { graphql } from 'react-apollo';
import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native'
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Icon, Title, Spinner } from 'native-base';

import { errorMessage } from '../../utils/tools'
import GET_LOCATIONGROUPUSERS from '../../graphql/get_locationGroupUsers.query'
import LOCATIONGROUPUSERS_CHANGED_SUBSCRIPTION from '../../graphql/locationGroupUsers_changed.subscription'
import { defaultAvatar } from '../../utils/settings';

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
                            <ListItem 
                            thumbnail 
                            key={user.id}
                            // onPress={() => this.props.navigation.navigate('UserProfile', { id: user.id })}
                            >
                                <Left>
                                    <TouchableWithoutFeedback
                                    >
                                        <Thumbnail source={{ uri: user.avatar ? user.avatar.url : defaultAvatar }} />
                                    </TouchableWithoutFeedback>

                                </Left>
                                <Body>
                                    <Text>{user.name}</Text>
                                    <Text note numberOfLines={1}>{user.username}</Text>
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
            fetchPolicy: "cache-and-network",
        }),
    }
)(QueryLocationGroupUsers)
