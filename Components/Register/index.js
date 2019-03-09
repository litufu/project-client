import React from 'react'
import { TouchableNativeFeedback,StyleSheet,View,KeyboardAvoidingView,Alert} from 'react-native'
import { Button,Text,Input,Item ,Label,Container,Spinner,Content} from 'native-base';
import { Mutation } from 'react-apollo'
import {Constants} from 'expo'

import {errorMessage} from '../../utils/settings'

import SIGNUP from '../../graphql/signup.mutation'

const deviceId = Constants.isDevice ? Constants.deviceId : "123"

export default class Register extends React.Component{
  state = {
      username: '',
      password: '',
      password2: ''
  }
// 验证用户名和密码
  validateRegister = (username, password, password2) => {
      let messages = ''

      if ( !username || !password || !password2) {
          messages += '用户名和密码不能为空。'
      }

      if(username){
        const uPattern = /^[a-zA-Z0-9_-]{4,16}$/
        const usernameTest = uPattern.test(username)
        if (!usernameTest) messages += '用户名须由4到16位的字母、数字或下划线组成。'
      }

      if(password){
        const pPattern = /^.*(?=.{6,20})(?=.*\d)(?=.*[a-zA-Z]).*$/;
        const passwordTest = pPattern.test(password)
        if (!passwordTest) messages += '密码须由6到20位字母和数字组成。'
      }

      if (password !== password2) messages += '两次输入的密码不一致。'

      if (messages) {
          Alert.alert('注册失败', messages, [{ text: 'OK' }])
          return { ok: false }
      }
      return { ok: true }
  }
// 注册新账号的按钮
  renderSignupButton=(username,password,password2)=>(
      <Mutation 
      onError={(error)=>Alert.alert(errorMessage(error))}
      onCompleted={()=>{
        Alert.alert("注册成功.请登录")
        this.props.navigation.navigate('Login')
      }}
      mutation={SIGNUP}
      >
        {(signup, { loading}) => {
          return(
              <Button block primary onPress={async () => {
                  const valid = this.validateRegister(username,password,password2)
                  if(valid.ok) {
                    try{
                      const result = await signup({ variables: { username,password,deviceId } });
                    }catch(error){
                      Alert.alert('注册失败',error.message.replace(/GraphQL error:/g, ""),
                        [{text: 'OK', onPress: () => this.props.navigation.navigate('Register')},
                      ],{ onDismiss: () => this.props.navigation.navigate('Register') })
                      this.props.navigation.navigate('Register')
                    }
                  }
                }}>
                <Text style={styles.bigText}>注 册</Text>
                {loading && <Spinner color='blue' />}
              </Button>
          )
        }}
      </Mutation>
    )


  render(){
    const {username,password,password2} = this.state
    return(
      <KeyboardAvoidingView
        behavior={'padding'}
        contentContainerStyle={styles.container}
        style={styles.container}
      >
            <View style={styles.topStyle}>
                <Text style={styles.title}>新用户注册</Text>
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
              <Item floatingLabel>
                <Label>确认密码</Label>
                <Input
                    secureTextEntry
                    onChangeText={text => this.setState({password2:text})}
                    value={this.state.password2}
                />
              </Item>
            {this.renderSignupButton(username,password,password2)}
            </View>

            <View style={styles.bottomStyle}>
                <TouchableNativeFeedback
                    onPress={() => this.props.navigation.navigate('Login')}
                >
                  <Text style={styles.blueText}>返 回 登 陆</Text>
                </TouchableNativeFeedback>
            </View>
        </KeyboardAvoidingView>
    )
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
  title:{
    fontSize:36,
  },
  bigText:{
    // fontSize:20,
  },
  topStyle:{
    justifyContent:"flex-end",
    padding:10,
    height:130,
    alignItems:"center",
  },
  centerSyle:{
    justifyContent: "space-between",
    height:280,
  },
  bottomStyle:{
    flexDirection:"row",
    height:100,
    justifyContent: "space-between",

  },
});
