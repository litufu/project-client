import React, { Component } from 'react';
import {TouchableHighlight,View} from 'react-native'
import {Query} from 'react-apollo'
import { 
    Container, 
    Header, 
    Left, 
    Body, 
    Right, 
    Button, 
    Icon, 
    Title, 
    Segment, 
    Content, 
    Text,
    List,
    ListItem,
    Spinner,
    Thumbnail
 } from 'native-base';

 import GET_NOWCREATEACTIVITIES from '../../graphql/get_nowCreateActivities.query'
 import GET_NOWPARTAKEACTIVITIES from '../../graphql/get_nowPartakeActivities.query'
 import GET_PASTEDCREATEACTIVITIES from '../../graphql/get_pastedCreateActivities.query'
 import GET_PASTEDPARTAKEACTIVITIES from  '../../graphql/get_pastedPartakeActivities.query'
import { errorMessage } from '../../utils/tools';


export default class MyActivities extends Component {

    constructor(props) {
        super(props);
        this.state = {
            select:"1",
            me:props.navigation.getParam('data').me
        };
      }

    _renderNowCreated=()=>(
        <Query 
        fetchPolicy="cache-and-network"
        query={GET_NOWCREATEACTIVITIES}>
        {
            ({loading,error,data})=>{
                if(loading) return <Spinner/>
                if(error) return <Text>{errorMessage(error)}</Text>
                return(
                    <List>
                        {
                            data.nowCreateActivities.sort((a,b)=>new Date(a.startTime)-new Date(b.startTime)).map((activity,index)=>(
                                <ListItem 
                                key={index}
                                onPress={()=>this.props.navigation.navigate('ActivityDetail',{activity})}
                                thumbnail>
                                <Left>
                                    <Thumbnail square source={{ uri: activity.image.url }} />
                                </Left>
                                <Body>
                                    <Text>{activity.title}</Text>
                                    <Text>{`${new Date(activity.startTime).toLocaleDateString()} ${new Date(activity.startTime).toLocaleTimeString()}`}</Text>
                                    <Text note numberOfLines={1}>{activity.location}</Text>
                                </Body>
                                    <Right>
                                    <TouchableHighlight 
                                    style={{marginVertical:5}}
                                    onPress={()=>this.props.navigation.navigate('GroupChat', { 
                                        group:activity, 
                                        me:this.state.me, 
                                        type:"Activity", 
                                        groupName:activity.title
                                     })}
                                    >
                                    <Text style={{color:"blue"}}> 群聊 </Text>
                                    </TouchableHighlight>
                                    <View style={{padding:5}}>
                                     <Text></Text>
                                    </View>
                                    <TouchableHighlight 
                                    style={{marginVertical:5}}
                                    onPress={()=>this.props.navigation.navigate('Members', { 
                                        activity, 
                                     })}
                                    >
                                    <Text style={{color:"blue"}}> 成员 </Text>
                                    </TouchableHighlight>
                                    </Right>
                                </ListItem>
                            ))
                        }
                    </List>
                )
            }
        }
        </Query>
    )

    _renderPastCreated=()=>(
        <Query 
        fetchPolicy="cache-and-network"
        query={GET_PASTEDCREATEACTIVITIES}>
        {
            ({loading,error,data})=>{
                if(loading) return <Spinner/>
                if(error) return <Text>{errorMessage(error)}</Text>
                return(
                    <List>
                        {
                            data.pastedCreateActivities.sort((a,b)=>new Date(a.startTime)-new Date(b.startTime)).map((activity,index)=>(
                                <ListItem 
                                key={index}
                                onPress={()=>this.props.navigation.navigate('ActivityDetail',{activity})}
                                thumbnail>
                                <Left>
                                    <Thumbnail square source={{ uri: activity.image.url }} />
                                </Left>
                                <Body>
                                    <Text>{activity.title}</Text>
                                    <Text>{`${new Date(activity.startTime).toLocaleDateString()} ${new Date(activity.startTime).toLocaleTimeString()}`}</Text>
                                    <Text note numberOfLines={1}>{activity.location}</Text>
                                </Body>
                                <Right>
                                    <Button 
                                    onPress={()=>this.props.navigation.navigate('ActivityDetail',{activity})}
                                    transparent>
                                    <Text>查看</Text>
                                    </Button>
                                </Right>
                                </ListItem>
                            ))
                        }
                    </List>
                )
            }
        }
        </Query>
    )

    _renderNowPartake=()=>(
        <Query 
        fetchPolicy="cache-and-network"
        query={GET_NOWPARTAKEACTIVITIES}>
        {
            ({loading,error,data})=>{
                if(loading) return <Spinner/>
                if(error) return <Text>{errorMessage(error)}</Text>
                return(
                    <List>
                        {
                            data.nowPartakeActivities.sort((a,b)=>new Date(a.startTime)-new Date(b.startTime)).map((activity,index)=>(
                                <ListItem 
                                key={index}
                                onPress={()=>this.props.navigation.navigate('ActivityDetail',{activity})}
                                thumbnail>
                                <Left>
                                    <Thumbnail square source={{ uri: activity.image.url }} />
                                </Left>
                                <Body>
                                    <Text>{activity.title}</Text>
                                    <Text>{`${new Date(activity.startTime).toLocaleDateString()} ${new Date(activity.startTime).toLocaleTimeString()}`}</Text>
                                    <Text note numberOfLines={1}>{activity.location}</Text>
                                </Body>
                                <Right>
                                    <TouchableHighlight 
                                    onPress={()=>this.props.navigation.navigate('GroupChat', { 
                                        group:activity, 
                                        me:this.state.me, 
                                        type:"Activity", 
                                        groupName:activity.title
                                    })}
                                    >
                                    <Text style={{color:"blue"}}>群聊</Text>
                                    </TouchableHighlight>
                                    <View style={{padding:5}}>
                                     <Text></Text>
                                    </View>
                                    <TouchableHighlight 
                                    onPress={()=>this.props.navigation.navigate('Members', { 
                                        activity, 
                                     })}
                                    >
                                    <Text style={{color:"blue"}}> 成员 </Text>
                                    </TouchableHighlight>
                                </Right>
                                </ListItem>
                            ))
                        }
                    </List>
                )
            }
        }
        </Query>
    )

    _renderPastPartake=()=>(
        <Query 
        query={GET_PASTEDPARTAKEACTIVITIES}
        fetchPolicy="cache-and-network"
        >
        {
            ({loading,error,data})=>{
                if(loading) return <Spinner/>
                if(error) return <Text>{errorMessage(error)}</Text>
                return(
                    <List>
                        {
                            data.pastedPartakeActivities.sort((a,b)=>new Date(a.startTime)-new Date(b.startTime)).map((activity,index)=>(
                                <ListItem 
                                key={index}
                                onPress={()=>this.props.navigation.navigate('ActivityDetail',{activity})}
                                thumbnail>
                                <Left>
                                    <Thumbnail square source={{ uri: activity.image.url }} />
                                </Left>
                                <Body>
                                    <Text>{activity.title}</Text>
                                    <Text>{`${new Date(activity.startTime).toLocaleDateString()} ${new Date(activity.startTime).toLocaleTimeString()}`}</Text>
                                    <Text note numberOfLines={1}>{activity.location}</Text>
                                </Body>
                                <Right>
                                    <Button 
                                    onPress={()=>this.props.navigation.navigate('ActivityDetail',{activity})}
                                    transparent>
                                    <Text>查看</Text>
                                    </Button>
                                </Right>
                                </ListItem>
                            ))
                        }
                    </List>
                )
            }
        }
        </Query>
    )

    _renderCreated=()=>(
        <List>
            <ListItem itemDivider>
                <Text>现在的项目</Text>
            </ListItem>
            {this._renderNowCreated()}
            <ListItem itemDivider>
                <Text>过去的项目</Text>
            </ListItem>
            {this._renderPastCreated()}
        </List>
    )

    _renderPartake=()=>(
        <List>
        <ListItem itemDivider>
            <Text>现在的项目</Text>
        </ListItem>
        {this._renderNowPartake()}
        <ListItem itemDivider>
            <Text>过去的项目</Text>
        </ListItem>
        {this._renderPastPartake()}
    </List>
    )


  render() {
      const {select} = this.state
    return (
      <Container>
        <Header hasSegment>
          <Left>
            <Button 
            onPress={() => this.props.navigation.goBack()}
            transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>我的活动</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Segment>
          <Button 
          first 
          active={select==="1"}
          onPress={()=>this.setState({select:"1"})}
          >
            <Text>发起的活动</Text>
          </Button>
          <Button 
          last
          onPress={()=>this.setState({select:"2"})}
          active={select==="2"}>
            <Text>参加的活动</Text>
          </Button>
        </Segment>
        <Content padder>
          {select==="1" ? this._renderCreated() : this._renderPartake()}
        </Content>
      </Container>
    );
  }
}