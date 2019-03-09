import React from 'react'
import {Query} from 'react-apollo'
import {View}  from 'react-native'
import {Spinner,Text } from 'native-base'
import {gql} from 'graphql-tag'

import TimeLocationLine from './TimeLocationLine'
import GET_ME from '../../graphql/get_me.query'

const EventsWithData = () => (
  <Query
    query={GET_ME}
  >
    {({ loading,error,data }) => {
      if(loading) return <Spinner />
      if(error) return <Text>{error.message}</Text>

      if(data.me.studies && data.me.studies.length>0){
        return (<TimeLocationLine
          studies={data.me.studies.sort((a,b)=>(new Date(a.startTime) - new Date(b.startTime))) || []}
        />)
      }
      return <View></View>
    }}
  </Query>
);


export default EventsWithData


