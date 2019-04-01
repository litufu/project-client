import React, { Component } from 'react';
import {TouchableHighlight,View} from 'react-native'
import {Query} from 'react-apollo'
import { 
    Container, 
    Header, 
    Content, 
    Button, 
    Text, 
    List,
    ListItem, 
    Left, 
    Title, 
    Right, 
    Body, 
    Icon, 
    Spinner,
 } from 'native-base';


import ACTIVITYTYPES from '../../graphql/get_activityTypes.query'
import { errorMessage } from '../../utils/tools';

export default class Activity extends Component {
    render() {
        const data = this.props.navigation.getParam('data')
        const city = data.me.residence.city
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
                        <Title>同城活动</Title>
                    </Body>
                    <Right >
                        <Text style={{color:"white"}}>{city.name}</Text>
                    </Right>
                </Header>
                <Content>
                    <ListItem style={{flex:1,alignItems:"center",justifyContent:"space-around"}}>
                            <Button
                            onPress={()=>this.props.navigation.navigate("CreateActivity",{data})}
                            >
                                <Text>创建活动</Text>
                            </Button>
                            <Button
                            onPress={()=>this.props.navigation.navigate("MyActivities",{data})}
                            >
                                <Text>我的活动</Text>
                            </Button>
                    </ListItem>
                    <Query 
                    query={ACTIVITYTYPES}
                    fetchPolicy="cache-and-network"
                    >
                    {
                        ({loading,error,data})=>{
                            if(loading) return <Spinner />
                            if(error) return <Text>{errorMessage(error)}</Text>
                            const activityTypes = data.activityTypes
                            const activityTypesSet = new Set(activityTypes.map(type=>type.first))
                            const firstTypes = [...activityTypesSet]
                            return(
                                <List>
                                    {
                                        firstTypes.map((type,index)=>(
                                            <List key={index}>
                                                <ListItem
                                                itemDivider
                                                >
                                                   <Text>{type}</Text> 
                                                </ListItem>
                                                <View style={{
                                                    flexDirection:"row",
                                                    flexWrap:"wrap"
                                                    }}>
                                            {
                                              activityTypes.filter(activeType=>activeType.first===type).map((activeType,index)=>(
                                                  <TouchableHighlight
                                                  key={index}
                                                  style={{marginHorizontal:10,marginVertical:10}}
                                                  onPress={()=>this.props.navigation.navigate('ActivityList',{activeType,city})}
                                                  >
                                                  <Text
                                                  style={{color:"blue"}}
                                                  >
                                                    {activeType.second}
                                                  </Text>
                                                  </TouchableHighlight>
                                              ))  
                                            }
                                            </View>
                                            </List>
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