import React from 'react'
import {Query} from 'react-apollo'
import {NetInfo} from 'react-native'
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
        selected:1,
        connectionType: null,
    }

    async componentDidMount() {
      this.subscription = NetInfo.addEventListener(
        'connectionChange',
        this.handleChange,
      );
  
      const { type } = await NetInfo.getConnectionInfo();
  
      this.setState({ connectionType: type });
    }

    componentWillUnmount() {
      this.subscription.remove();
    }

    handleChange = connectionType => {
      this.setState({ connectionType });
    };


  render() {
    const { connectionType } = this.state;
    const isConnected = connectionType !== 'none';

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
          </Right>
        </Header>
        {
          isConnected 
          ?(
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
          )
          :(
           <Content >
             <Text>网络连接失败</Text>
           </Content> 
          )
        }
      </Container>
    );
  }
}