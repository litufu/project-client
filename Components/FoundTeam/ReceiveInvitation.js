import React, { Component } from 'react';
import {TouchableHighlight} from 'react-native'
import {  
  Content, 
   Spinner, 
   List,
   ListItem, 
   Left, 
   Body,
   Text,
   Right ,
   Button
} from 'native-base';
import {Query,Mutation} from 'react-apollo'

import GET_MYPARTNERCONDITION from '../../graphql/get_mypartnerConditions.query'
import REFUSE_PARTNERCONDITION  from '../../graphql/refuse_partner.mutation'
import { errorMessage } from '../../utils/tools';


export default class ReceiveInvitation extends Component {
  render() {
    return (
      <Query 
      query={GET_MYPARTNERCONDITION}
      fetchPolicy="network-only"
      >
        {
          ({loading,error,data,refetch})=>{
            if(loading) return <Spinner />
            if(error) return <Text>{errorMessage(error)}</Text>
            return(
              <Content>
                <List>
                  {
                    data.mypartnerConditions.map(mypartnerCondition=>(
                      <ListItem 
                      key={mypartnerCondition.id}
                      >
                        <Left>
                          <Text>{`邀约项目:${mypartnerCondition.project.name}`}</Text>
                        </Left>
                        <Body>
                          <TouchableHighlight
                            onPress={()=>this.props.navigation.navigate('ProjectIntroduce',{mypartnerCondition})}
                          >
                            <Text style={{color:"blue"}}>查看详情</Text>
                          </TouchableHighlight>
                        </Body>
                        <Right>
                          <Mutation 
                          mutation={REFUSE_PARTNERCONDITION}
                          onCompleted={()=>refetch()}
                          >
                          {
                            (refusePartner,{loading})=>(
                              <TouchableHighlight 
                              
                              onPress={()=>{
                                refusePartner({variables:{conditionId:mypartnerCondition.id}})
                              }}
                              >
                                <Text style={{color:"blue"}}> {`拒绝${loading ? "..." :""}`}</Text>
                              </TouchableHighlight>
                            )
                          }
                          </Mutation>
                        </Right>
                      </ListItem>
                    ))
                  }
                </List>
              </Content>
            )
          }
        }
      </Query>
    );
  }
}