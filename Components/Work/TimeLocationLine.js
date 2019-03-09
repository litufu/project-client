import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import Timeline from 'react-native-timeline-feed'
import {timeTodate} from '../../utils/tools'

const workdescription =(work)=>{
  const department = work.department 
  const post = work.post.name
  const description = department +" : "+ post 
  return description
}

const worktitle = (work) =>{
  const companyName = work.company.name
  const title = companyName
  return title
}

export default class TimeLocationLine extends Component {

  _keyExtractor = (item, index) => index.toString();

  render() {
    const { works } = this.props;

    const data = works.sort((a,b)=>(new Date(a.startTime)- new Date(b.startTime))).map(work=>{return {time:timeTodate(work.startTime,work.endTime),title:worktitle(work),description:workdescription(work)}})
    return (
      <View style={styles.container}>
        <Timeline 
          style={styles.list}
          data={data}
          keyExtractor={this._keyExtractor}
          circleSize={20}
          circleColor='rgb(45,156,219)'
          lineColor='rgb(45,156,219)'
          timeContainerStyle={{minWidth:120, marginTop: -5}}
          timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
          descriptionStyle={{color:'gray'}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
		paddingTop:10,
    backgroundColor:'white'
  },
  list: {
    flex: 1,
    marginTop:20,
  },
});