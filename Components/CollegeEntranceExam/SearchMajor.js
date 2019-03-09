import React, { Component } from 'react';
import {View,TouchableHighlight,Alert,StyleSheet} from 'react-native'
import {Query,Mutation,ApolloConsumer} from 'react-apollo'
import { Container, Header, Item, Input, Icon, Button, Text, Content,List, ListItem,Left,Body,Right,Title,Spinner,Radio } from 'native-base';

import {trim,errorMessage} from '../../utils/tools'
import GET_MAJORS from '../../graphql/get_majors.query'
import SELECT_NEWMAJOR from '../../graphql/add_selectNewMajor.mutation'
import {headerBackgroundColor,headerFontColor,statusBarHeight,headerButtonColor} from '../../utils/settings'

export default  class SearchMajor extends Component {
  
  state = {
    selectedId:'',
    majorName:"",
    majors:[],
    loading:false
  }

  _handlePress=(id,name)=>{
    this.setState({selectedId:id,majorName:name})
  }

  validate=(majorName)=>{
    if(majorName===""){
      Alert.alert('请输入专业名称')
      return false
    }
    const rxName =/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/
    if(!rxName.test(majorName)){
      Alert.alert('请检查输入的名称是否正确')
      return false
    }

    return true
  }

  onMajorsFetched = majors => {
    const { navigation } = this.props;
    const education = navigation.getParam('education', '');
    let newMajors
    const Undergraduate_Major = majors.filter(major=>major.education==="Undergraduate")
    const JuniorCollege_Major = majors.filter(major=>major.education==="JuniorCollege")
    const SecondarySpecializedSchool_Major = majors.filter(major=>major.education==="SecondarySpecializedSchool")
    const Master_Major = majors.filter(major=>major.education==="Master")
    switch(education){
      case 'VocationalHighSchool':
        newMajors = SecondarySpecializedSchool_Major
        break;
      case  'TechnicalSchool':
        newMajors = SecondarySpecializedSchool_Major
        break;
      case  'SecondarySpecializedSchool':
        newMajors = SecondarySpecializedSchool_Major
        break;
      case 'JuniorCollege':
        newMajors = JuniorCollege_Major
        break;
      case 'Undergraduate':
        newMajors = Undergraduate_Major
        break;
      case  'Master' :
        newMajors=Master_Major
        break;
      case 'Doctor':
        newMajors = Master_Major
        break;
      case 'JuniorToCollege': 
        newMajors = Undergraduate_Major
        break;
      case 'HighToCollege':
        newMajors = Undergraduate_Major
        break;
      case 'HighToJunior' : 
        newMajors = JuniorCollege_Major
        break;
      default:
        newMajors=[]
        break;
    }
    if(newMajors.length==0) Alert.alert('未找到相关专业')
    this.setState(() => ({ majors:newMajors }));
  }
    

  submitMajor=(selectNewMajor)=>{
    const {selectedId,majorName} = this.state
    if(!selectedId){
      Alert.alert('尚未选择专业')
      return
    }
    selectNewMajor({variables:{majorId:selectedId,majorName:majorName}})
    this.props.navigation.goBack()
  }


  render() {
    const {selectedId,majorName,majors,loading} = this.state
    return (
      <Container>
         <Header style={{marginTop:statusBarHeight}}>
          <Left >
            <Button transparent onPress={()=>this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title >选择专业</Title>
          </Body>
          <Right>
          {
            !!this.state.selectedId && (
              <Mutation 
              mutation={SELECT_NEWMAJOR}
              >
              {selectNewMajor => (
                  <Button
                  onPress={()=>this.submitMajor(selectNewMajor)}
                >
                  <Text>确认</Text>
                  </Button>
              )}
              </Mutation>
            )
          }
        </Right>
        </Header>
        <Content style={{marginTop:5}}>
        <List>
        <ApolloConsumer >
          {client => (
              <ListItem>
                <Body style={{flexDirection:'row'}}>
                <Input 
                  value={this.state.majorName}
                  onChangeText={(value)=>this.setState({majorName:trim(value)})}
                  placeholder="请输入专业名称" 
                />
              <Button 
                transparent
                disabled={loading?true:false}
                onPress={
                  async () => {
                    const pass = this.validate(majorName)
                    if(!pass) return
                    this.setState({loading:true})
                    const { data } = await client.query({
                      query: GET_MAJORS,
                      variables: { majorName }
                    });
                    this.onMajorsFetched(data.getMajors);
                    this.setState({loading:false})
                }}
                >
                  <Text>搜索</Text>
                </Button>
                </Body>
              </ListItem>
          )}
        </ApolloConsumer >
          <ListItem>
          <Left style={styles.left}>
                <Text>类别</Text>
              </Left>
              <Body style={styles.body}>
                <Text>专业名称</Text>
              </Body>
              <Right style={styles.right}>
                <Text>选择</Text>
              </Right>
          </ListItem>
          {loading && <Spinner />}
          { majors.map(major=>(
            <ListItem key={major.id}>
              <Left style={styles.left}>
                <Text>{major.category}</Text>
              </Left>
              <Body style={styles.body}>
                <Text>{major.name}</Text>
              </Body>
              <Right style={styles.right}>
                <Radio 
                  onPress={()=>this._handlePress(major.id,major.name)}
                  selected={selectedId===major.id} 
                />
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

const styles=StyleSheet.create({
  left:{
    flex:0.3
  },
  body:{
    flex:0.5
  },
  right:{
    flex:0.2
  }
})

