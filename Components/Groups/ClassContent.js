import React, { Component } from 'react';
import { withNavigation } from 'react-navigation'
import {Alert} from 'react-native'
import { Container, Header, Content, Icon, Text, Item, Button, Left, Right, Body, Title } from 'native-base';

import { headerBackgroundColor, headerFontColor, statusBarHeight, headerButtonColor } from '../../utils/settings'

class ClassContent extends Component {

  _getMyGroups = (classGroups, myId) => {
    const myGroups = classGroups.filter(classGroup => {
      for (const member of classGroup.members) {
        if (member.student.id === myId && member.status === '1') {
          return true
        }
      }
      return false
    })
    if (myGroups.length > 0) {
      return myGroups
    }
    return []
  }

  _goToChat=(groups,me,type,groupName)=>{
    if(groups.length===0){
      Alert.alert('添加同学后才可群聊')
      return
    }
    this.props.navigation.navigate('GroupChat', { group: groups[0], me, type, groupName })
  }

  render() {
    const schoolEdu = this.props.navigation.getParam('schoolEdu', '')
    const schoolEduName = this.props.navigation.getParam('schoolEduName', '')
    const me = this.props.navigation.getParam('me', '')
    const classGroups = this.props.navigation.getParam('classGroups', '')
    // 我在该班级的所有组（包括已经加入的和正准备加入的组)
    const newClassGroups = classGroups.filter(classGroup => classGroup.study.id === schoolEdu.id)
    // 我已经确定加入的组
    const myClassGroups = this._getMyGroups(newClassGroups,me.id)
    const myClassGroup = myClassGroups.length>0 ?myClassGroups[0] :[]
    return (
      <Container>
        <Header style={{ marginTop: statusBarHeight, backgroundColor: headerBackgroundColor }}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.goBack()}
            >
              <Icon name='arrow-back' style={{ color: headerButtonColor }} />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: headerFontColor }}>{schoolEduName}</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Item style={{ padding: 5, alignItems: "stretch", justifyContent: 'space-between' }}>
            <Button
              transparent
              vertical
              onPress={() => this.props.navigation.navigate('ClassList', { schoolEdu, schoolEduName, me, newClassGroups })}
            >
              <Icon name="list" type="FontAwesome" />
              <Text>成员列表</Text>
            </Button>
            <Button
              transparent
              vertical
              onPress={() => this._goToChat(myClassGroups,me,'ClassMate',schoolEduName) }
            >
              <Icon name="chat" type='Entypo' />
              <Text>群聊</Text>
            </Button>
            <Button transparent vertical>
              <Icon active name="settings" type='MaterialIcons' />
              <Text>群设置</Text>
            </Button>
            <Button transparent vertical>
              <Icon name="man" type='Entypo' />
              <Text>群主</Text>
            </Button>
          </Item>

        </Content>
      </Container>

    );
  }
}

export default withNavigation(ClassContent)