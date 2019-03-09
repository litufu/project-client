import React, { Component } from 'react';
import {View ,TouchableHighlight,Alert}  from 'react-native'
import { Container, 
    Header, 
    Item, 
    Input, 
    Icon, 
    Button, 
    Text, 
    Content,
    List,
    ListItem,
    Left,
    Right,
    Body,
    Title,
 } from 'native-base';
 import {Query,Mutation} from 'react-apollo'

 import {grades} from '../../utils/tools'
 import GET_NEWGRADEANDCLASSES from '../../graphql/get_newGradeAndClasses.query'
 import {headerBackgroundColor,headerFontColor,statusBarHeight,headerButtonColor} from '../../utils/settings'

export default class SelectClass extends Component {

    submitClasses=(gradeAndClasses)=>{
        const { navigation } = this.props;
        const startYear = navigation.getParam('startYear', 0);
        const endYear = navigation.getParam('endYear', 0);
        if(gradeAndClasses.length!== (endYear-startYear)){
            Alert.alert('你输入的班级数与输入的入学时间和毕业时间不符')
            return
        }
        this.props.navigation.goBack()
    }

  render() {
    const { navigation } = this.props;
    const startYear = navigation.getParam('startYear', 0);
    const endYear = navigation.getParam('endYear', 0);
    const existYears = []
    for(let i=startYear;i<endYear;i++){
        existYears.push(i)
    }
    return (
        <Query query={GET_NEWGRADEANDCLASSES}>
                {({ data,client}) => {
        return(
            <Container>
                <Header style={{backgroundColor:headerBackgroundColor,marginTop:statusBarHeight}} >
                    <Left style={{ justifyContent: 'flex-end' }}>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back" style={{color:headerButtonColor}} />
                        </Button>
                    </Left>
                    <Body style={{ alignItems: 'center' }}>
                        <Title style={{color:headerFontColor}}>学习经历</Title>
                    </Body>
                    <Right>
                        {
                            data.newGradeAndClasses.length>0 && (
                                <Button
                                    onPress={()=>this.submitClasses(data.newGradeAndClasses)}
                                    ><Text>确认</Text></Button>
                            )
                        }
                        
                    </Right>
                </Header>
                <Content>
                    <List>
                        
                    {data.newGradeAndClasses.length===0 && <ListItem></ListItem>}
                    {data.newGradeAndClasses.length>0 && data.newGradeAndClasses.map((newGradeAndClass,index)=>(
                        <ListItem key={newGradeAndClass.id}>
                        <TouchableHighlight>
                            <Text>{`${existYears[index]}年:${grades[newGradeAndClass.grade]}年级${newGradeAndClass.className==="0"?"未分":newGradeAndClass.className}班`}</Text>
                        </TouchableHighlight>
                        </ListItem>))
                        }
                        
                    </List>
                    <Button block
                        style={{padding:10,margin:10}}
                        onPress={()=>this.props.navigation.navigate('CreateClass')}
                    >
                    <Text>添加班级</Text>
                    </Button>
                    {
                        data.newGradeAndClasses.length>0 && (
                        <Button block warning
                            style={{padding:10,margin:10}}
                            onPress={()=>{client.writeQuery({query:GET_NEWGRADEANDCLASSES,data:{newGradeAndClasses:[]}})}}
                        >
                            <Text>清除班级</Text>
                        </Button>
                        )
                    }
                </Content>
            </Container>
            )
    }}
</Query>
    );
  }
}