import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Badge, Spinner } from 'native-base';
import { Query, Mutation } from 'react-apollo'
import _ from 'lodash'
import GET_ME from '../../graphql/get_me.query'
import GET_NEWUNREADMESSAGES from '../../graphql/get_newUnReadMessages.query'
import { defaultAvatar } from '../../utils/settings'
import { errorMessage } from '../../utils/tools'


const messageLength = 17
export default class QueryGroupMessages extends Component {

    getGroupLastUnReadMessageId = (unReadeMessages,group, type) => {
        for (const unReadMessage of unReadeMessages) {
            if (unReadMessage.type === type && unReadMessage.typeId === group.id) {
                return unReadMessage.lastMessageId
            }
        }
        return null
    }

    getUnreadMessageNum = (lastUnreadMessageId,groupsMessages, group) => {
        const sortedMessages = this.getGroupMessages(group,groupsMessages) 
        let count = 0
        for (const message of sortedMessages) {
            if (message.id === lastUnreadMessageId) {
                break
            }
            count++
        }
        return count
    }

    renderBadge = (group,groupsMessages, type) => {

        return <Query query={GET_NEWUNREADMESSAGES}>
            {
                ({ data }) => {

                    const lastUnreadMessageId = this.getGroupLastUnReadMessageId(data.newUnreadMessages, group,type)
                    let unReadMessageNum
                    if (lastUnreadMessageId) {
                        unReadMessageNum = this.getUnreadMessageNum(lastUnreadMessageId,groupsMessages, group)
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

    concatGroupMessages = (group,storageMessages)=>{
        const newGroup = _.cloneDeep(group)
        let newMessages
        newMessages = newGroup ? newGroup.messages.sort(
            (a, b) => (new Date(b.createdAt) - new Date(a.createdAt))
        ) :[]
        if(newMessages.length===0) {
            newMessages=storageMessages
        }else{
            const storageMessageIds = storageMessages.map(message=>message.id)
            for(let i = newMessages.length-1;i >= 0;i--){
                const message = newMessages[i];
                if(~(storageMessageIds.indexOf(message.id))){
                    newMessages.splice(i,1);
                }
            }
            newMessages = storageMessages.concat(newMessages).sort((a, b) => (new Date(b.createdAt) - new Date(a.createdAt)))
        }
        return newMessages
    }

    getGroupMessages = (group,groupsMessages)=>{
        const gmessages = groupsMessages.filter(groupMessages=>group.id in groupMessages)
        let messages = []
        if(gmessages.length>0){
            messages = gmessages[0][group.id]
            if(messages.length>0){
                const sortedMessages = messages.sort(
                    (a, b) => (new Date(b.createdAt) - new Date(a.createdAt))
                )
                const concatMessages = this.concatGroupMessages(group,sortedMessages)
                return concatMessages
            }
        }
        return group.messages.sort(
            (a, b) => (new Date(b.createdAt) - new Date(a.createdAt))
        )
    }


    LastMessage = (group,groupsMessages) => {
        const sortedMessages = this.getGroupMessages(group,groupsMessages)
        if(sortedMessages.length>0){
            return sortedMessages[0].text.length > messageLength ? `${sortedMessages[0].text.slice(0, messageLength)}...` : sortedMessages[0].text
        }
        return ""
    }

    render() {
        const { navigation,groupsMessages,groupsIds } = this.props
        return (
            <Query query={GET_ME}>
                {
                    ({ loading, error, data }) => {
                        const me = data.me
                        if (loading) return <Spinner />
                        if (error) return <Text>{errorMessage(error)}</Text>
                        const familyGroups = me.relativefamilyGroups.filter(group => !!~groupsIds.indexOf(group.id) || group.messages.length>0 )
                        const locationGroups = me.locationGroups.filter(group => !!~groupsIds.indexOf(group.id) || group.messages.length>0)
                        const classGroups = me.classGroups.filter(group => !!~groupsIds.indexOf(group.id) || group.messages.length>0)
                        const workGroups = me.workGroups.filter(group => !!~groupsIds.indexOf(group.id) || group.messages.length>0)
               
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
                                                        onPress={() => navigation.navigate('GroupChat', { group, type: "Family", groupName: group.name,me })}
                                                    >
                                                        <Left>

                                                        </Left>
                                                        <Body>
                                                            <Text>{group.name}</Text>
                                                            <Text note numberOfLines={1}>{`${this.LastMessage(group,groupsMessages)}`}</Text>
                                                        </Body>
                                                        <Right>
                                                            {this.renderBadge(group,groupsMessages, "Family")}
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
                                                    const groupName = group.name
                                                    // const groupName = `${group.study.school.name}${new Date(group.study.startTime).getFullYear() - (group.study.grade - 1)}界${group.study.className === '0' ? "" : `${group.study.className}班`}`
                                                    return (<ListItem
                                                        thumbnail
                                                        key={group.id}
                                                        onPress={() => navigation.navigate('GroupChat', { group, type: "ClassMate", groupName ,me})}
                                                    >
                                                        <Left>

                                                        </Left>
                                                        <Body>
                                                            <Text>{groupName}</Text>
                                                            <Text note numberOfLines={1}>{`${this.LastMessage(group,groupsMessages)}`}</Text>
                                                        </Body>
                                                        <Right>
                                                            {this.renderBadge(group,groupsMessages, "ClassMate")}
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
                                                        onPress={() => navigation.navigate('GroupChat', { group, type: "Colleague", groupName: group.company.name ,me})}
                                                    >
                                                        <Left>

                                                        </Left>
                                                        <Body>
                                                            <Text>{group.company.name}</Text>
                                                            <Text note numberOfLines={1}>{`${this.LastMessage(group,groupsMessages)}`}</Text>
                                                        </Body>
                                                        <Right>
                                                            {this.renderBadge(group,groupsMessages, "Colleague")}
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
                                                        onPress={() => navigation.navigate('GroupChat', { group, type: "FellowTownsman", groupName: group.name ,me})}
                                                    >
                                                        <Left>

                                                        </Left>
                                                        <Body>
                                                            <Text>{group.name}</Text>
                                                            <Text note numberOfLines={1}>{`${this.LastMessage(group,groupsMessages)}`}</Text>
                                                        </Body>
                                                        <Right>
                                                            {this.renderBadge(group, groupsMessages,"FellowTownsman")}
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