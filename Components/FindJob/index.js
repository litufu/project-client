import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Segment, Content, Text } from 'native-base';

import Results from './Results'
import JobList from './JobList'
import Settings from './Settings'
import {headerBackgroundColor,headerFontColor,statusBarHeight,headerButtonColor} from '../../utils/settings'

export default class FindJob extends Component {

    state={
        selected:1
    }

  render() {
    const {selected} = this.state
    return (
      <Container>
        <Header hasSegment style={{marginTop:statusBarHeight}}>
          <Left style={{justifyContent:'flex-end'}}>
            <Button transparent onPress={()=>this.props.navigation.goBack()}>
             <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body style={{alignItems:'center'}}>
            <Title >同样的工作,更高的薪酬</Title>
          </Body>
          <Right>
            {this.state.selected===1 && <Button><Text>修改</Text></Button>}
          </Right>
        </Header>
        <Segment >
          <Button 
          first 
          active={selected===1} 
          onPress={()=>this.setState({selected:1})} 
          >
            <Text  >求职设置</Text>
          </Button>
          <Button 
          active={selected===2} 
          onPress={()=>this.setState({selected:2})} 
          >
            <Text >职位列表</Text>
          </Button>
          <Button 
          last 
          active={selected===3} 
          onPress={()=>this.setState({selected:3})} 
          >
            <Text >申请结果</Text>
          </Button>
        </Segment>

        <Content padder>
          {this.state.selected===1 &&  <Settings />}
          {this.state.selected===2 &&  <JobList />}
          {this.state.selected===3 &&  <Results />}
        </Content>
      </Container>
      
    );
  }
}
