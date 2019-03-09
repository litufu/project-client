import React, { Component } from 'react';
import {Query} from 'react-apollo';
import { Container, Header, Content, List, ListItem, Text,Left,Icon,Button,Right,Body,Title,Spinner } from 'native-base';

import {headerBackgroundColor,headerFontColor,statusBarHeight,headerButtonColor} from '../../utils/settings'
import {errorMessage,educations} from '../../utils/tools';
import GET_ME from '../../graphql/get_me.query';

export default class ClassGroup extends Component {

  get_primarySchools = (data,kind)=>{
    const primarySchools = data.me.studies.filter(schoolEdu=>{
      return schoolEdu.school.kind === kind
    })
    if(primarySchools.length===0){
      return []
    }
    const primarySchoolIds = primarySchools.map(schoolEdu=>schoolEdu.school.id)
    const primarySchoolIdsSet = new Set(primarySchoolIds)
    const sortedprimarySchools = primarySchools.sort((a,b)=>(new Date(a.startTime) - new Date(b.startTime)))
    if(primarySchoolIdsSet.size===1){
      return [sortedprimarySchools[0]]
    }else {
      return sortedprimarySchools.filter(schoolEdu=>{
        if(primarySchoolIdsSet.has(schoolEdu.school.id)){
          primarySchoolIdsSet.delete(schoolEdu.school.id)
          return true
        }
        return false
      })
    }
  }

  get_middleSchool = (data,kind)=>{
    const schoolEdus = data.me.studies.filter(schoolEdu=>{
      return schoolEdu.school.kind === kind
    })
    if(schoolEdus.filter(schoolEdu=>schoolEdu.className==='0').length>0){
      return [schoolEdus[0]]
    }
    return schoolEdus
  }

  get_other_schoolEdus =  (data,kind)=>{
    const schoolEdus = data.me.studies.filter(schoolEdu=>{
      return schoolEdu.school.kind === kind
    })
    if(schoolEdus.length===0){
      return []
    }
    if(schoolEdus.length>0){
      return [schoolEdus.sort((a,b)=>(new Date(a.startTime) - new Date(b.startTime)))[0]]
    }
  }

  render() {
    return (
      <Container>
        <Header style={{marginTop:statusBarHeight,backgroundColor:headerBackgroundColor}}>
        <Left>
            <Button 
            transparent
            onPress={()=>this.props.navigation.goBack()}
            >
              <Icon name='arrow-back' style={{color:headerButtonColor}}/>
            </Button>
            </Left>
          <Body>
            <Title style={{color:headerFontColor}}>同学群</Title>
          </Body>
          <Right />
          </Header>
        <Content>
          <Query query={GET_ME}>
          {
            ({loading,error,data})=>{
              if(loading) return <Spinner />
              if(error)  return <Text>{errorMessage(error)}</Text>
              const primarySchoolEdus = this.get_primarySchools(data,'PrimarySchool')
              const juniorMiddleSchoolEdus = this.get_middleSchool(data,'JuniorMiddleSchool')
              const highSchoolEdus = this.get_middleSchool(data,'HighSchool')
              const otherKinds = ['VocationalHighSchool','TechnicalSchool','SecondarySpecializedSchool','JuniorCollege','Undergraduate','Master','Doctor',
              'JuniorToCollege','HighToCollege','HighToJunior'
            ]
            const me = data.me

              return(
                <List>
                  {
                    primarySchoolEdus.length>0 && (<ListItem itemDivider>
                      <Text>小学群</Text>
                    </ListItem>)
                  }
                {
                  primarySchoolEdus.map(schoolEdu=>{
                    const schoolEduName =  `${schoolEdu.school.name}${new Date(schoolEdu.startTime).getFullYear()-(schoolEdu.grade - 1)}界${schoolEdu.className==='0'?"": `${schoolEdu.className}班`}`
                    return(<ListItem key={schoolEdu.id} onPress={()=>{this.props.navigation.navigate('ClassContent',{schoolEdu,schoolEduName,me,classGroups:me.classGroups})}}>
                    <Text>{schoolEduName}</Text>
                    </ListItem>)
                  })
                }
                  {
                    juniorMiddleSchoolEdus.length>0 && (
                      <ListItem itemDivider>
                        <Text>初中群</Text>
                      </ListItem> 
                    )
                  }
                  
                  {
                  juniorMiddleSchoolEdus.map(schoolEdu=>{
                    const schoolEduName = `${schoolEdu.school.name}${new Date(schoolEdu.startTime).getFullYear()-(schoolEdu.grade - 1)}界${schoolEdu.className==='0'?"": `${schoolEdu.grade}年级${schoolEdu.className}班`}`
                    return(<ListItem key={schoolEdu.id} onPress={()=>{this.props.navigation.navigate('ClassContent',{schoolEdu,schoolEduName,me,classGroups:me.classGroups})}}>
                    <Text>{schoolEduName}</Text>
                    </ListItem>)
                  })
                }
                {
                  highSchoolEdus.length>0 &&  (
                    <ListItem itemDivider>
                      <Text>高中群</Text>
                    </ListItem>  
                  )
                }
                {
                  highSchoolEdus.map(schoolEdu=>{
                    const schoolEduName = `${schoolEdu.school.name}${new Date(schoolEdu.startTime).getFullYear()-(schoolEdu.grade - 1)}界${schoolEdu.className==='0'?"": `${schoolEdu.grade}年级${schoolEdu.className}班`}` 
                    return(<ListItem key={schoolEdu.id} onPress={()=>{this.props.navigation.navigate('ClassContent',{schoolEdu,schoolEduName,me,classGroups:me.classGroups})}}>
                    <Text>{schoolEduName}</Text>
                    </ListItem>)
                  })
                }
                  {otherKinds.map((kind,index)=>{
                    const schoolEdus = this.get_other_schoolEdus(data,kind)
                    if(schoolEdus.length>0){
                     
                      return(
                        <List key={index}>
                        <ListItem itemDivider>
                          <Text>{educations[kind]}</Text>
                        </ListItem>
                        {
                          schoolEdus.map(schoolEdu=>{
                            const schoolEduName = `${schoolEdu.school.name}${new Date(schoolEdu.startTime).getFullYear()-(schoolEdu.grade - 1)}界${schoolEdu.className==='0'?"": `${schoolEdu.className}班`}`
                            return(<ListItem key={schoolEdu.id} onPress={()=>{this.props.navigation.navigate('ClassContent',{schoolEdu,schoolEduName,me,classGroups:me.classGroups})}}>
                              <Text>{schoolEduName}</Text>
                            </ListItem>)
                          })
                        }
                        </List>
                      )
                    }
                  })}
                  
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