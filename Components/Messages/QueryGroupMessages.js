import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Badge, Spinner } from 'native-base';
import { Query, Mutation } from 'react-apollo'

import GET_ME from '../../graphql/get_me.query'
import GET_NEWUNREADMESSAGES from '../../graphql/get_newUnReadMessages.query'
import { defaultAvatar } from '../../utils/settings'
import { errorMessage } from '../../utils/tools'


const messageLength = 17
export default class QueryMessages extends Component {

    getGroupLastUnReadMessageId = (unReadeMessages, group, type) => {
        for (const unReadMessage of unReadeMessages) {
            if (unReadMessage.type === type && unReadMessage.typeId === group.id) {
                return unReadMessage.lastMessageId
            }
        }
        return null
    }

    getUnreadMessageNum = (lastUnreadMessageId, group) => {

        let count = 0
        for (const message of group.messages) {
            if (message.id === lastUnreadMessageId) {
                break
            }
            count++
        }
        return count
    }

    renderBadge = (group, type) => {

        return <Query query={GET_NEWUNREADMESSAGES}>
            {
                ({ data }) => {

                    const lastUnreadMessageId = this.getGroupLastUnReadMessageId(data.newUnreadMessages, group, type)
                    let unReadMessageNum
                    if (lastUnreadMessageId) {
                        unReadMessageNum = this.getUnreadMessageNum(lastUnreadMessageId, group)
                    } else {
                        // unReadMessageNum = group.messages.length
                        unReadMessageNum=0
                    }

                    if (unReadMessageNum === 0) {
                        return <Text></Text>
                    }
                    return (
                        <Badge>
                            <Text>{unReadMessageNum}</Text>
                        </Badge>
                    )
                }
            }

        </Query>
    }


    LastMessage = (group) => {
        const sortedMessages = group.messages.sort(
            (a, b) => (new Date(b.createdAt) - new Date(a.createdAt))
        )
        return sortedMessages[0].text.length > messageLength ? `${sortedMessages[0].text.slice(0, messageLength)}...` : sortedMessages[0].text
    }



    render() {
        const { navigation } = this.props
        return (
            <Query query={GET_ME}>
                {
                    ({ loading, error, data }) => {
                        const me = data.me
                        if (loading) return <Spinner />
                        if (error) return <Text>{errorMessage(error)}</Text>
                        const familyGroups = me.relativefamilyGroups.filter(group => group.messages.length > 0)
                        const locationGroups = me.locationGroups.filter(group => group.messages.length > 0)
                        const classGroups = me.classGroups.filter(group => group.messages.length > 0)
                        const workGroups = me.workGroups.filter(group => group.messages.length > 0)
               
                        return (
                            <List>
                                {familyGroups.length > 0 &&
                                    (
                                        <List>
                                            <ListItem itemDivider>
                                                <Text>家庭群</Text>
                                            </ListItem>
                                            {
                                                familyGroups.map(group => (
                                                    <ListItem
                                                        thumbnail
                                                        key={group.id}
                                                        onPress={() => navigation.navigate('GroupChat', { group, type: "Family", groupName: group.name })}
                                                    >
                                                        <Left>

                                                        </Left>
                                                        <Body>
                                                            <Text>{group.name}</Text>
                                                            <Text note numberOfLines={1}>{`${this.LastMessage(group)}`}</Text>
                                                        </Body>
                                                        <Right>
                                                            {this.renderBadge(group, "Family")}
                                                        </Right>
                                                    </ListItem>
                                                ))
                                            }
                                        </List>
                                    )
                                }
                                {classGroups.length > 0 &&
                                    (
                                        <List>
                                            <ListItem itemDivider>
                                                <Text>同学群</Text>
                                            </ListItem>
                                            {
                                                classGroups.map(group => {
                                                    const groupName = `${group.study.school.name}${new Date(group.study.startTime).getFullYear() - (group.study.grade - 1)}界${group.study.className === '0' ? "" : `${group.study.className}班`}`
                                                    return (<ListItem
                                                        thumbnail
                                                        key={group.id}
                                                        onPress={() => navigation.navigate('GroupChat', { group, type: "ClassMate", groupName })}
                                                    >
                                                        <Left>

                                                        </Left>
                                                        <Body>
                                                            <Text>{groupName}</Text>
                                                            <Text note numberOfLines={1}>{`${this.LastMessage(group)}`}</Text>
                                                        </Body>
                                                        <Right>
                                                            {this.renderBadge(group, type)}
                                                        </Right>
                                                    </ListItem>)
                                                })

                                            }
                                        </List>
                                    )
                                }
                                {workGroups.length > 0 &&
                                    (
                                        <List>
                                            <ListItem itemDivider>
                                                <Text>同事群</Text>
                                            </ListItem>
                                            {
                                                workGroups.map(group => (
                                                    <ListItem
                                                        thumbnail
                                                        key={group.id}
                                                        onPress={() => navigation.navigate('GroupChat', { group, type: "Colleague", groupName: group.company.name })}
                                                    >
                                                        <Left>

                                                        </Left>
                                                        <Body>
                                                            <Text>{group.company.name}</Text>
                                                            <Text note numberOfLines={1}>{`${this.LastMessage(group)}`}</Text>
                                                        </Body>
                                                        <Right>
                                                            {this.renderBadge(group, "Colleague")}
                                                        </Right>
                                                    </ListItem>
                                                ))
                                            }
                                        </List>
                                    )
                                }
                                {locationGroups.length > 0 &&
                                    (
                                        <List>
                                            <ListItem itemDivider>
                                                <Text>同乡群</Text>
                                            </ListItem>
                                            {
                                                locationGroups.map(group => (
                                                    <ListItem
                                                        thumbnail
                                                        key={group.id}
                                                        onPress={() => navigation.navigate('GroupChat', { group, type: "FellowTownsman", groupName: group.name })}
                                                    >
                                                        <Left>

                                                        </Left>
                                                        <Body>
                                                            <Text>{group.name}</Text>
                                                            <Text note numberOfLines={1}>{`${this.LastMessage(group)}`}</Text>
                                                        </Body>
                                                        <Right>
                                                            {this.renderBadge(group, "FellowTownsman")}
                                                        </Right>
                                                    </ListItem>
                                                ))
                                            }
                                        </List>
                                    )
                                }
                            </List>
                        )
                    }
                }
            </Query>
        );
    }
}