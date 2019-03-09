import React, { Component } from 'react';
import { Alert } from 'react-native'
import { Mutation} from 'react-apollo'
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Icon, Title, Spinner } from 'native-base';
import update from 'immutability-helper'

import { errorMessage } from '../../utils/tools'
import { headerBackgroundColor, headerFontColor, statusBarHeight, headerButtonColor } from '../../utils/settings'

import GET_WORKGROUPS from '../../graphql/get_workGroups.query'
import GET_ME from '../../graphql/get_me.query'
import ADD_WORKGROUP from '../../graphql/add_workGroup.mutation'
import CONFIRM_WORKGROUP from '../../graphql/confirm_workGroup.mutation'
import QueryColleagues from './QueryColleagues'



export default class WorkList extends Component {

  _renderAddBtn = (companyId, workerId) => (
    <Mutation 
    mutation={ADD_WORKGROUP}
    update={(cache, { data: { addWorkGroup } }) => {
      const prev = cache.readQuery({ query: GET_ME});
      const newData = update(prev,{
        me:{
          workGroups:{$push:[addWorkGroup]}
        }
      })
      cache.writeQuery({
        query: GET_ME,
        data: newData
      });
    }}

    >
      {
        (addWorkGroup, { loading, error }) => {
          if (loading) return <Spinner />
          return (
            <Button
              transparent
              onPress={() => addWorkGroup({ 
                variables: {companyId, workerId },
  
               })}
            >
              <Text>申请认证</Text>
              {error && Alert.alert(errorMessage(error))}
            </Button>
          )
        }
      }
    </Mutation>
  )

  _renderConfirmBtn = (groupId,companyId, workerId) => (
    <Mutation 
    mutation={CONFIRM_WORKGROUP}
    >
      {
        (confirmWorkGroup, { loading, error }) => {
          if (loading) return <Spinner />
          return (
            <Button
              transparent
              onPress={() =>{
                confirmWorkGroup({ 
                  variables: { companyId, workerId },
                  update:(cache, { data: { confirmWorkGroup } }) => {
                    const {me} = cache.readQuery({ query: GET_ME });
                    me.workGroups.map(group=>{
                      if(group.id===confirmWorkGroup.id){
                        return confirmWorkGroup
                      }
                      return group
                    })
                    cache.writeQuery({
                      query: GET_ME,
                      data: { me },
                    });
                  }
                 })
              } }
            >
              <Text>确认</Text>
              {error && Alert.alert(errorMessage(error))}
            </Button>
          )
        }
      }
    </Mutation>
  )

  _getMyGroups = (workGroups, myId) => {
    const myGroups = workGroups.filter(workGroup => {
      for (const colleague of workGroup.colleagues) {
        if (colleague.worker.id === myId && colleague.status === '1') {
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

  _getMyWillGroups = (workGroups, myId) => {
    const myGroups = workGroups.filter(workGroup => {
      for (const colleague of workGroup.colleagues) {
        if (colleague.worker.id === myId && colleague.status === '0') {
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

  _checkWorkerInGroup = (myGroup, workerId) => {

    for (const colleague of myGroup.colleagues) {
      if (colleague.worker.id === workerId) {
        return colleague.status
      }
    }
    return '-1'
  }

  _checkWorkerInWillGroup = (myWillGroups, workerId) => {
    for (const myWillGroup of myWillGroups) {
      for (const colleague of myWillGroup.colleagues) {
        if (colleague.worker.id === workerId && colleague.status === '1') {
          return '2'
        }
      }
    }
    return '-1'
  }


  renderButton = (workGroups, workerId, myId, companyId ) => {
    const myGroups = this._getMyGroups(workGroups, myId)
    const myWillGroups = this._getMyWillGroups(workGroups, myId)
    let colleagueStatus
    if (myGroups.length > 0) {
        colleagueStatus = this._checkWorkerInGroup(myGroups[0], workerId)
    }
    if (!(colleagueStatus === '1' || colleagueStatus === '0')) {
        colleagueStatus = this._checkWorkerInWillGroup(myWillGroups, workerId)
    }

    if (colleagueStatus === '0') {
      return (
        this._renderConfirmBtn(myGroups[0].id,companyId, workerId)
      )
    } else if (colleagueStatus === '1') {
      return (
        <Button transparent disabled>
          <Text>已认证</Text>
        </Button>
      )
    } else if (colleagueStatus === '2') {
      return (
        <Button transparent disabled>
          <Text>等待确认</Text>
        </Button>
      )
    }
    return (this._renderAddBtn(companyId, workerId))
  }

  render() {
    const work = this.props.navigation.getParam('work')
    const me = this.props.navigation.getParam('me', '')
    const newWorkGroups = this.props.navigation.getParam('newWorkGroups', '')
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
            <Title style={{ color: headerFontColor }}>{work.company.name}</Title>
          </Body>
          <Right >
          </Right>
        </Header>
        <Content>
          <QueryColleagues 
          work={work}
          me={me}
          renderButton={this.renderButton}
          workGroups={newWorkGroups}
          />
        </Content>
      </Container>
    );
  }
}