import React, { Component } from 'react';
import { View, StyleSheet, Linking, Platform } from 'react-native';
import { Query, Mutation, ApolloConsumer } from 'react-apollo';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Spinner } from 'native-base';
import { GiftedChat, Actions, Bubble, Send, LoadEarlier } from 'react-native-gifted-chat';
import 'moment/locale/zh-cn'
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Asset, AppLoading, ImagePicker } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import _ from 'lodash'

import { defaultAvatar, messagesLenth } from '../../utils/settings'
import { storeMessage, errorMessage, retrieveMessages } from '../../utils/tools'
import GET_ME from '../../graphql/get_me.query'
import ADD_NEWUNREADMESSAGE from '../../graphql/add_newUnReadMessage.mutation'
import SEND_MESSAGE from '../../graphql/send_message.mutation'

const skip = 10

const styles = StyleSheet.create({
    container: { flex: 1 },
});

export default class Chat extends Component {

    state = {
        storageMessages: [],
        image: null,
        loadEarlier: false,
        isLoadingEarlier: false,
        messageNum: 0,
    }

    _isMounted = false;

    async componentWillMount() {
        this._isMounted = true;
        const userInfo = this.props.navigation.getParam('user')
        const me = this.props.navigation.getParam('me')
        const getMessages = await retrieveMessages(`${me.id}User${userInfo.id}`)
        const storageMessages = JSON.parse(getMessages).sort(
            (a, b) => (new Date(b.createdAt) - new Date(a.createdAt))
        )
        const messageNum = storageMessages.length > skip ? skip : storageMessages.length
        
        this.setState({
            storageMessages: storageMessages,
            loadEarlier: storageMessages.length > skip,
            messageNum: messageNum
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    _getAllMessages = (msgs, userInfo, storeM) => {
        const storageMessages = _.cloneDeep(storeM)
        const messages = _.cloneDeep(msgs)
        let newMessages
        newMessages = messages.filter(
            message => (message.to.id === userInfo.id || message.from.id === userInfo.id)
        ).sort(
            (a, b) => (new Date(b.createdAt) - new Date(a.createdAt))
        )

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

    renderCustomActions = (sendMessage, userInfo, me) => {
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
                }], sendMessage, userInfo, me)
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
        this.setState({ isLoadingEarlier: true })
        if (this._isMounted === true) {
            this.setState((previousState) => {
                return {
                    messageNum: (previousState.messageNum + skip >= previousState.storageMessages.length) ? previousState.storageMessages.length : previousState.messageNum + skip,
                    loadEarlier: (previousState.messageNum + skip >= previousState.storageMessages.length) ? false : true,
                    isLoadingEarlier: false,
                };
            });
        }
    }

    onSend = (messages = [], sendMessage, userInfo, me) => {
        if (!messages[0].text && !this.state.image) {
            return null
        }
        sendMessage({
            variables: { toId: userInfo.id, text: messages[0].text, image: this.state.image },
            optimisticResponse: {
                __typename: "Mutation",
                sendMessage: {
                    __typename: "Message",
                    id: Math.round(Math.random() * 1000000).toString(),
                    text: messages[0].text,
                    to: {
                        __typename: "User",
                        id: userInfo.id,
                        name: userInfo.name,
                        avatar: userInfo.avatar,
                    },
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
            update: (cache, { data: { sendMessage } }) => {
                // Read the data from our cache for this query.
                const data = cache.readQuery({ query: GET_ME });
                let newMessage
                if (sendMessage.image) {
                    newMessage = {
                        ...sendMessage,
                        image: {
                            ...sendMessage.image,
                            url: `https://gewu-avatar.oss-cn-hangzhou.aliyuncs.com/images/${sendMessage.image.name}`
                        }
                    }
                } else {
                    newMessage = sendMessage
                }
                data.me.messages.push({ ...newMessage });
                // Write our data back to the cache.
                cache.writeQuery({ query: GET_ME, data });
                const key = newMessage.to.id
                storeMessage(`${data.me.id}User${key}`, newMessage)
            }
        })
    }

    _goBack = (client, addNewUnReadMessages, userInfo, messages) => {
        const displayAllMessages = this._getAllMessages(messages,userInfo, this.state.storageMessages.slice(0, this.state.messageNum))
        if (displayAllMessages.length > 0) {
            addNewUnReadMessages({
                variables: {
                    type: "User",
                    id: userInfo.id,
                    lastMessageId: displayAllMessages[0]._id
                }
            })
        }

        if (displayAllMessages.length > messagesLenth) {
            const data = client.readQuery({ query: GET_ME })
            const me = data.me
            const deleteMessageIds = displayAllMessages.slice(messagesLenth).map(message => message._id)
            const newMessages = data.me.messages.filter(message => {
                if (~deleteMessageIds.indexOf(message.id)) {
                    return false
                }
                return true
            })
            const newData = { me: { ...me, messages: newMessages } }
            // Write our data back to the cache.
            client.writeQuery({ query: GET_ME, data: newData });
        }

        this.props.navigation.goBack()
    }


    _renderHeader = (userInfo, me, addNewUnReadMessages) => (
        <ApolloConsumer>
            {
                client => (
                    <Header>
                        <Left>
                            <Button
                                onPress={() => this._goBack(client, addNewUnReadMessages, userInfo, me.messages)}
                                transparent
                            >
                                <Icon name='md-arrow-back' type='Ionicons' />
                            </Button>
                        </Left>
                        <Body>
                            <Title>{userInfo.name}</Title>
                        </Body>
                        <Right>
                            <Button
                                onPress={() => this.props.navigation.navigate('ChatSettings', { userInfo, client })}
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

    _renderGiftChat = (userInfo, me) => (
        <Mutation mutation={SEND_MESSAGE}>
            {

                (sendMessage, { loading, error, data }) => {
                    if (data && data.sendMessage.image && data.sendMessage.image.url) {
                        const xhr = new XMLHttpRequest()
                        xhr.open('PUT', data.sendMessage.image.url)
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
                        xhr.send({ uri: this.state.image, type: 'image/jpeg', name: data.sendMessage.image.name })
                    }

                    return (
                        <GiftedChat
                            messages={this._getAllMessages(me.messages,userInfo, this.state.storageMessages.slice(0, this.state.messageNum))}
                            renderSend={this.renderSend}
                            onSend={(messages) => this.onSend(messages, sendMessage, userInfo, me)}
                            keyboardShouldPersistTaps="never"
                            renderUsernameOnMessage={true}
                            user={{
                                _id: me.id,
                            }}
                            // renderActions={() => this.renderCustomActions(sendMessage, userInfo, me)}
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
    )

    render() {
        const userInfo = this.props.navigation.getParam('user')
        return (
            <Query query={GET_ME}>
                {
                    ({ loading, error, data }) => {
                        if (loading) return <Spinner />
                        if (error) return <Text>{errorMessage(error)}</Text>
                        const me = data.me
                        return (
                            <Mutation mutation={ADD_NEWUNREADMESSAGE} >
                                {addNewUnReadMessages => (
                                    <View style={styles.container} accessible accessibilityLabel="main" testID="main">
                                        {this._renderHeader(userInfo, me, addNewUnReadMessages)}
                                        {this._renderGiftChat(userInfo, me)}
                                    </View>
                                )}
                            </Mutation>
                        )
                    }
                }
            </Query>
        )
    }
}