import React, { Component } from 'react';
import { defaultAvatar } from '../../utils/settings'
import _ from 'lodash'

import Chat from './Chat'


export default class QueryMessages extends Component {


    _getNewMessages = (group) => {
        
        const newGroup = _.cloneDeep(group)
        let newMessages
        newMessages = newGroup ? newGroup.messages.sort(
            (a, b) => (new Date(b.createdAt) - new Date(a.createdAt))
        ) :[]
        const storageMessages = this.props.storageMessages
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
        const displaymessages = newMessages.map(message => ({
            _id: message.id,
            text: message.text,
            createdAt: new Date(message.createdAt),
            user: {
                _id: message.from.id,
                name: message.from.name,
                avatar: ((message.from.avatar && message.from.avatar.url) || defaultAvatar),
            },
            sent: true,
            received: true,
            image: message.image ? message.image.url : null
        }))
        return displaymessages
    }

    render() {
        const {group,type,navigation,me,addNewUnReadMessages,groupName} = this.props
        return (
            < Chat
            me={me}
            groupName={groupName}
            messages = {this._getNewMessages(group) }
            type = { type }
            group={group}
            navigation = { navigation }
            addNewUnReadMessages = { addNewUnReadMessages }
            />
        )
    }
}

