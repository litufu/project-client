import React, { Component } from 'react';
import {Query} from 'react-apollo'
import {Alert,AsyncStorage} from 'react-native'
import _ from 'lodash'

import { Container, Header, Content, List, ListItem, Text,Left,Right,Body,Title,Icon,Button } from 'native-base';
import update from 'immutability-helper'

import GET_ME from '../../graphql/get_me.query'


export default class Settings extends Component {

    clearMessages = async (type,group,client)=>{
            const data = await client.readQuery({query:GET_ME})
            const me = data.me
            if(type==='Family'){
                const newGroups = data.me.relativefamilyGroups.map(g => {
                    if (g.id === group.id) {
                        const newG = _.cloneDeep(g)
                        const newMessages =newG.messages.sort(
                            (a, b) => (new Date(b.createdAt) - new Date(a.createdAt))
                        ).slice(0,10)
                        const newGroup = {...g,messages:newMessages}
                        return newGroup
                    }
                    return g
                })
                const newData = {me:{...me,relativefamilyGroups:newGroups}}
                // Write our data back to the cache.
                await client.writeQuery({ query: GET_ME, data:newData });
                await AsyncStorage.setItem(`${me.id}Family${group.id}`,JSON.stringify([]) );
                Alert.alert('删除完成')
            }else if(type==='ClassMate'){
                const newGroups = data.me.classGroups.map(g => {
                    if (g.id === group.id) {
                        const newG = _.cloneDeep(g)
                        const newMessages =newG.messages.sort(
                            (a, b) => (new Date(b.createdAt) - new Date(a.createdAt))
                        ).slice(0,10)
                        const newGroup = {...g,messages:newMessages}
                        return newGroup
                    }
                    return g
                })
                const newData = {me:{...me,classGroups:newGroups}}
                // Write our data back to the cache.
                client.writeQuery({ query: GET_ME, data:newData });
                // Write our data back to the cache.
                await AsyncStorage.setItem(`${me.id}ClassMate${group.id}`,JSON.stringify([]) );
                Alert.alert('删除完成')
            }else if(type==="Colleague"){
                const newGroups = data.me.workGroups.map(g => {
                    if (g.id === group.id) {
                        const newG = _.cloneDeep(g)
                        const newMessages =newG.messages.sort(
                            (a, b) => (new Date(b.createdAt) - new Date(a.createdAt))
                        ).slice(0,10)
                        const newGroup = {...g,messages:newMessages}
                        return newGroup
                    }
                    return g
                })
                const newData = {me:{...me,workGroups:newGroups}}
                // Write our data back to the cache.
                client.writeQuery({ query: GET_ME, data:newData });
                await AsyncStorage.setItem(`${me.id}Colleague${group.id}`,JSON.stringify([]) );
                Alert.alert('删除完成')
            }else if(type==="FellowTownsman"){
                const newGroups = data.me.locationGroups.map(g => {
                    if (g.id === group.id) {
                        const newG = _.cloneDeep(g)
                        const newMessages =newG.messages.sort(
                            (a, b) => (new Date(b.createdAt) - new Date(a.createdAt))
                        ).slice(0,10)
                        const newGroup = {...g,messages:newMessages}
                        return newGroup
                    }
                    return g
                })
                const newData = {me:{...me,locationGroups:newGroups}}
                // Write our data back to the cache.
                client.writeQuery({ query: GET_ME, data:newData });
                await AsyncStorage.setItem(`${me.id}FellowTownsman${group.id}`,JSON.stringify([]) );
                Alert.alert('删除完成')
            }else if(type==="Activity"){
                const newGroups = data.me.activities.map(g => {
                    if (g.id === group.id) {
                        const newG = _.cloneDeep(g)
                        const newMessages =newG.messages.sort(
                            (a, b) => (new Date(b.createdAt) - new Date(a.createdAt))
                        ).slice(0,10)
                        const newGroup = {...g,messages:newMessages}
                        return newGroup
                    }
                    return g
                })
                const newData = {me:{...me,activities:newGroups}}
                // Write our data back to the cache.
                client.writeQuery({ query: GET_ME, data:newData });
                await AsyncStorage.setItem(`${me.id}Activity${group.id}`,JSON.stringify([]) );
                Alert.alert('删除完成')
            }
        }
    

  render() {
    const type = this.props.navigation.getParam('type', "")
    const group = this.props.navigation.getParam('group', "")
    const client = this.props.navigation.getParam('client', "")
    return (
      <Container>
        <Header>
            <Left>
                <Button
                    onPress={() => this.props.navigation.goBack()}
                    transparent
                >
                    <Icon name='md-arrow-back' type='Ionicons' />
                </Button>
            </Left>
            <Body>
                <Title>聊天设置</Title>
            </Body>
            <Right>
            </Right>
        </Header>
        <Content>
          <List>
              <Query query={GET_ME}>
              {
                  ({loading,error,data})=>{
                      if(loading) return <Spinner />
                      if(error) return <Text>{errorMessage(error)}</Text>
                      const me = data.me
                      return(
                        <ListItem
                        onPress={()=>Alert.alert(
                            '确认删除聊天记录',
                            '',
                            [
                              {
                                text: '取消',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                              },
                              {text: '确认', onPress: async () => await this.clearMessages(type,group,client)},
                            ],
                            {cancelable: false},
                          )}
                        >
                        <Text>清空聊天记录</Text>
                        </ListItem>
                                )
                            }
                        }
              </Query>
          </List>
        </Content>
      </Container>
    );
  }
}