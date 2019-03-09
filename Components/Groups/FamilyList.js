import React, { Component } from 'react';
import { Avatar } from 'react-native-elements'
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { relationCompute, } from './settings'
import { headerBackgroundColor, headerFontColor, statusBarHeight, headerButtonColor } from '../../utils/settings'

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
                <Avatar
                  medium
                  title="水滴"
                  overlayContainerStyle={{ backgroundColor: 'blue' }}
                  onPress={() => console.log("Works!")}
                  activeOpacity={0.7}
                />
              </Left>
              <Body>
                <Text>{group.creater.name}</Text>
                <Text note numberOfLines={1}>{createrRelationship}</Text>
              </Body>
              <Right>
                <Button transparent>
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
                      <Avatar
                        medium
                        overlayContainerStyle={{ backgroundColor: family.to.user ? "blue" : "gray" }}
                        title={family.to.user ? "水滴" : "空"}
                        onPress={() => console.log("Works!")}
                        activeOpacity={0.7}
                      />
                    </Left>
                    <Body>
                      <Text>{family.to.name}</Text>
                      <Text note numberOfLines={1}>{familyRelationships[family.id]}</Text>
                    </Body>
                    <Right>
                      {
                        family.to.user && (
                          <Button transparent>
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