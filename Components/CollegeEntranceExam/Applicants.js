import React, { Component } from 'react';
import {StyleSheet} from 'react-native'
import { Container, Header,Title ,Content,Icon, List, ListItem, Left, Body, Right, Thumbnail, Text,Button } from 'native-base';
import {withNavigation} from 'react-navigation'

import {headerBackgroundColor,headerFontColor,statusBarHeight,headerButtonColor} from '../../utils/settings'

class Applicants extends Component {
  render() {
    const applicants = this.props.navigation.getParam('applicants',[])
    const sortedApplicants = applicants.sort((a,b)=>parseFloat(b.exam.culscore)-parseFloat(a.exam.culscore))
    const hasPro = (applicants.filter(applicant=>applicant.exam.proscore!==0)).length>0
    return (
      <Container>
        <Header style={{marginTop:statusBarHeight}}>
        <Left>
            <Button 
            transparent
            onPress={()=>this.props.navigation.goBack()}
            >
              <Icon name='arrow-back' />
            </Button>
            </Left>
          <Body>
            <Title >报考者详情</Title>
          </Body>
          <Right />
          </Header>
        <Content>
          <List>
            <ListItem >
              <Left style={styles.left}>
                <Text>姓名</Text>
              </Left>
              {
                hasPro
                ?(
                <Body style={styles.body}>
                <Left><Text>文化课分数</Text></Left>
                <Right><Text>专业课分数</Text></Right>
              </Body>
                )
                :(
                  <Body style={styles.body}>
                     <Text>文化课分数</Text>
                  </Body>
                )
              }
              
              <Right style={styles.right}>
                <Text>所在高中</Text>
              </Right>
            </ListItem>
            {
              sortedApplicants.map((applicant,index)=>(
                <ListItem 
                key={applicant.id}
                onPress={()=>this.props.navigation.navigate('UserProfile',{id:applicant.id})}
                >
                  <Left  style={styles.left}>
                    <Text>{`${index+1}、${applicant.name}`}</Text>
                  </Left>
                  
                    {
                      hasPro 
                      ? (
                        <Body  style={styles.body}>
                          <Left><Text>{applicant.exam.culscore}</Text></Left>
                          <Right><Text>{applicant.exam.proscore}</Text></Right>
                        </Body>
                      )
                      :(
                        <Body  style={styles.body}>
                          <Text>{applicant.exam.culscore}</Text>
                        </Body>
                      )
                    }
                  <Right  style={styles.right}>
                    <Text>{(applicant.studies.filter(study=>study.school.kind==='HighSchool').sort((a,b)=>b.startTime-a.startTime)[0]).school.name}</Text>
                  </Right>
                </ListItem>
              ))
            }
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  left:{
    flex:0.3,
    justifyContent:'center',
    alignItems:'center'
  },
  body:{
    flex:0.6,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  right:{
    flex:0.3,
    justifyContent:'center',
    alignItems:'center'
  }
})

export default withNavigation(Applicants)