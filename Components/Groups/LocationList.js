import React, { Component } from 'react';
import { Alert } from 'react-native'
import { Mutation} from 'react-apollo'
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Icon, Title, Spinner } from 'native-base';

import { errorMessage } from '../../utils/tools'
import { headerBackgroundColor, headerFontColor, statusBarHeight, headerButtonColor } from '../../utils/settings'

import QuerylocationGroupUsers from './QuerylocationGroupUsers'

export default class WorkList extends Component {

  render() {
    const locationGroup = this.props.navigation.getParam('locationGroup')
    const me = this.props.navigation.getParam('me', '')
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
            <Title style={{ color: headerFontColor }}>{locationGroup.name}</Title>
          </Body>
          <Right >
          </Right>
        </Header>
        <Content>
            <QuerylocationGroupUsers
            locationGroup={locationGroup}
            me={me}
            />
        </Content>
      </Container>
    );
  }
}
