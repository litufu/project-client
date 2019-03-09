import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text,Left,Icon,Button,Right,Body,Title } from 'native-base';

import {headerBackgroundColor,headerFontColor,statusBarHeight,headerButtonColor} from '../../utils/settings'


export default class LocationGroup extends Component {
  render() {
    const me = this.props.navigation.getParam('me')
    const locationGroups = this.props.navigation.getParam('locationGroups')
    return (
        <Container>
        <Header style={{marginTop:statusBarHeight,backgroundColor:headerBackgroundColor}}>
        <Left>
            <Button 
            transparent
            onPress={()=>this.props.navigation.goBack()}
            >
              <Icon name='arrow-back' style={{color:headerButtonColor}}/>
            </Button>
            </Left>
          <Body>
            <Title style={{color:headerFontColor}}>老乡群</Title>
          </Body>
          <Right />
          </Header>
        <Content>
        <List>
                {
                    locationGroups.map(locationGroup => (
                        <ListItem key={locationGroup.id} onPress={() => this.props.navigation.navigate('LocationContent', { locationGroup, me })}>
                            <Text>{locationGroup.name}</Text>
                        </ListItem>
                    ))
                }
            </List>
        </Content>
      </Container>
    );
  }
}