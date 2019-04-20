import React, { Component } from 'react';
import { Alert } from 'react-native'
import { Mutation, Query} from 'react-apollo'
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Icon, Title, Spinner } from 'native-base';

import { errorMessage } from '../../utils/tools'
import { headerBackgroundColor, headerFontColor, statusBarHeight, headerButtonColor } from '../../utils/settings'

import GET_ME from '../../graphql/get_me.query'
import ADD_CLASSGROUP from '../../graphql/add_classGroup.mutation'
import CONFIRM_CLASSGROUP from '../../graphql/confirm_classGroup.mutation'
import QueryStudents from './QueryStudents'

export default class ClassList extends Component {

  _renderAddBtn = (name, schoolEduId, studentId) => (
    <Mutation 
    mutation={ADD_CLASSGROUP}
    update={(cache, { data: { addClassGroup } }) => {
      const { me } = cache.readQuery({ query: GET_ME});
      let newClassGroups
      if(me.classGroups.filter(classGroup=>classGroup.study.id===schoolEduId).length>0){
        newClassGroups=me.classGroups.map(classGroup=>{
          if(classGroup.study.id===schoolEduId){
            return addClassGroup
          }
          return classGroup
        })
      }else{
        newClassGroups = me.classGroups.concat([addClassGroup])
      }
      cache.writeQuery({
        query: GET_ME,
        data: { me: {...me,classGroups:newClassGroups} }
      });
    }}

    >
      {
        (addClassGroup, { loading, error }) => {
          return (
            <Button
              transparent
              onPress={() => addClassGroup({ 
                variables: { name, schoolEduId, studentId },
  
               })}
            >
              <Text>{`添加${loading ? "...":""}`}</Text>
              {error && Alert.alert(errorMessage(error))}
            </Button>
          )
        }
      }
    </Mutation>
  )

  _renderConfirmBtn = (groupId,schoolEduId, studentId,refetch,networkStatus) => (
    <Mutation 
    mutation={CONFIRM_CLASSGROUP}
    >
      {
        (confirmClassGroup, { loading, error }) => {
          if(networkStatus===4) return <Spinner />
          return (
            <Button
              transparent
              onPress={() =>{
                confirmClassGroup({ 
                  variables: { schoolEduId, studentId },
                 })
              } }
            >
              <Text>{`确认${loading ? "...":""}`}</Text>
              {error && Alert.alert(errorMessage(error))}
            </Button>
          )
        }
      }
    </Mutation>
  )

  _getMyGroups = (classGroups, myId,schoolEduId) => {
    const myGroups = classGroups.filter(classGroup => {
      for (const member of classGroup.members) {
        if (member.student.id === myId && member.status === '1' && classGroup.study.id===schoolEduId ) {
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

  _getMyWillGroups = (classGroups, myId,schoolEduId) => {
    const myGroups = classGroups.filter(classGroup => {
      for (const member of classGroup.members) {
        if (member.student.id === myId && member.status === '0'&&classGroup.study.id===schoolEduId) {
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

  _checkStudentInGroup = (myGroup, studentId,schoolEduId) => {
  
    for (const member of myGroup.members) {
      if (member.student.id === studentId && schoolEduId === myGroup.study.id) {
        return member.status
      }
    }
    return '-1'
  }

  _checkStudentInWillGroup = (myWillGroups, studentId,schoolEduId) => {
    for (const myWillGroup of myWillGroups) {
      for (const member of myWillGroup.members) {
        if (member.student.id === studentId && member.status === '1' && myWillGroup.study.id===schoolEduId) {
          return '2'
        }
      }
    }
    return '-1'
  }


  renderButton = (classGroups, studentId, myId, schoolEduId, schoolEduName,refetch, networkStatus ) => (
    <Query query={GET_ME}>
    {
      ({loading,error,data})=>{
        if(loading) return <Spinner/>
        if(error) return <Text>{errorMessage(error)}</Text>
        const classGroups = data.me.classGroups
        
        const myGroups = this._getMyGroups(classGroups, myId,schoolEduId)
        const myWillGroups = this._getMyWillGroups(classGroups, myId,schoolEduId)
        let studentStatus
        if (myGroups.length > 0) {
          studentStatus = this._checkStudentInGroup(myGroups[0], studentId,schoolEduId)
        }
        if (!(studentStatus === '1' || studentStatus === '0')) {
          studentStatus = this._checkStudentInWillGroup(myWillGroups, studentId,schoolEduId)
        }

        if (studentStatus === '0') {
          return (
            this._renderConfirmBtn(myGroups[0].id,schoolEduId, studentId,refetch,networkStatus)
          )
        } else if (studentStatus === '1') {
          return (
            <Button transparent disabled>
              <Text>已认证</Text>
            </Button>
          )
        } else if (studentStatus === '2') {
          return (
            <Button transparent disabled>
              <Text>等待确认</Text>
            </Button>
          )
        }
        return (this._renderAddBtn(schoolEduName, schoolEduId, studentId))
      }
    }
    </Query>
  )

  render() {
    const schoolEdu = this.props.navigation.getParam('schoolEdu')
    const schoolEduName = this.props.navigation.getParam('schoolEduName', '')
    const me = this.props.navigation.getParam('me', '')
    const newClassGroups = this.props.navigation.getParam('newClassGroups', '')
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
          <Right >
          </Right>
        </Header>
        <Content>
          <QueryStudents 
          schoolEdu={schoolEdu}
          schoolEduName={schoolEduName}
          me={me}
          renderButton={this.renderButton}
          classGroups={newClassGroups}
          navigation={this.props.navigation}
          />
        </Content>
      </Container>
    );
  }
}