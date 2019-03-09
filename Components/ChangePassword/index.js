import React, {Component} from 'react'
import {
  Container,
  Header,
  Left,
  Right,
  Body,
  Button,
  Icon,
  Title,
  Content,
  Form,
  Item,
  Label,
  Input,
  Text,
  Spinner,
} from 'native-base'
import {  Alert,View} from "react-native"
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { headerBackgroundColor, headerFontColor, statusBarHeight, headerButtonColor } from '../../utils/settings'



const CHANGE_PASSWORD = gql`
mutation changePassword($currentPassword: String!, $newPassword: String!) {
    changePassword(currentPassword: $currentPassword, newPassword: $newPassword) {
      id
      token
    }
}
`
export default class ChangePassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newPassword: "",
            currentPassword: "",
            confirmPassword: ""
        };
    }

    validateChangepassword = ()=> {

        const pPattern = /^.*(?=.{6,20})(?=.*\d)(?=.*[a-zA-Z]).*$/

        let ok = false

        if (this.state.currentPassword.trim().length === 0) {
            Alert.alert("请输入原始密码");
        } else if (this.state.newPassword.trim().length === 0) {
            Alert.alert("请输入新密码");
        } else if (this.state.newPassword != this.state.confirmPassword) {
            Alert.alert("两次输入的密码不一致");
        } else if (this.state.currentPassword == this.state.newPassword) {
            Alert.alert("原始密码与新密码相同,请使用新密码");
        } else if (!pPattern.test(this.state.currentPassword)) {
            Alert.alert("原始密码错误");
        }else if (!pPattern.test(this.state.newPassword)) {
            Alert.alert("新密码格式错误,须由长度为6-20位的数字和字母组成");
        } else {
            ok = true
        }
        return ok
    }

    renderChangePwdBtn = (currentPassword,newPassword,confirmPassword)=>{
      return (
        <Mutation mutation={CHANGE_PASSWORD}>
        {(changePassword, { loading, error, data }) => {
          if (loading) return (
            <Button block primary>
              <Text style={{fontSize:20}}>确 认</Text>
              <Spinner color='blue' />
            </Button>
          );

          if (error)  {
            return (
              <Button block primary onPress={async () => {
                  const valid = this.validateChangepassword()
                  if(valid) {
                    try{
                      const result = await changePassword({ variables: { currentPassword,newPassword} })
                      const { token } = result.data.changePassword
                      await SecureStore.setItemAsync('token', token)
                      this.props.navigation.navigate('Profile')
                      Alert.alert('密码修改成功','',
                        [{text: 'OK', onPress: () =>  this.props.navigation.navigate('Profile')},]
                      ,{ onDismiss: () => this.props.navigation.navigate('Profile') }
                    )
                    }catch(error){
                      Alert.alert('密码修改失败',error.message.replace(/GraphQL error:/g, ""))
                    }
                  }
                }}>
                <Text style={{fontSize:20}}>确 认</Text>
              </Button>
            )
          };

          return(
            <Button block primary onPress={async () => {
                const valid = this.validateChangepassword()
                if(valid) {
                  try{
                    const result = await changePassword({ variables: { currentPassword,newPassword} })
                    this.props.navigation.navigate('Profile')
                    Alert.alert('密码修改成功','',
                      [{text: 'OK', onPress: () =>  this.props.navigation.navigate('Profile')},]
                    ,{ onDismiss: () => this.props.navigation.navigate('Profile') }
                  )
                  }catch(error){
                    Alert.alert('修改密码失败',error.message.replace(/GraphQL error:/g, ""),)
                  }
                }
              }}>
              <Text style={{fontSize:20}}>确 认</Text>
            </Button>
          )
        }}
        </Mutation>
      )
    }

    render() {
      const { currentPassword,newPassword,confirmPassword } = this.state
        return (
            <Container>
              <Header style={{ marginTop: statusBarHeight }}>
                <Left >
                  <Button
                    onPress={() => this.props.navigation.goBack()}
                    transparent
                  >
                    <Icon name='md-arrow-back' type='Ionicons' />
                  </Button>
                </Left>
                <Body style={{ alignItems: 'flex-end', justifyContent: "center", }}>
                  <Title>修改密码</Title>
                </Body>
                <Right />
              </Header>
              <Content>
             <Item inlineLabel>
               <Input
               sentr
                placeholder="当前密码"
                secureTextEntry
                value={currentPassword}
                onChangeText={(currentPassword) => this.setState({currentPassword})}
               />
             </Item>
             <Item inlineLabel last>
               <Input
               placeholder="请输入新密码"
               secureTextEntry
               value={newPassword}
               onChangeText={(newPassword) => this.setState({newPassword})}
                />
             </Item>
             <Item inlineLabel last>
               <Input
                placeholder="请再次确认新密码"
                secureTextEntry
                value={this.state.confirmPassword}
                onChangeText={(confirmPassword) => this.setState({confirmPassword})}
                />
             </Item>
             <View style={{padding:10}}>
            {this.renderChangePwdBtn(currentPassword,newPassword,confirmPassword)}
            </View>
            </Content>
            </Container>
        );
    }
}

