import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet, StatusBar, AsyncStorage } from 'react-native'
import { withNavigation } from 'react-navigation'
import _ from 'lodash'

import QueryMessages from './QueryMessages'
import QueryGroupMessages from './QueryGroupMessages'

class Messages extends Component {

  state = {
    messages: [],
    groupsMessages: [],
    groupsIds: []
  }

  async componentDidMount() {
    const meId = this.props.me.id
    const keys = await AsyncStorage.getAllKeys()
    let messages = []
    const groupsMessages = []
    const groupsIds = []
    for (const key of keys) {
      if(_.startsWith(key, meId)){
        if (~key.indexOf('User')) {
          const pmessages = await AsyncStorage.getItem(key)
          if (pmessages !== null) {
            messages = messages.concat(JSON.parse(pmessages))
          }
        }
        let groupId
        let gMessages
        if (~key.indexOf('Family')) {
          groupId = key.replace(/.*Family/g, "")
        } else if (~key.indexOf('ClassMate')) {
          groupId = key.replace(/.*ClassMate/g, "")
        } else if (~key.indexOf('Colleague')) {
          groupId = key.replace(/.*Colleague/g, "")
        } else if (~key.indexOf('FellowTownsman')) {
          groupId = key.replace(/.*FellowTownsman/g, "")
        }
        if(groupId){
          gMessages = await AsyncStorage.getItem(key)
          const parsedGroupMessages = JSON.parse(gMessages)
          if (gMessages !== null  && parsedGroupMessages.length>0) {
            const obj = {}
            obj[groupId] = parsedGroupMessages
            groupsIds.push(groupId)
            groupsMessages.push(obj)
          }
        }
      }
    }

    this.setState({ messages, groupsMessages, groupsIds })
  }

  render() {
    const {messages,groupsMessages,groupsIds} = this.state
    return (
      <View style={styles.container}>
        <QueryGroupMessages
          navigation={this.props.navigation}
          groupsMessages={groupsMessages}
          groupsIds={groupsIds}
          
        />
        <QueryMessages
          navigation={this.props.navigation}
          me={this.props.me}
          messages={messages}
        />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});


export default withNavigation(Messages)