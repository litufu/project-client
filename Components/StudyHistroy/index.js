import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Segment, Content, Text } from 'native-base';

import Events from './Events'
import Study from './Study'
import {headerBackgroundColor,headerFontColor,statusBarHeight,headerButtonColor} from '../../utils/settings'

export default class StudyHistroy extends Component {

    state={
        selected:1
    }

  render() {
    return (
      <Container>
        <Header hasSegment style={{marginTop:statusBarHeight}}>
          <Left style={{justifyContent:'flex-end'}}>
            <Button transparent onPress={()=>this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body style={{alignItems:'center'}}>
            <Title>学习经历</Title>
          </Body>
          <Right>

          </Right>
        </Header>
        <Segment>
          <Button first active={this.state.selected===1} onPress={()=>this.setState({selected:1})}>
            <Text>求学列表</Text>
          </Button>
          <Button last active={this.state.selected===2} onPress={()=>this.setState({selected:2})}>
            <Text>添加</Text>
          </Button>
        </Segment>

        <Content padder>
          {this.state.selected===1 &&  <Events />}
          {this.state.selected===2 &&  <Study />}
        </Content>
      </Container>
      
    );
  }
}
