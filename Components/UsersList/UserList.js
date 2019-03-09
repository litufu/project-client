import React from 'react'
import { ScrollView, TouchableWithoutFeedback, View, Alert } from 'react-native'
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Button } from 'native-base';
import { Mutation } from 'react-apollo'

import GET_ME from '../../graphql/get_me.query'
import CONNECT_FAMILY from '../../graphql/connect_family.mutation'

import {defaultAvatar}  from '../../utils/settings'
import {errorMessage} from '../../utils/tools'


class UserList extends React.Component {

    render() {

        const { users, navigation, who,me} = this.props

        return (
            <Container>
                <Content>
                    <List>
                        {users.map(user => (
                            <ListItem avatar key={user.id}>
                                <Left>
                                    <TouchableWithoutFeedback
                                        onPress={() => navigation.navigate('UserProfile', { id: user.id })}
                                    >
                                        <Thumbnail source={{ uri: user.avatar?user.avatar.url:defaultAvatar }} />
                                    </TouchableWithoutFeedback>
                                </Left>
                                <Body>
                                    <TouchableWithoutFeedback
                                        onPress={() => navigation.navigate('UserProfile', { id: user.id })}
                                    >
                                        <View>
                                            <Text>{user.name}</Text>
                                            <Text note>{user.username}</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </Body>
                                <Right>
                                    <Mutation
                                        mutation={CONNECT_FAMILY}
                                        update={(cache, { data: { connectFamily } }) => {
                                            const { me } = cache.readQuery({ 
                                                query: GET_ME,
                                             });
                                            const families = me.families.map(f => {
                                                if (f.id === connectFamily.id) {
                                                    return connectFamily
                                                }
                                                return f
                                            })
                                            cache.writeQuery({
                                                query: GET_ME,
                                                data: {
                                                    me: {...me,families}
                                                }
                                            });
                                        }}
                                    onCompleted={(data)=>navigation.navigate('FamilyRelationship') }
                                    onError={(error)=>Alert.alert(errorMessage(error))}
                                    >
                                        {(connectFamily, { loading }) => {
                                            if (loading) return (<Button transparent>
                                                <Text style={{ color: "blue" }}>添加...</Text>
                                            </Button>)
                                            return (
                                                <Button
                                                    transparent
                                                    onPress={
                                                        () => connectFamily({
                                                            variables:{
                                                                relativeId: user.id,
                                                                familyId: who.id,
                                                                name: who.to.name,
                                                                relationship: who.relationship
                                                            }
                                                        })
                                                        }
                                                >
                                                    <Text style={{ color: "blue" }}>
                                                        添加{loading && <Text style={{ color: "blue" }}>...</Text>}
                                                    </Text>
                                                </Button>
                                            )
                                        }

                                        }
                                    </Mutation>
                                </Right>
                            </ListItem>
                        ))}
                    </List>
                </Content>
            </Container>
        )
    }
}

export default UserList
