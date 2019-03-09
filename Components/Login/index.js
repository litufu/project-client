import React from 'react'
import {
  Image,
  TouchableNativeFeedback,
  View ,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
} from 'react-native'
import { SecureStore } from 'expo'
import { Button,Text,Input,Item ,Label,Container,Spinner,Thumbnail} from 'native-base';
import {Avatar} from 'react-native-elements'
import { Mutation } from 'react-apollo'

import LOGIN from '../../graphql/login.mutation'

export default class Login extends React.Component{
  state = {
      username: '',
      password: ''
  }
// 验证用户名和密码
  validateLogin = (username, password) => {
      let messages = ''

      if (!username) {
        messages += '用户名为空, '
      }else {
          const uPattern = /^[a-zA-Z0-9_-]{4,16}$/
          const usernameTest = uPattern.test(username)
          if (!usernameTest) messages += '用户名不正确, '
      }

      if (!password) {
        messages += '密码为空'
      }else{
        const pPattern = /^.*(?=.{6,20})(?=.*\d)(?=.*[a-zA-Z]).*$/;
        const passwordTest = pPattern.test(password)
        if (!passwordTest) messages += '密码错误'
      }

      if (messages) {
          Alert.alert('登录失败', messages, [{ text: 'OK' }])
          return { ok: false }
      }

      return { ok: true }
  }
// 渲染登录按钮
  renderLoginButton=(username,password)=>(
      <Mutation 
      mutation={LOGIN}
      >
        {(login, { loading, error, data }) => {
          if (loading) return (
            <Button disabled block primary>
              <Text style={styles.bigText}>正 在 登 录</Text>
              <Spinner color='blue' />
            </Button>
          );

          if (error)  {
            return (
              <Button block primary onPress={async () => {
                  const valid = this.validateLogin(username,password)
                  if(valid.ok) {
                    try{
                      const result = await login({ variables: { username:username,password:password} })
                      this.props.navigation.navigate('App')
                      const { token } = result.data.login
                      await SecureStore.setItemAsync('token', token)
                    }catch(error){
                      Alert.alert('登录失败',error.message.replace(/GraphQL error:/g, ""),
                        [{text: 'OK', onPress: () => this.props.navigation.navigate('Login')},
                      ],{ onDismiss: () => this.props.navigation.navigate('Login') })
                      this.props.navigation.navigate('Login')
                    }
                  }
                }}>
                <Text style={styles.bigText}>登 录</Text>
              </Button>
            )
          };

          return(
              <Button block primary onPress={async () => {
                  const valid = this.validateLogin(username,password)
                  if(valid.ok) {
                    try{
                      const result = await login({ variables: { username:username,password:password} })
                      this.props.navigation.navigate('App')
                      const { token } = result.data.login
                      await SecureStore.setItemAsync('token', token)
                    }catch(error){
                      Alert.alert('登录失败',error.message.replace(/GraphQL error:/g, ""),
                        [{text: 'OK', onPress: () => this.props.navigation.navigate('Login')},
                      ],{ onDismiss: () => this.props.navigation.navigate('Login') })
                      this.props.navigation.navigate('Login')
                    }
                  }
                }}>
                <Text style={styles.bigText}>登 录</Text>
              </Button>
          )
        }}
      </Mutation>
    )

    render(){
      const {username,password} = this.state
      return(
        <KeyboardAvoidingView
          behavior={'padding'}
          contentContainerStyle={styles.container}
          style={styles.container}
        >
          <View >
              <View style={styles.topStyle} >
                <Thumbnail 
                style={{height:100,width:100,marginBottom:30}}
                square
                source={require('../../assets/icon.png')} /> 
              </View>

              <View style={styles.centerSyle}>
                <Item floatingLabel>
                  <Label>用户名</Label>
                  <Input
                      onChangeText={text => this.setState({username:text})}
                      value={this.state.username}
                  />
                  </Item>
                  <Item floatingLabel>
                    <Label>密码</Label>
                    <Input
                        secureTextEntry
                        onChangeText={text => this.setState({password:text})}
                        value={this.state.password}
                    />
                  </Item>
                  {this.renderLoginButton(username,password)}
              </View>
              <View style={styles.bottomStyle}>
                <View style={styles.newAccount}>
                  <TouchableNativeFeedback
                      onPress={() => this.props.navigation.navigate('Register')}
                  >
                      <Text style={styles.blueText} >创建账号</Text>
                  </TouchableNativeFeedback>
                </View>
                <View style={styles.forgetPassword}>
                  <TouchableNativeFeedback
                      onPress={() => Alert.alert('密码找回规则',"需要自己的两名家人在其设置页面-设置选项-找回密码选项中帮你找回密码。")}
                  >
                      <Text style={styles.blueText}>忘记密码</Text>
                  </TouchableNativeFeedback>
                </View>
              </View>
          </View>
        </KeyboardAvoidingView>
      );
    }

}


const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 20,
    paddingTop: 23,
    justifyContent: "space-between",
  },
  blueText: {
    color: 'blue',
  },
  bigText:{
    fontSize:20,
  },
  topStyle:{
    justifyContent:"flex-end",
    padding:10,
    height:200,
    alignItems:"center",
  },
  centerSyle:{
    justifyContent: "space-between",
    height:210,
  },
  bottomStyle:{
    flexDirection:"row",
    height:100,
    justifyContent: "space-between",

  },
  newAccount:{
    flex:0.4,
    alignItems:"flex-start",
    justifyContent:"center",
  },
  forgetPassword:{
    flex:0.4,
    alignItems:"flex-end",
    justifyContent:"center",
  }
});
