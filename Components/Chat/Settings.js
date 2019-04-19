import React, { Component } from 'react';
import {Alert,AsyncStorage} from 'react-native'
import {Query} from 'react-apollo'
import { Container, Header, Content, List, ListItem, Text ,Left,Right,Body,Title,Icon,Button} from 'native-base';
import GET_ME from '../../graphql/get_me.query'


export default class Settings extends Component {

    clearMessages=async (userInfo,client)=>{
            
            const data = await client.readQuery({query:GET_ME})
            const me = data.me
            const newMessages = data.me.messages.filter(message => {
                if (message.to.id === userInfo.id || message.from.id === userInfo.id) {
                    return false
                }
                return true
            })
            const newData = {me:{...me,messages:newMessages}}
            // Write our data back to the cache.
            await client.writeQuery({ query: GET_ME, data:newData });
            await AsyncStorage.setItem(`${me.id}User${userInfo.id}`,JSON.stringify([]) );
            Alert.alert('删除完成')
        }

  render() {
    const userInfo = this.props.navigation.getParam('userInfo', "")
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
                                  {text: '确认', onPress: async () => await this.clearMessages(userInfo,client)},
                                ],
                                {cancelable: false},
                              )}
                        >
                        <Text>清除历史聊天记录</Text>
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