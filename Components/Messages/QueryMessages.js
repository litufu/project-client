import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button,Badge, Spinner } from 'native-base';
import {Query,Mutation} from 'react-apollo'

import GET_ME from '../../graphql/get_me.query'
import GET_NEWUNREADMESSAGES from '../../graphql/get_newUnReadMessages.query'
import {defaultAvatar} from '../../utils/settings'
import {errorMessage} from '../../utils/tools'
import { storeMessage, retrieveMessages } from '../../utils/tools'

const messageLength = 17
export default class QueryMessages extends Component {

    getPersonLastUnReadMessageId=(unReadeMessages,person)=>{
        for(const unReadMessage of unReadeMessages){
            if(unReadMessage.type==="User" && unReadMessage.typeId===person.id){
                return unReadMessage.lastMessageId
            }
        }
        return null
    }

    getUnreadMessageNum = (personMessages,lastUnreadMessageId)=>{
        
        let count = 0
        for(const personMessage of personMessages){
            if(personMessage.id===lastUnreadMessageId){
                break
            }
            count ++
        }
        return count
    }

    renderBadge=(messages,person,me)=>{
        const sortedMessages = messages.sort(
            (a,b)=>(new Date(b.createdAt)-new Date(a.createdAt))
        )
        const personMessages = sortedMessages.filter(message=>(message.from.id===person.id || message.to.id===person.id))
        
       return  <Query query={GET_NEWUNREADMESSAGES}>
        {
            ({data})=>{
                
                const lastUnreadMessageId = this.getPersonLastUnReadMessageId(data.newUnreadMessages,person)
               
                let unReadMessageNum
                if(lastUnreadMessageId){
                   unReadMessageNum = this.getUnreadMessageNum(personMessages,lastUnreadMessageId,person)
                }else{
                    // unReadMessageNum=personMessages.length
                    unReadMessageNum=0
                }
                
                if(unReadMessageNum===0){
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

    messageToPersons=(me)=>{
        const messages = me.messages
        const persons=[]
        const personIds = []
        const sortedMessages = messages.sort(
            (a,b)=>(new Date(b.createdAt)-new Date(a.createdAt))
        )
        for(const message of sortedMessages){
            if(message.from.id!==me.id && !~personIds.indexOf(message.from.id) ){
                persons.push(message.from)
                personIds.push(message.from.id)
            }else if(message.to.id !== me.id && !~personIds.indexOf(message.to.id) ){
                persons.push(message.to)
                personIds.push(message.to.id)
            }
        }
        return persons
    }

    personLastMessage=(me)=>{
        const messages = me.messages
        const  personLM = {}
        const sortedMessages = messages.sort(
            (a,b)=>(new Date(b.createdAt)-new Date(a.createdAt))
        )
        for(const message of sortedMessages){
            if(message.from.id!==me.id 
                &&  !(~Object.keys(personLM).indexOf(message.from.id) && personLM[message.from.id])){
                personLM[message.from.id] = message.text.length>messageLength ? `${message.text.slice(0,messageLength)}...`:message.text
            }else if(message.to.id !== me.id 
                &&  !(~Object.keys(personLM).indexOf(message.to.id) && personLM[message.to.id])){
                    personLM[message.to.id] = message.text.length>messageLength ? `${message.text.slice(0,messageLength)}...`:message.text
            }
        }
        return personLM
    }



  render() {
      const {navigation} = this.props
    return (
        <Query query={GET_ME}>
        {
            ({loading,error,data})=>{
                const me = data.me
                const persons = this.messageToPersons(me)
                if(loading) return <Spinner />
                if(error) return <Text>{errorMessage(error)}</Text>
                return(
                    <List>
                        {
                            persons.length>0 &&
                            (<ListItem itemDivider>
                               <Text>个人</Text>
                           </ListItem>)
                        }
                        {persons.map(
                            person=>(
                                <ListItem 
                                thumbnail 
                                key={person.id}
                                onPress={()=>navigation.navigate('Chat',{user:person,me})}
                                >
                                    <Left>
                                        <Thumbnail square source={{ uri: (person.avatar && person.avatar.url) || defaultAvatar }} />
                                    </Left>
                                    <Body>
                                        <Text>{person.name}</Text>
                                        <Text note numberOfLines={1}>{`${this.personLastMessage(me)[person.id]}`}</Text>
                                    </Body>
                                    <Right>
                                        {this.renderBadge(me.messages,person,me)}
                                    </Right>
                                </ListItem>
                            )
                        )}
                    </List>
                )
            }
        }
        </Query>
    );
  }
}