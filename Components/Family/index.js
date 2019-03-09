import React, { Component } from 'react';
import {
  Container,
  Content,
  Text,
  Button,
  List,
  ListItem,
  Left,
  Right,
  Body
} from 'native-base';
import { Avatar } from 'react-native-elements';
import { StyleSheet, TouchableOpacity, Alert } from 'react-native'
import {  Query,Mutation } from 'react-apollo'
import {withNavigation} from 'react-navigation'

import {getRelationshipName} from '../../utils/tools'
import DELETE_FAMILY from '../../graphql/delete_family.mutation'
import CONFIRM_FAMILY from '../../graphql/confirm_family.mutation'
import GET_ME  from '../../graphql/get_me.query'

class Family extends Component {

  state={
    connect:false
  }

  _onPressButton = (who,spouseId) => {
    // 连接前可以修改，连接后点击条目直接跳转到对方的
    switch (who.status) {
      case "0":
        this.props.navigation.navigate("AddFamily", {
          isAdd: false,
          familyId: who.id,
          name: who.to.name,
          toId: who.to.id,
          relationship: who.relationship,
          spouseId:spouseId,
          me:this.props.me
        })
        break;
      default:
        return null
    }

  }

  onPressAdd=(spouseId)=>{
    this.props.navigation.navigate("AddFamily", {
      isAdd: true,
      familyId: '',
      name: '',
      toId: '',
      relationship: 'father',
      spouseId:spouseId,
      me:this.props.me
    })
  }

  handleLongPress = (who,deleteFamily) => {
    switch (who.status) {
      case "0":
        Alert.alert(
          '提示',
          '确定要删除吗?',
          [
            { text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            { text: '确定', onPress: () => deleteFamily({ 
              variables: { familyId:who.id, toId:who.to.id },
              update: (cache, { data: { deleteFamily } }) => {
                // Read the data from our cache for this query.
                const {me} = cache.readQuery({ query: GET_ME });
                // Add our comment from the mutation to the end.
                const families = me.families.filter(family=>family.id!==deleteFamily.id)
                const data = {me:{...me,families}}
                // Write our data back to the cache.
                cache.writeQuery({ query: GET_ME, data} );
              }
            })
          },
          ]
        )
        break;
      default:
        return null
    }

   
  }

  connect = (who,me) => {
    this.props.navigation.navigate('SearchFamily', { who ,me})
  }

  _renderConnectBtn=(who,me)=>(
    <Button
      onPress={() => this.connect(who,me)}
    >
      <Text>连接</Text>
    </Button>
  )

  _renderConfirmBtn=(who)=>(
    <Mutation 
      mutation={CONFIRM_FAMILY}
      update={(cache, { data: { confirmFamily } }) => {
        const { me } = cache.readQuery({ query: GET_ME});
        const families = me.families.map((who) => { 
          if(who.id===confirmFamily.id){
            return Object.assign({},who,{status:confirmFamily.status})
          }else{
            return who
          }
          })
        cache.writeQuery({
          query: GET_ME,
          data: { me:{...me,families}  }
        });
      }}
      >
      {
        (confirmFamily,{loading})=>(
          <Button 
        warning
        onPress={()=>confirmFamily({ 
          variables: { familyId: who.id },
        })}
        >
          <Text>{`确认${loading ? '...':""}`}</Text>
        </Button>
        )
      }
      </Mutation>
  )

  _renderLeft=(who,spouseId)=>(
    <Avatar
      size="xlarge"
      rounded
      title={getRelationshipName(who.relationship)}
      onPress={() => this._onPressButton(who,spouseId)}
      overlayContainerStyle={{ backgroundColor: 'red' }}
      activeOpacity={0.7}
    />
  )

  _renderBody=(who,spouseId)=>(
    <Mutation
      mutation={DELETE_FAMILY}
      update={(cache, { data: { deleteFamily } }) => {
        const { me } = cache.readQuery({ query: GET_ME });
        const families = me.families.filter((who) => { return who.id !== deleteFamily.id })
        cache.writeQuery({
          query: GET_ME,
          data: { me:{...me,families}  }
        });
      }}
    >
      {deleteFamily => (
        <TouchableOpacity
          onPress={() => this._onPressButton(who,spouseId)}
          onLongPress={() => this.handleLongPress(who,deleteFamily)}
        >
          <Text style={styles.name}>{who.to.name}</Text>
        </TouchableOpacity>
      )}
    </Mutation>
  )

  _renderAddBtn = (spouseId) => (
    <Button block
        style={styles.addButton}
        onPress={() => this.onPressAdd(spouseId)}
    >
        <Text>添加成员</Text>
    </Button>
)

  render() {

    return (
      <Query query={GET_ME}>
          {
              ({ data }) => {
                  const families = data.me.families
                  let spouseId = ''
                  if (families && families.length > 0) {
                      const wifeOrHusband = families.filter(f => { return f.relationship === "wife" || f.relationship === "husband" })
                      if (wifeOrHusband.length > 0) {
                          spouseId = wifeOrHusband[0].id
                      }
                  }
                  return (
                    <Container>
                      <Content>
                          <List>
                              {families.length > 0 && families.map((who, index) => (
                                  <ListItem key={index}>
                                      <Left style={styles.left}>
                                          {this._renderLeft(who, spouseId)}
                                      </Left>
                                      <Body style={styles.center}>
                                          {this._renderBody(who, spouseId)}
                                      </Body>

                                      <Right style={styles.right}>
                                          {
                                              (() => {
                                                  switch (who.status) {
                                                      case "0":
                                                          return (this._renderConnectBtn(who, data.me))
                                                          break;
                                                      case "1":
                                                          return (<Text>等待认证</Text>)
                                                          break;
                                                      case '2':
                                                          return (this._renderConfirmBtn(who))
                                                          break;
                                                      case '3':
                                                          return (<Text>已连接</Text>)
                                                          break;
                                                      default:
                                                          return null
                                                  }
                                              })()
                                          }
                                      </Right>
                                  </ListItem>
                              ))}
                          </List>
                          {this._renderAddBtn(spouseId)}
                      </Content>
                      </Container>
                  )
              }
          }
      </Query>
  )
  }
}

export default withNavigation(Family)

const styles = StyleSheet.create({
  name: {
    fontSize: 18,
  },
  left: {
    flex: 0.2
  },
  center: {
    flex: 0.6,
    alignItems: "flex-start",
  },
  right: {
    flex: 0.3,
  },
  // button: {
  //   alignItems: "center",
  //   justifyContent: "center"
  // },
  addButton: {
    margin: 10,
  }

})
