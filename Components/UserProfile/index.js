import React from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import { Query,Mutation } from 'react-apollo'
import dateFormat from 'dateformat';
import { List, ListItem, Spinner, Left, Right,Button,Text,  } from 'native-base'
import { withNavigation } from 'react-navigation';

import ParallaxScrollView from './beta-src/ParallaxScrollView';
import { headerBackgroundColor, headerFontColor, statusBarHeight, headerButtonColor,defaultBackgroundImage } from '../../utils/settings'
import { errorMessage } from '../../utils/tools'
import Chat from '../Chat'
import GET_USERINFO from '../../graphql/get_userInfo.query'
import GET_ME from '../../graphql/get_me.query'

export const SCREEN_HEIGHT = Dimensions.get('window').height;

const educations = {
  "PrimarySchool": "小学",
  "JuniorMiddleSchool": "初中",
  "HighSchool": "高中",
  "VocationalHighSchool": "职业中学",
  "TechnicalSchool": "技工学校",
  "SecondarySpecializedSchool": "中等专业学校",
  "JuniorCollege": "大专",
  "Undergraduate": "本科",
  "Master": "硕士",
  "Doctor": "博士",
  "JuniorToCollege": "本科",
  "HighToCollege": "本科",
  "HighToJunior": "专科"
}

const sexMap = {
  'male':"男",
  'female':'女'
}

class UserProfile extends React.Component {
  constructor() {
    super();
    this.state={
      image:null,
      showChat:false
    }
  }

  renderStduy = (studies) => {
    const obj = {}
    for (let study of studies) {
      obj[study.school.name] = study.school.kind
    }

    return (
      Object.keys(obj).map((schoolname, index) => (
        <ListItem key={index}>
          <Left style={styles.left}><Text style={styles.gray}>{educations[obj[schoolname]]}</Text></Left>
          <Right style={styles.right}><Text>{schoolname}</Text></Right>
        </ListItem>
      ))
    )
  }

  renderWork = (works) => {
    return works.map((work,index) => (
      <ListItem key={index}>
        <Text>{work.company.name}</Text>
      </ListItem>
    ))
  }

  renderProfile=(me,id)=>(
    <Query query={GET_USERINFO} variables={{ id }}>
        {
          ({ loading, error, data}) => {
            if (loading) return <Spinner />
            if (error) return <Text>{errorMessage(error)}</Text>
            return (
              <ParallaxScrollView
                style={{ marginTop: statusBarHeight }}
                windowHeight={SCREEN_HEIGHT * 0.4}
                backgroundSource={{uri:defaultBackgroundImage}}
                navBarTitle={data.userInfo.name}
                navBarTitleColor='black'
                navBarColor='white'
                userName={data.userInfo.name}
                userTitle={data.userInfo.username}
                leftIcon={{ name: 'keyboard-backspace', color: 'blue', size: 30, type: 'material-community' }}
                leftIconOnPress={() => this.props.navigation.goBack()}
                data={data}
                me={me}
              >
                <List>
                  <ListItem itemDivider>
                    <Text style={{ fontWeight: 'bold' }}>基本资料</Text>
                  </ListItem>
                  <ListItem>
                    <Left style={styles.left}><Text style={styles.gray}>性别</Text></Left>
                    <Right style={styles.right}><Text>{data.userInfo && sexMap[data.userInfo.gender]}</Text></Right>
                  </ListItem>
                  <ListItem>
                    <Left style={styles.left}><Text style={styles.gray}>生日</Text></Left>
                    <Right style={styles.right}><Text>{data.userInfo && dateFormat(new Date(data.userInfo.birthday), "yyyy年mm月dd日")}</Text></Right>
                  </ListItem>
                  <ListItem>
                    <Left style={styles.left}><Text style={styles.gray}>出生地</Text></Left>
                    <Right style={styles.right}><Text>{data.userInfo && data.userInfo.birthplace && data.userInfo.birthplace.name}</Text></Right>
                  </ListItem>
                  <ListItem>
                    <Left style={styles.left}><Text style={styles.gray}>居住地</Text></Left>
                    <Right style={styles.right}><Text>{data.userInfo && data.userInfo.residence && data.userInfo.residence.name}</Text></Right>
                  </ListItem>
                  {data.userInfo.studies && data.userInfo.studies.length > 0 &&
                    (
                      <ListItem itemDivider>
                        <Text style={{ fontWeight: 'bold' }}>学习经历</Text>
                      </ListItem>
                    )
                  }
                  {
                    data.userInfo.studies && data.userInfo.studies.length > 0 && this.renderStduy(data.userInfo.studies)
                  }
                  {data.userInfo.works && data.userInfo.works.length > 0 &&
                    (
                      <ListItem itemDivider>
                        <Text style={{ fontWeight: 'bold' }}>工作经历</Text>
                      </ListItem>
                    )
                  }
                  {
                    data.userInfo.works && data.userInfo.works.length > 0 && this.renderWork(data.userInfo.works)
                  }

                </List>
                {
                  me.id!==id && (
                    <Button 
                    block
                    style={{marginTop:15,marginHorizontal:15}} 
                    onPress={()=>this.props.navigation.navigate('Chat',{user:data.userInfo,me})}
                    >
                      <Text>发送信息</Text>
                    </Button>
                  )
                }
                
              </ParallaxScrollView>)
      }
    }
      </Query>
  )

  render() {
    const id = this.props.navigation.getParam('id', '');
    // const me = this.props.navigation.getParam('me', '');

    if(!id){return <View></View>}
    
    return (
      <Query query={GET_ME}>
      {
        ({loading,error,data})=>{
          if (loading) return <Spinner />
          if (error) return <Text>{errorMessage(error)}</Text>
          return (
            this.renderProfile(data.me,id)
          )
        }
      }

      </Query>
      
    )
  }
}

export default withNavigation(UserProfile)


const styles = StyleSheet.create({
  left: {
    flex: 0.4,
  },
  right: {
    flex: 0.6,
    justifyContent: 'flex-start',
  },
  gray: {
    color: 'gray',
  }
})
