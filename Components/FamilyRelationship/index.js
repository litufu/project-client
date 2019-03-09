import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Segment, Content, Text } from 'native-base';

import Genealogy from '../Genealogy'
import Family from '../Family'
import {headerBackgroundColor,headerFontColor,statusBarHeight,headerButtonColor} from '../../utils/settings'

export default class Example extends Component {

    state={
        selected:1
    }

  render() {
    const me = this.props.navigation.getParam('me')
    return (
      <Container>
        <Header hasSegment style={{marginTop:statusBarHeight}}>
          <Left style={{justifyContent:'flex-end'}}>
            <Button transparent onPress={()=>this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body style={{alignItems:'center'}}>
            <Title>家庭成员</Title>
          </Body>
          <Right>

          </Right>
        </Header>
        <Segment >
          <Button first active={this.state.selected===1} onPress={()=>this.setState({selected:1})}>
            <Text>关系图</Text>
          </Button>
          <Button last active={this.state.selected===2} onPress={()=>this.setState({selected:2})}>
            <Text>添加成员</Text>
          </Button>
        </Segment>

        <Content padder>
          {this.state.selected===1 &&  <Genealogy />}
          {this.state.selected===2 &&  <Family me={me}/>}
        </Content>
      </Container>
      
    );
  }
}
