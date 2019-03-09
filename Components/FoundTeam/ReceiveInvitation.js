import React, { Component } from 'react';
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
                          <Button
                            onPress={()=>this.props.navigation.navigate('ProjectIntroduce',{mypartnerCondition})}
                          >
                            <Text>查看详情</Text>
                          </Button>
                        </Body>
                        <Right>
                          <Mutation 
                          mutation={REFUSE_PARTNERCONDITION}
                          onCompleted={()=>refetch()}
                          >
                          {
                            (refusePartner,{loading})=>(
                              <Button 
                              onPress={()=>{
                                refusePartner({variables:{conditionId:mypartnerCondition.id}})
                              }}
                              >
                                <Text>拒绝</Text>
                                {loading && <Spinner/>}
                              </Button>
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