import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Left, Icon, Button, Right, Body, Title, Spinner, Badge } from 'native-base';

import { headerBackgroundColor, headerFontColor, statusBarHeight, headerButtonColor } from '../../utils/settings'

class FamilyGroup extends Component {

  render() {
    const me = this.props.navigation.getParam('me')
    const relativefamilyGroups = this.props.navigation.getParam('relativefamilyGroups')
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
            <Title style={{ color: headerFontColor }}>家庭群</Title>
          </Body>
          <Right >
          </Right>
        </Header>
        <Content>

          <List>
            {
              relativefamilyGroups.map(group => (
                <ListItem key={group.id} onPress={() => { this.props.navigation.navigate('FamilyContent', { group, me }) }}>
                  <Text>{group.name}</Text>
                </ListItem>
              ))
            }
          </List>

        </Content>
      </Container>
    );
  }
}

export default FamilyGroup