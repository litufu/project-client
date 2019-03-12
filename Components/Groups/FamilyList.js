import React, { Component } from 'react';
import {TouchableWithoutFeedback} from 'react-native'
import { Avatar } from 'react-native-elements'
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { relationCompute, } from './settings'
import { headerBackgroundColor, headerFontColor, statusBarHeight, headerButtonColor, defaultAvatar } from '../../utils/settings'

export default class FamilyList extends Component {
  render() {
    const group = this.props.navigation.getParam('group')
    const me = this.props.navigation.getParam('me')
    const { familyRelationships, createrRelationship } = relationCompute(group.families, me.id, group.creater)

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
            <Title style={{ color: headerFontColor }}>{group.name}</Title>
          </Body>
          <Right >
          </Right>
        </Header>
        <Content>
          <List>
            <ListItem thumbnail>
              <Left>
                <TouchableWithoutFeedback
                    onPress={() => this.props.navigation.navigate('UserProfile', { id: group.creater.id })}
                >
                    <Thumbnail source={{ uri: group.creater.avatar ? group.creater.avatar.url : defaultAvatar }} />
                </TouchableWithoutFeedback>
            </Left>
              <Body>
                <Text>{group.creater.name}</Text>
                <Text note numberOfLines={1}>{createrRelationship}</Text>
              </Body>
              <Right>
                <Button 
                onPress={() => this.props.navigation.navigate('UserProfile', { id: group.creater.id })}
                transparent>
                  <Text>查看</Text>
                </Button>
              </Right>
            </ListItem>
            {
              group.families.sort((a, b) => {
                if (a.to.user && b.to.user) {
                  return 0
                } else {
                  if (a.to.user) {
                    return -1
                  }
                  if (b.to.user) {
                    return 1
                  }
                  return 0
                }
              }).map(family => {

                return (
                  <ListItem thumbnail key={family.id}>
                          <Left>
                <TouchableWithoutFeedback
                >
                    <Thumbnail source={{ uri: family.to.avatar ? family.to.avatar.url : defaultAvatar }} />
                </TouchableWithoutFeedback>
            </Left>
                    <Body>
                      <Text>{family.to.name}</Text>
                      <Text note numberOfLines={1}>{familyRelationships[family.id]}</Text>
                    </Body>
                    <Right>
                      {
                        family.to.user && (
                          <Button 
                          transparent
                          onPress={() => this.props.navigation.navigate('UserProfile', { id: family.to.user.id })}
                          >
                            <Text>查看</Text>
                          </Button>
                        )
                      }
                    </Right>
                  </ListItem>
                )
              })
            }
          </List>
        </Content>
      </Container>
    );
  }
}