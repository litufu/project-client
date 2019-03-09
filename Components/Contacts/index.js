import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button,Spinner } from 'native-base';
import {Query,compose,graphql} from 'react-apollo'
import {withNavigation} from 'react-navigation'
import GET_ME from '../../graphql/get_me.query'
import GET_CLASSGROUPS from '../../graphql/get_classGroups.query'
import GET_MYOLDCOLLEAGUES from '../../graphql/get_myOldColleagues.query'
import GET_WORKGROUPS from '../../graphql/get_workGroups.query'

import {defaultAvatar} from '../../utils/settings'
import {errorMessage} from '../../utils/tools'

class Contacts extends Component {

  _getFamilyUsers=(familyGroups,me)=>{
    let users = []
    let userIds = []
    for(const familyGroup of familyGroups){
      for(const family of familyGroup.families){
        if(family.to.user && !~userIds.indexOf(family.to.user.id) && family.to.user.id!==me.id){
          users.push(family.to.user)
          userIds.push(family.to.user.id)
        }
      }
      for(const user of familyGroup.users){
        if(!~userIds.indexOf(user.id) && user.id!==me.id){
          users.push(user)
          userIds.push(user.id)
        }
      }
    }
    return users
  }

  _renderFamilyList=(relativefamilyGroups,me)=>(
   
      <List>
      {  this._getFamilyUsers(relativefamilyGroups,me).length>0 &&
        (<ListItem itemDivider>
        <Text>家人</Text>
      </ListItem> )}
      { (this._getFamilyUsers(relativefamilyGroups,me)).map(user=>(
          <ListItem thumbnail key={user.id}   onPress={()=>this.props.navigation.navigate('UserProfile',{id:user.id,me,come:'Group'})}>
          <Left>
            <Thumbnail square source={{ uri: (user.avatar && user.avatar.url) || defaultAvatar  }} />
          </Left>
          <Body>
            <Text>{user.name}</Text>
          </Body>
        </ListItem>
      ))}
      </List>
  )


  _getClassmates=(classGroups,me)=>{
    let users = []
    let userIds = []
    for(const classGroup of classGroups){
      for(const member of classGroup.members){
        if(member.student && !~userIds.indexOf(member.student.id) && member.status==='1' && member.student.id !== me.id){
          users.push(member.student)
          userIds.push(member.student.id)
        }
      }
    }
    return users
  }

  _renderClassMates=(classGroups,me)=>(
        <List>
          {this._getClassmates(classGroups,me).length>0 && 
            (<ListItem itemDivider>
          <Text>同学</Text>
        </ListItem>) }
        {(this._getClassmates(classGroups,me)).map(user=>(
            <ListItem thumbnail key={user.id}   onPress={()=>this.props.navigation.navigate('UserProfile',{id:user.id,me,come:'Group'})}>
            <Left>
              <Thumbnail square source={{ uri: (user.avatar && user.avatar.url) || defaultAvatar  }} />
            </Left>
            <Body>
              <Text>{user.name}</Text>
            </Body>
          </ListItem>
        ))}
        </List>
  )

  _getOldColleages=(myOldColleagues,me)=>{
    let users = []
    let userIds = []
    for(const myOldColleague of myOldColleagues){
        if(myOldColleague.to && !~userIds.indexOf(myOldColleague.to.id) && myOldColleague.status==='3' && myOldColleague.to.id !== me.id){
          users.push(myOldColleague.to)
          userIds.push(myOldColleague.to.id)
      }
    }
    return users
  }


  _renderOldColleages=(myOldColleagues,me)=>(
      <List>
        {this._getOldColleages(myOldColleagues,me).length>0 && 
          (<ListItem itemDivider>
        <Text>前同事</Text>
      </ListItem> )}
      {(this._getOldColleages(myOldColleagues,me)).map(user=>(
          <ListItem thumbnail key={user.id}  onPress={()=>this.props.navigation.navigate('UserProfile',{id:user.id,me,come:"Group"})}>
          <Left>
            <Thumbnail square source={{ uri: (user.avatar && user.avatar.url) || defaultAvatar  }} />
          </Left>
          <Body>
            <Text>{user.name}</Text>
          </Body>
        </ListItem>
      ))}
      </List>
  )

  _getNowColleages=(workGroups,me)=>{
    let users = []
    let userIds = []
    for(const workGroup of workGroups){
      for(const colleague of workGroup.colleagues){
        if(colleague.worker && !~userIds.indexOf(colleague.worker.id) && colleague.status==='1' && colleague.worker.id !== me.id){
          users.push(colleague.worker)
          userIds.push(colleague.worker.id)
        }
      }
    }
    return users
  }

  _renderNowColleages=(workGroups,me)=>{
        <List>
              {this._getNowColleages(workGroups,me).length>0 && 
            (<ListItem itemDivider>
          <Text>现同事</Text>
        </ListItem> )}
        {(this._getNowColleages(workGroups,me)).map(user=>(
            <ListItem thumbnail key={user.id}  onPress={()=>this.props.navigation.navigate('UserProfile',{id:user.id,me,come:'Group'})}>
            <Left>
              <Thumbnail square source={{ uri: (user.avatar && user.avatar.url) || defaultAvatar  }} />
            </Left>
            <Body>
              <Text>{user.name}</Text>
            </Body>
          </ListItem>
        ))}
        </List>
  }

  render() {
    const {me} = this.props.getMedata
    const {classGroups} = this.props.getClassGroupsdata
    const {myOldColleagues} = this.props.getMyoldColleaguesdata
    const {workGroups} = this.props.getWorkGroupsdata
    
    if(
      this.props.getMedata.loading 
      || this.props.getClassGroupsdata.loading
      || this.props.getMyoldColleaguesdata.loading
      || this.props.getWorkGroupsdata.loading
      ){
        return <Spinner />
      }
 
    return (
          <List>
            {this._renderFamilyList(this.props.getMedata.me.relativefamilyGroups,me,)}
            {this._renderClassMates(this.props.getClassGroupsdata.classGroups,me)}
            {this._renderOldColleages(this.props.getMyoldColleaguesdata.myOldColleagues,me)}
            {this._renderNowColleages(this.props.getWorkGroupsdata.workGroups,me)}
          </List>

    );
  }
}

// export default withNavigation(Contacts)

export default compose(
  withNavigation,
  
  graphql(GET_CLASSGROUPS, { name: 'getClassGroupsdata' }),
  graphql(GET_MYOLDCOLLEAGUES, { name: 'getMyoldColleaguesdata' }),
  graphql(GET_WORKGROUPS, { name: 'getWorkGroupsdata' }),
  graphql(GET_ME, { name: 'getMedata' }),
)(Contacts);