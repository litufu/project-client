import React, { Component } from 'react';
import { Query, Mutation, ApolloConsumer } from 'react-apollo'
import { ImagePicker } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, Linking, Platform } from 'react-native';
import { GiftedChat, Actions, Bubble, Send, LoadEarlier } from 'react-native-gifted-chat';
import 'moment/locale/zh-cn'
import update from 'immutability-helper';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Spinner, Header, Title, Button, Left, Right, Body, Icon, Text } from 'native-base';
import _ from 'lodash'

import GET_ME from '../../graphql/get_me.query'
import ADD_NEWUNREADMESSAGE from '../../graphql/add_newUnReadMessage.mutation'
import SEND_GROUP_MESSAGE from '../../graphql/send_groupMessage.mutation'

import { errorMessage, retrieveMessages, storeMessage } from '../../utils/tools'
import { defaultAvatar, messagesLenth } from '../../utils/settings'

const skip = 10
export default class Chat extends Component {

    state = {
        storageMessages: [],
        image: null,
        loadEarlier: false,
        isLoadingEarlier: false,
        messageNum:0,
    }

    _isMounted = false;

    async componentWillMount() {
        console.log('componentWillMount')
        this._isMounted = true;
        const me = this.props.navigation.getParam('me', "")
        const group = this.props.navigation.getParam('group', "")
        const type = this.props.navigation.getParam('type', "")
        const key = `${me.id}${type}${group.id}`
        console.log('key',key)
        const getMessages = await retrieveMessages(key)
        console.log('getMessages',getMessages)
        const storageMessages = JSON.parse(getMessages).sort(
            (a, b) => (new Date(b.createdAt) - new Date(a.createdAt))
        )
        this.setState({
            storageMessages: storageMessages,
            loadEarlier: storageMessages.length > skip,
            messageNum:storageMessages.length>skip ? skip:storageMessages.length
        })
        
    }


    componentWillUnmount() {
        this._isMounted = false;
    }


    _getAllMessages = (group, storeM) => {
        const newGroup = _.cloneDeep(group)
        const storageMessages = _.cloneDeep(storeM)
        let newMessages
        newMessages = newGroup ? newGroup.messages.sort(
            (a, b) => (new Date(b.createdAt) - new Date(a.createdAt))
        ) : []
        if (newMessages.length === 0) {
            newMessages = storageMessages
        } else {
            const storageMessageIds = storageMessages.map(message => message.id)
            for (let i = newMessages.length - 1; i >= 0; i--) {
                const message = newMessages[i];
                if (~(storageMessageIds.indexOf(message.id))) {
                    newMessages.splice(i, 1);
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

    renderName = (props, me) => {
        const { user = {} } = props.currentMessage
        const isSelf = user._id === me.id

        return isSelf ? (
            <View />
        ) : (
                <Text
                    style={[styles.standardFont, styles.headerItem]}>
                    {user.name}
                </Text>
            )
    }

    renderBubble = (props, me) => {
        return (
            <View>
                {this.renderName(props,me)}
                <Bubble {...props} />
            </View>
        )
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

    onLoadEarlier=()=> {
        this.setState({isLoadingEarlier: true})
        if (this._isMounted === true) {
            this.setState((previousState) => {
                return {
                    messageNum:(previousState.messageNum + skip >= previousState.storageMessages.length) ? previousState.storageMessages.length : previousState.messageNum + skip,
                    loadEarlier: (previousState.messageNum + skip >= previousState.storageMessages.length) ? false : true,
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
                const me = data.me
                if (type === 'Family') {
                    // familyGroup在me中查找

                    const newGroups = data.me.relativefamilyGroups.map(g => {
                        if (g.id === group.id) {
                            g.messages.push({ ...newMessage })
                            return g
                        }
                        return g
                    })
                    const newData = { me: { ...me, relativefamilyGroups: newGroups } }
                    // Write our data back to the cache.
                    cache.writeQuery({ query: GET_ME, data: newData });
                    storeMessage(`${data.me.id}Family${newMessage.to}`, newMessage)
                } else if (type === "ClassMate") {
                    const newGroups = data.me.classGroups.map(g => {
                        if (g.id === group.id) {
                            g.messages.push({ ...newMessage })
                            return g
                        }
                        return g
                    })
                    const newData = { me: { ...me, classGroups: newGroups } }
                    // Write our data back to the cache.
                    cache.writeQuery({ query: GET_ME, data: newData });
                    storeMessage(`${data.me.id}ClassMate${newMessage.to}`, newMessage)
                } else if (type === "Colleague") {
                    const newGroups = data.me.workGroups.map(g => {
                        if (g.id === group.id) {
                            g.messages.push({ ...newMessage })
                            return g
                        }
                        return g
                    })
                    const newData = { me: { ...me, workGroups: newGroups } }
                    // Write our data back to the cache.
                    cache.writeQuery({ query: GET_ME, data: newData });
                    storeMessage(`${data.me.id}Colleague${newMessage.to}`, newMessage)
                } else if (type === "FellowTownsman") {
                    const newGroups = data.me.locationGroups.map(g => {
                        if (g.id === group.id) {
                            g.messages.push({ ...newMessage })
                            return g
                        }
                        return g
                    })
                    const newData = { me: { ...me, locationGroups: newGroups } }
                    // Write our data back to the cache.
                    cache.writeQuery({ query: GET_ME, data: newData });
                    storeMessage(`${data.me.id}FellowTownsman${newMessage.to}`, newMessage)
                } else if (type === "RegStatus") {
                    // regstatus在me中查找
                    data.me.regStatus.messages.push({ ...newMessage })
                    // Write our data back to the cache.

                    cache.writeQuery({ query: GET_ME, data });
                } else if (type === "Activity") {
                    const newGroups = data.me.activities.map(g => {
                        if (g.id === group.id) {
                            g.messages.push({ ...newMessage })
                            return g
                        }
                        return g
                    })
                    const newData = { me: { ...me, activities: newGroups } }
                    // Write our data back to the cache.
                    cache.writeQuery({ query: GET_ME, data: newData });
                    storeMessage(`${data.me.id}Activity${newMessage.to}`, newMessage)
                }
            }
        })
    }


    _goBack = (type, group, client, addNewUnReadMessages) => {
        const displayAllMessages = this._getAllMessages(group,this.state.storageMessages.slice(0,this.state.messageNum))
        if (displayAllMessages.length > 0) {
            addNewUnReadMessages({
                variables: {
                    type,
                    id: group.id,
                    lastMessageId: displayAllMessages[0]._id
                }
            })
        }

        // 删除缓存中多的信息
        const data = client.readQuery({ query: GET_ME })
        const me = data.me
        if (type === 'Family') {
            const newGroups = data.me.relativefamilyGroups.map(g => {
                if (g.id === group.id) {
                    if (g.messages.length <= messagesLenth) {
                        return g
                    }
                    const newGroup = update(g, { messages: { $set: g.messages.slice(0, messagesLenth) } })
                    return newGroup
                }
                return g
            })
            const newData = { me: { ...me, relativefamilyGroups: newGroups } }
            // Write our data back to the cache.
            client.writeQuery({ query: GET_ME, data: newData });
        } else if (type === 'ClassMate') {
            const newGroups = data.me.classGroups.map(g => {
                if (g.id === group.id) {
                    if (g.messages.length <= messagesLenth) {
                        return g
                    }
                    const newGroup = update(g, { messages: { $set: g.messages.slice(0, messagesLenth) } })
                    return newGroup
                }
                return g
            })
            const newData = { me: { ...me, classGroups: newGroups } }
            // Write our data back to the cache.
            client.writeQuery({ query: GET_ME, data: newData });

        } else if (type === "Colleague") {
            const newGroups = data.me.workGroups.map(g => {
                if (g.id === group.id) {
                    if (g.messages.length <= messagesLenth) {
                        return g
                    }
                    const newGroup = update(g, { messages: { $set: g.messages.slice(0, messagesLenth) } })
                    return newGroup
                }
                return g
            })
            const newData = { me: { ...me, workGroups: newGroups } }
            // Write our data back to the cache.
            client.writeQuery({ query: GET_ME, data: newData });
        } else if (type === "FellowTownsman") {
            data.me.locationGroups.map(g => {
                if (g.id === group.id) {
                    if (g.messages.length <= messagesLenth) {
                        return g
                    }
                    const newGroup = update(g, { messages: { $set: g.messages.slice(-1, -messagesLenth) } })
                    return newGroup
                }
                return g
            })
            // Write our data back to the cache.
            client.writeQuery({ query: GET_ME, data });
        } else if (type === "Activity") {
            data.me.activities.map(g => {
                if (g.id === group.id) {
                    if (g.messages.length <= messagesLenth) {
                        return g
                    }
                    const newGroup = update(g, { messages: { $set: g.messages.slice(-1, -messagesLenth) } })
                    return newGroup
                }
                return g
            })
            // Write our data back to the cache.
            client.writeQuery({ query: GET_ME, data });
        }

        this.props.navigation.goBack()
    }

    _renderHeader = (type, newGroup, addNewUnReadMessages, groupName) => (
        <ApolloConsumer>
            {
                client => (
                    <Header>
                        <Left>
                            <Button
                                onPress={() => this._goBack(type, newGroup, client, addNewUnReadMessages)}
                                transparent
                            >
                                <Icon name='md-arrow-back' type='Ionicons' />
                            </Button>
                        </Left>
                        <Body>
                            <Title>{groupName}</Title>
                        </Body>
                        <Right>
                            <Button
                                onPress={() => this.props.navigation.navigate('GroupChatSettings', { type, newGroup, client })}
                                transparent
                            >
                                <Icon name='ellipsis-v' type='FontAwesome' />
                            </Button>
                        </Right>
                    </Header>
                )
            }
        </ApolloConsumer>
    )

    _renderGiftChat = (type, newGroup, me) => (
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
                            messages={this._getAllMessages(newGroup,this.state.storageMessages.slice(0,this.state.messageNum)) }
                            renderSend={this.renderSend}
                            onSend={(messages) => this.onSend(messages, sendGroupMessage, type, newGroup, me)}
                            keyboardShouldPersistTaps="never"
                            renderUsernameOnMessage={true}
                            user={{
                                _id: me.id,
                            }}
                            // renderActions={() => this.renderCustomActions(sendGroupMessage, type, group, me)}
                            locale="zh-cn"
                            placeholder="输入信息..."
                            renderTime={null}
                            renderBubble={(props) => this.renderBubble(props, me)}
                            showAvatarForEveryMessage={true}
                            renderUsernameOnMessage={true}
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
    )

    render() {
        const group = this.props.navigation.getParam('group', "")
        const type = this.props.navigation.getParam('type', "")
        const groupName = this.props.navigation.getParam('groupName', "")
        return (
            <Query query={GET_ME}>
                {
                    ({ loading, error, data }) => {
                        if (loading) return <Spinner />
                        if (error) return <Text>{errorMessage(error)}</Text>
                        const me = data.me
                        let newGroup
                        if (type === 'Family') {
                            newGroup = data.me.relativefamilyGroups.filter(g => g.id === group.id)[0]
                        } else if (type === "ClassMate") {
                            newGroup = data.me.classGroups.filter(g => g.id === group.id)[0]
                        } else if (type === "Colleague") {
                            newGroup = data.me.workGroups.filter(g => g.id === group.id)[0]
                        } else if (type === "FellowTownsman") {
                            newGroup = data.me.locationGroups.filter(g => g.id === group.id)[0]
                        } else if (type === "RegStatus") {
                            newGroup = data.me.regStatus
                        } else if (type === "Activity") {
                            newGroup = data.me.activities.filter(g => g.id === group.id)[0]
                        }

                        return (
                            <Mutation mutation={ADD_NEWUNREADMESSAGE} >
                                {(addNewUnReadMessages, { loading, error }) => {
                                    if (loading) return <Spinner />
                                    return (
                                        <View style={styles.container} accessible accessibilityLabel="main" testID="main">
                                            {this._renderHeader(type, newGroup, addNewUnReadMessages, groupName)}
                                            {this._renderGiftChat(type, newGroup, me)}
                                        </View>
                                    )
                                }
                                }
                            </Mutation>
                        )
                    }
                }
            </Query>
        )

    }
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    standardFont: {
        fontSize: 15,
    },
    username: {
        fontWeight: 'bold',
    },
    headerItem: {
        marginRight: 10,
    },
});