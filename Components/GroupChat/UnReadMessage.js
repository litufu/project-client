import React from 'react';
import { Mutation } from 'react-apollo';
import QueryMessages from './QueryMessages'

import ADD_NEWUNREADMESSAGE from '../../graphql/add_newUnReadMessage.mutation'
import { Spinner } from 'native-base';


export default class UnReadMessage extends React.Component{

  render(){
    const {group,type,navigation,me,groupName} = this.props
    return(
      <Mutation mutation={ADD_NEWUNREADMESSAGE} >
        {(addNewUnReadMessages,{loading,error}) => {
          if(loading) return <Spinner/>
          return( <QueryMessages 
            me={me}
            group={group}
            groupName={groupName}
            type={type}
            navigation={navigation}
            addNewUnReadMessages={addNewUnReadMessages}
          />)
        }
         
        }
      </Mutation>
    )
  }
}


