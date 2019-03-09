import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import Timeline from 'react-native-timeline-feed'
// import Timeline from '../Timeline'

const kindName = {
    "PrimarySchool":"小学",
    "JuniorMiddleSchool":"初中",
    "HighSchool":"高中",
    "VocationalHighSchool":"职业中学",
    "TechnicalSchool": "技工学校",
    "SecondarySpecializedSchool": "中专",
    "JuniorCollege":"大专",
    "Undergraduate":"本科",
    "Master":"硕士",
    "Doctor":"博士",
    "JuniorToCollege" :"本科",
    "HighToCollege":"本科",
    "HighToJunior":"专科",
}

const gradeName = {
  1:'一',
  2:'二',
  3:'三',
  4:'四',
  5:'五',
  6:'六',
  7:'七',
  8:'八',
  9:'九'

}


const studydescription =(study)=>{
  // "在**学校**专业/**年级**班，地点:"
  const schoolName = study.school.name
  const major = study.major ? study.major.name :""
  const className = study.className === '0' ? '' : study.className + "班"
  const location = study.school.location.name
  const description = schoolName + major + className 
  return description
}

const studytitle = (study) =>{
  const kind = study.school.kind
  const grade = gradeName[study.grade]+"年级"
  const title = kindName[kind] + grade
  return title
}

const timeTodate = (time) =>{
  const date = new Date(time)
  const year = date.getFullYear()
  const nextYear = year + 1
  return year + '年-' + nextYear +'年'
}

export default class TimeLocationLine extends Component {

  _keyExtractor = (item, index) => index.toString();

  render() {
    const { studies } = this.props;
    

    const data = studies.map(study=>{return {time:timeTodate(study.startTime),title:studytitle(study),description:studydescription(study)}})
    return (
      <View style={styles.container}>
        <Timeline 
          style={styles.list}
          data={data}
          keyExtractor={this._keyExtractor}
          circleSize={20}
          circleColor='rgb(45,156,219)'
          lineColor='rgb(45,156,219)'
          timeContainerStyle={{
            minWidth:72, 
            marginTop: -5,
            borderRadius: 13,
            backgroundColor: '#ff9797',
          }}
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