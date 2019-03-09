import React, { Component } from 'react';
import { ImagePicker } from 'expo';
import { Mutation, ApolloConsumer } from 'react-apollo'
import update from 'immutability-helper'
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, Linking, Platform } from 'react-native';
import { GiftedChat, Actions, Bubble, Send ,LoadEarlier } from 'react-native-gifted-chat';
import 'moment/locale/zh-cn'

import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import SEND_GROUP_MESSAGE from '../../graphql/send_groupMessage.mutation'
import GET_ME from '../../graphql/get_me.query'
import { storeMessage, retrieveMessages } from '../../utils/tools'
import {messagesLenth} from '../../utils/settings'

const skip = 2

const styles = StyleSheet.create({
    container: { flex: 1 },
});

export default class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            image: null,
            loadEarlier: props.messages.length>skip,
            isLoadingEarlier: false,
        };
        this.renderSend = this.renderSend.bind(this);
        this.onLoadEarlier = this.onLoadEarlier.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ messages: nextProps.messages.slice(0, this.state.messages.length + 1) })
    }

    componentWillMount() {
        this._isMounted = true;
        this.setState(() => {
            return {
                messages: this.props.messages.slice(0, skip),
            };
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

   


    renderSend(props) {
        return (
            <Send
                {...props}
            >
                <View style={{ marginRight: 10, marginBottom: 5 }}>
                    <Ionicons name="md-send" size={32} color="green" />
                </View>
            </Send>
        );
    }

    renderCustomActions = (sendGroupMessage, type, group, me) => {
        const options = {
            '发送图片': async () => {
                let result = await ImagePicker.launchImageLibraryAsync({
                    allowsEditing: false,
                });
                this.setState({ image: result.uri })
                this.onSend([{
                    text: "",
                    image: result.uri,
                    _id: Math.round(Math.random() * 1000000).toString(),
                    user: {
                        _id: 1,
                    }
                }], sendGroupMessage, type, group, me)
            },
            '取消': () => { },
        };
        return (
            <Actions
                options={options}
            />
        );
    }

    onLoadEarlier() {
        this.setState((previousState) => {
            return {
                isLoadingEarlier: true,
            };
        });


        if (this._isMounted === true) {
            this.setState((previousState) => {
                return {
                    messages: GiftedChat.prepend(previousState.messages, this.props.messages.slice(previousState.messages.length, previousState.messages.length + skip)),
                    loadEarlier: (previousState.messages.length + skip >= this.props.messages.length) ? false : true,
                    isLoadingEarlier: false,
                };
            });
        }
    }

    onSend = (messages = [], sendGroupMessage, type, group, me) => {
        if (!messages[0].text && !this.state.image) {
            return null
        }
        sendGroupMessage({
            variables: { type, toId: group.id, text: messages[0].text, image: this.state.image },
            optimisticResponse: {
                __typename: "Mutation",
                sendGroupMessage: {
                    __typename: "GroupMessage",
                    id: Math.round(Math.random() * 1000000).toString(),
                    text: messages[0].text,
                    type,
                    to: group.id,
                    from: {
                        __typename: "User",
                        id: me.id,
                        name: me.name,
                        avatar: me.avatar
                    },
                    image: this.state.image ? {
                        __typename: "Photo",
                        id: Math.round(Math.random() * 1000000).toString(),
                        name: Math.round(Math.random() * 1000000).toString(),
                        url: this.state.image
                    } : null,
                    createdAt: new Date().toLocaleString(),
                }
            },
            update: (cache, { data: { sendGroupMessage } }) => {
                // Read the data from our cache for this query.
                let newMessage
                if (sendGroupMessage.image) {
                    newMessage = {
                        ...sendGroupMessage,
                        image: {
                            ...sendGroupMessage.image,
                            url: `https://gewu-avatar.oss-cn-hangzhou.aliyuncs.com/images/${sendGroupMessage.image.name}`
                        }
                    }
                } else {
                    newMessage = sendGroupMessage
                }
                const data = cache.readQuery({ query: GET_ME });
                if (type === 'Family') {
                    // familyGroup在me中查找
                    
                    data.me.relativefamilyGroups.map(g => {
                        if (g.id === group.id) {
                            g.messages.push({ ...newMessage })
                            return g
                        }
                        return g
                    })
                    // Write our data back to the cache.
                    cache.writeQuery({ query: GET_ME, data });
                    storeMessage(`${data.me.id}Family${newMessage.to}`, newMessage)
                } else if (type === "ClassMate") {
                    data.me.classGroups.map(g => {
                        if (g.id === group.id) {
                            g.messages.push({ ...newMessage })
                            return g
                        }
                        return g
                    })
                    // Write our data back to the cache.
                    cache.writeQuery({ query: GET_ME, data });
                    storeMessage(`${data.me.id}ClassMate${newMessage.to}`, newMessage)
                } else if (type === "Colleague") {
                    data.me.workGroups.map(g => {
                        if (g.id === group.id) {
                            g.messages.push({ ...newMessage })
                            return g
                        }
                        return g
                    })
                    // Write our data back to the cache.
                    cache.writeQuery({ query: GET_ME, data });
                    storeMessage(`${data.me.id}Colleague${newMessage.to}`, newMessage)
                } else if (type === "FellowTownsman") {
                    data.me.locationGroups.map(g => {
                        if (g.id === group.id) {
                            g.messages.push({ ...newMessage })
                            return g
                        }
                        return g
                    })
                    // Write our data back to the cache.
                    cache.writeQuery({ query: GET_ME, data });
                    storeMessage(`${data.me.id}FellowTownsman${newMessage.to}`, newMessage)
                } else if (type === "RegStatus") {
                    // regstatus在me中查找
                    data.me.regStatus.messages.push({ ...newMessage })
                    // Write our data back to the cache.
                    cache.writeQuery({ query: GET_ME, data });
                }
            }
        })
    }


    _goBack = (type, group,client) => {
        if (this.state.messages.length > 0) {
            this.props.addNewUnReadMessages({
                variables: {
                    type,
                    id: group.id,
                    lastMessageId: this.state.messages[0]._id
                }
            })
        }
        
        // 删除缓存中多的信息
        const data = client.readQuery({query:GET_ME})
        if(type==='Family'){
            data.me.relativefamilyGroups.map(g => {
                if (g.id === group.id) {
                    if(g.messages.length<=messagesLenth){
                        return g
                    }
                    const newGroup = update(g,{messages:{$set:g.messages.slice(-1,-messagesLenth)}})
                    return newGroup
                }
                return g
            })
            // Write our data back to the cache.
            client.writeQuery({ query: GET_ME, data });
        }else if(type==='ClassMate'){
            data.me.classGroups.map(g => {
                if (g.id === group.id) {
                    if(g.messages.length<=messagesLenth){
                        return g
                    }
                    const newGroup = update(g,{messages:{$set: g.messages.slice(-1,-messagesLenth)}})
                    return newGroup
                }
                return g
            })
            // Write our data back to the cache.
            client.writeQuery({ query: GET_ME, data });

        }else if(type==="Colleague"){
            data.me.workGroups.map(g => {
                if (g.id === group.id) {
                    if(g.messages.length<=messagesLenth){
                        return g
                    }
                    const newGroup = update(g,{messages:{$set: g.messages.slice(-1,-messagesLenth)}})
                    return newGroup
                }
                return g
            })
            // Write our data back to the cache.
            client.writeQuery({ query: GET_ME, data });
        }else if(type==="FellowTownsman"){
            data.me.locationGroups.map(g => {
                if (g.id === group.id) {
                    if(g.messages.length<=messagesLenth){
                        return g
                    }
                    const newGroup = update(g,{messages:{$set: g.messages.slice(-1,-messagesLenth)}})
                    return newGroup
                }
                return g
            })
            // Write our data back to the cache.
            client.writeQuery({ query: GET_ME, data });
        }

        this.props.navigation.goBack()
    }

    renderLoadEarlier=()=>(
        <Button transparent small ><Text>加载更多</Text></Button>
    )
        
   

    render() {
        const { type, group, me, groupName } = this.props
        return (
            <View style={styles.container} accessible accessibilityLabel="main" testID="main">
                <ApolloConsumer>
                    {
                        client => (
                            <Header>
                                <Left>
                                    <Button
                                        onPress={()=>this._goBack(type, group,client)}
                                        transparent
                                    >
                                        <Icon name='md-arrow-back' type='Ionicons' />
                                    </Button>
                                </Left>
                                <Body>
                                    <Title>{groupName}</Title>
                                </Body>
                                <Right />
                            </Header>
                        )
                    }

                </ApolloConsumer>
                <Mutation mutation={SEND_GROUP_MESSAGE}>
                    {

                        (sendGroupMessage, { data }) => {
                            if (data && data.sendGroupMessage.image && data.sendGroupMessage.image.url) {
                                const xhr = new XMLHttpRequest()
                                xhr.open('PUT', data.sendGroupMessage.image.url)
                                xhr.onreadystatechange = function () {
                                    if (xhr.readyState === 4) {
                                        if (xhr.status === 200) {
                                            console.log('Image successfully uploaded to oss')
                                        } else {
                                            console.log('Error while sending the image to oss')
                                        }
                                    }
                                }
                                xhr.setRequestHeader('Content-Type', 'image/jpeg')
                                xhr.send({ uri: this.state.image, type: 'image/jpeg', name: data.sendGroupMessage.image.name })
                            }

                            return (
                                <GiftedChat
                                    messages={this.state.messages}
                                    renderSend={this.renderSend}
                                    onSend={(messages) => this.onSend(messages, sendGroupMessage, type, group, me)}
                                    keyboardShouldPersistTaps="never"
                                    user={{
                                        _id: me.id,
                                    }}
                                    // renderActions={() => this.renderCustomActions(sendGroupMessage, type, group, me)}
                                    locale="zh-cn"
                                    placeholder="输入信息..."
                                    renderTime={null}
                                    showAvatarForEveryMessage={true}
                                    loadEarlier={this.state.loadEarlier}
                                    onLoadEarlier={this.onLoadEarlier}
                                    renderLoadEarlier={(props) => {
                                        return (
                                          <LoadEarlier {...props} label='加载更多' />
                                        );
                                      }}
                                    isLoadingEarlier={this.state.isLoadingEarlier}
                                />
                            )
                        }

                    }

                </Mutation>

            </View>
        );
    }

}
