import React, { Component } from 'react';
import {View,TouchableHighlight,Alert,StyleSheet} from 'react-native'
import {Query,Mutation,ApolloConsumer} from 'react-apollo'
import { Container, Header, Item, Input, Icon, Button, Text, Content,List, ListItem,Left,Body,Right,Title,Spinner,Radio } from 'native-base';

import {trim,errorMessage} from '../../utils/tools'
import GET_UNIVERSITIES from '../../graphql/get_universities.query'
import SELECT_NEWUNIVERSITY from '../../graphql/add_selectNewUniversity.mutation'
import {headerBackgroundColor,headerFontColor,statusBarHeight,headerButtonColor} from '../../utils/settings'

export default  class SearchMajor extends Component {
  
  state = {
    selectedId:'',
    universityName:"",
    universities:[],
    loading:false
  }

  _handlePress=(id,name)=>{
    this.setState({selectedId:id,universityName:name})
  }

  validate=(universityName)=>{
    if(universityName===""){
      Alert.alert('请输入学校名称')
      return false
    }
    const rxName =/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/
    if(!rxName.test(universityName)){
      Alert.alert('请检查输入的名称是否正确')
      return false
    }

    return true
  }

   onUniversitiesFetched = universities => {
    const { navigation } = this.props;
    const education = navigation.getParam('education', '');
    let newUniversities
    const Undergraduate_University = universities.filter(major=>major.education==="Undergraduate")
    const JuniorCollege_University = universities.filter(major=>major.education==="JuniorCollege")
    
    switch(education){
      case 'JuniorCollege':
      newUniversities = JuniorCollege_University
        break;
      case 'Undergraduate':
      newUniversities = Undergraduate_University
        break;
      default:
      newUniversities=[]
        break;
    }
    if(newUniversities.length==0) Alert.alert('未找到相关学校')
    this.setState(() => ({ universities:newUniversities }));
  }
    

  submitUniversity=(selectNewUniversity)=>{
    const {selectedId,universityName} = this.state
    if(!selectedId){
      Alert.alert('尚未选择学校')
      return
    }
    selectNewUniversity({variables:{universityId:selectedId,universityName:universityName}})
    this.props.navigation.goBack()
  }


  render() {
    const {selectedId,universityName,universities,loading} = this.state
    return (
      <Container>
         <Header style={{marginTop:statusBarHeight}}>
          <Left >
            <Button transparent onPress={()=>this.props.navigation.goBack()}>
              <Icon name="arrow-back"  />
            </Button>
          </Left>
          <Body >
            <Title >选择专业</Title>
          </Body>
          <Right>
            {
              !!this.state.selectedId && (
                <Mutation 
                mutation={SELECT_NEWUNIVERSITY}
                >
                {selectNewUniversity => (
                    <Button
                    onPress={()=>this.submitUniversity(selectNewUniversity)}
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
                  value={this.state.universityName}
                  onChangeText={(value)=>this.setState({universityName:trim(value)})}
                  placeholder="请输入学校名称" 
                />
              <Button 
                transparent
                disabled={loading?true:false}
                onPress={
                  async () => {
                    const pass = this.validate(universityName)
                    if(!pass) return
                    this.setState({loading:true})
                    const { data } = await client.query({
                      query: GET_UNIVERSITIES,
                      variables: { universityName }
                    });
                    this.onUniversitiesFetched(data.getUniversities);
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
                <Text>学校名称</Text>
              </Left>
              <Body style={styles.body}>
                <Text>地点</Text>
              </Body>
              <Right style={styles.right}>
                <Text>选择</Text>
              </Right>
          </ListItem>
          {loading && <Spinner />}
          { universities.map(university=>(
            <ListItem key={university.id}>
              <Left style={styles.left}>
                <Text>{university.name}</Text>
              </Left>
              <Body style={styles.body}>
                <Text>{university.desc}</Text>
              </Body>
              <Right style={styles.right}>
                <Radio 
                  onPress={()=>this._handlePress(university.id,university.name)}
                  selected={selectedId===university.id} 
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
    flex:0.5
  },
  body:{
    flex:0.3
  },
  right:{
    flex:0.2
  }
})

