import React, { Component } from 'react';
import {Query} from 'react-apollo'
import { 
    Container, 
    Header, 
    Content, 
    Button, 
    Text, 
    ListItem, 
    Left, 
    Title, 
    Right, 
    Body, 
    Icon, 
    Spinner,
    List,
    Thumbnail,
 } from 'native-base';

import GET_ACTIVITIES from '../../graphql/get_activities.query'
import { errorMessage } from '../../utils/tools';

export default class ActivityList extends Component {
    render() {
        const activeType = this.props.navigation.getParam('activeType')
        const city = this.props.navigation.getParam('city')

        return (
            <Container>
                <Header>
                    <Left>
                        <Button
                            onPress={() => this.props.navigation.goBack()}
                            transparent
                        >
                            <Icon name='md-arrow-back' type='Ionicons' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>{activeType.second}</Title>
                    </Body>
                    <Right >
                        <Text style={{color:"white"}}>{city.name}</Text>
                    </Right>
                </Header>
                <Content>
                    <Query 
                    query={GET_ACTIVITIES}
                    variables={{typeId:activeType.id}}
                    fetchPolicy="cache-and-network"
                    >
                    {
                        ({loading,error,data})=>{
                            if(loading) return <Spinner />
                            if(error) return <Text>{errorMessage(error)}</Text>
                           
                            return(
                                <List>
                                    {
                                        data.activities.sort((a,b)=>new Date(a.startTime)-new Date(b.startTime)).map((activity,index)=>(
                                            <ListItem 
                                            key={index}
                                            thumbnail>
                                            <Left>
                                              <Thumbnail square source={{ uri: activity.image.url }} />
                                            </Left>
                                            <Body>
                                              <Text>{activity.title}</Text>
                                              <Text>{`${new Date(activity.startTime).toLocaleDateString()} ${new Date(activity.startTime).toLocaleTimeString()}` }</Text>
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
                </Content>
            </Container>
        );
    }
}