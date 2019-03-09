import React from 'react'
import {Spinner,Text, View } from 'native-base'

import TimeLocationLine from './TimeLocationLine'

export default class Works extends React.Component{

  render(){
    const {data} = this.props
    if(data.me && data.me.works && data.me.works.length>0){
    return (<TimeLocationLine
      works={data.me.works.sort((a,b)=>(new Date(a.startTime) - new Date(b.startTime))) || []}
    />)}
    return <View></View>
  }
}





