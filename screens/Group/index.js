import React from 'react'
import {Query} from 'react-apollo'
import { Container, Header, Left, Body, Right, Button, Icon, Segment, Content, Text,Spinner } from 'native-base'
import {headerBackgroundColor,headerFontColor,statusBarHeight,headerButtonColor} from '../../utils/settings'

import Groups from '../../Components/Groups'
import Contacts from '../../Components/Contacts'
import Messages from '../../Components/Messages'
import {errorMessage} from '../../utils/tools'
import GET_ME from '../../graphql/get_me.query'

export default class Group extends React.Component{
  static navigationOptions = {
    header:null,
    
  };

    state={
        selected:1
    }


  render() {
    return (
      <Container>
        <Header hasSegment style={{marginTop:statusBarHeight}}>
          <Left>
          </Left>
          <Body>
            <Segment>
              <Button 
              first 
              active={this.state.selected===1} 
              onPress={()=>this.setState({selected:1})}
              >
              <Text>群组</Text>
              </Button>
              <Button 
               
               active={this.state.selected===2}
               onPress={()=>this.setState({selected:2})} 
              >
              <Text>联系人</Text>
              </Button>
              <Button 
              active={this.state.selected===3}
              onPress={()=>this.setState({selected:3})} 
              last
              >
              <Text>消息</Text>
              </Button>
            </Segment>
          </Body>
          <Right>
            {/* <Button transparent>
              <Icon name="search" />
            </Button> */}
          </Right>
        </Header>
        <Query 
        query={GET_ME}>
              {
                  ({loading,error,data:{me}})=>{
                    if(loading) return <Spinner />
                    if(error) return <Text>{errorMessage(error)}</Text>
                    
                      return(
                        <Content padder>
                        {this.state.selected===1 &&  <Groups me={me}/>}
                        {this.state.selected===2 &&  <Contacts me={me}/>}
                        {this.state.selected===3 &&  <Messages me={me}/>}
                    </Content>
                      )
                  }
              }
          </Query>
        
      </Container>
    );
  }
}