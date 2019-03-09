import React, { Component } from 'react';
import { View, TouchableHighlight, TextInput, Text, StyleSheet,Alert } from 'react-native'
import { withNavigation } from 'react-navigation'
import {
    Container,
    Header,
    Item,
    CheckBox,
    Icon,
    Button,
    Label,
    Content,
    Input,
    List,
    ListItem,
    Left,
    Body,
    Right,
    Title,
    Picker,
} from 'native-base';
import {Mutation} from 'react-apollo'
import {checkNum, errorMessage} from '../../utils/tools'
import ADD_NEWGRADEANDCLASS from '../../graphql/add_newGradeAndClass.mutation'
import {headerBackgroundColor,headerFontColor,statusBarHeight,headerButtonColor} from '../../utils/settings'

class CreateClass extends Component {
    state = {
        special: false,
        undivided:false,
        className: '',
        startGrade: 1,
        endGrade: 1,
    }

    _handleAddGradeAndClass=async (addGradeAndClass,error)=>{
        
        const { startGrade, endGrade, special, className ,undivided} = this.state
        if(special ===false && !checkNum(className)){
            Alert.alert('非特色班，请输入阿拉伯数字')
            return
        }
        if(!undivided && className[0]==="0"){
            Alert.alert('班级名称不能以"0"开头')
            return
        }
    
        for(let i=startGrade;i<=endGrade;i++){
            try{
                await addGradeAndClass({variables:{grade:i,className}})
            }catch(error){
                Alert.alert(errorMessage(error))
                return
            }
            
        }
        
        this.props.navigation.goBack()
    }

    render() {
        const { startGrade, endGrade, special, className ,undivided} = this.state
        const keyboardType = special ? 'default' : 'numeric'
        const grades = { 1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六', 7: '七', 8: '八', 9: '九', 10: '十' }
        const data1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        const data2 = data1.filter(num => num >= startGrade)
        return (
            <Container style={styles.container}>
                <Header style={{backgroundColor:headerBackgroundColor,marginTop:statusBarHeight}} >
                    <Left style={{ justifyContent: 'flex-end' }}>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back" style={{color:headerButtonColor}}  />
                        </Button>
                    </Left>
                    <Body style={{ alignItems: 'center' }}>
                        <Title style={{color:headerFontColor}}>添加班级</Title>
                    </Body>
                    <Right>
                    </Right>
                </Header>
                <Content style={styles.container}>
                    <List>
                        <ListItem style={styles.row}>
                        <Label>年级:</Label>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                style={{ width: 5 }}
                                itemStyle={{textAlign:"center"}}
                                selectedValue={startGrade}
                                onValueChange={(startGrade) => this.setState({ startGrade,endGrade:startGrade })}
                            >
                                {data1.map(data => <Picker.Item key={data} label={grades[data]} value={data} />)}
                            </Picker>
                            
                            <Label >年级至</Label>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                style={{ width: 5 }}
                                itemStyle={{textAlign:"center"}}
                                selectedValue={endGrade}
                                onValueChange={(endGrade) => this.setState({ endGrade })}
                            >
                                {data2.map(data => <Picker.Item key={data} label={grades[data]} value={data} />)}
                            </Picker>
                            <Label >年级</Label>
                        </ListItem>
                        <ListItem style={styles.row}>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                                    
                                    <CheckBox
                                        checked={undivided}
                                        onPress={() => { this.setState({ undivided: !undivided,className:"0" }) }}
                                    />
                                    <Body>
                                        <Label > 未分班</Label>
                                    </Body>
                                </View>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>

                                <CheckBox
                                    checked={special}
                                    onPress={() => { this.setState({ special: !special }) }}
                                />
                                <Body>
                                    <Label > 特色班</Label>
                                </Body>
                            </View>
                        </ListItem>
                        {
                            !undivided && (
                                <ListItem style={styles.row}>
                                    <Label >班级:</Label>
                                    <TextInput
                                        style={styles.input}
                                        value={className}
                                        placeholder={special?'请输入特色班名称':'请输入你所在的班级'}
                                        keyboardType={keyboardType}
                                        onChangeText={(className) => this.setState({ className })}
                                    />
                                    <Label >班</Label>
                                </ListItem>
                            )
                        }
                        
                        <ListItem style={styles.row}>
                            <Mutation mutation={ADD_NEWGRADEANDCLASS}>
                            {
                                (addGradeAndClass,{error})=>(
                                    <Button 
                                    block 
                                    style={{ padding: 10, flex: 1 }}
                                    onPress={()=>this._handleAddGradeAndClass(addGradeAndClass,error)}
                                    >
                                        <Text style={{fontSize:15}}> 保 存 </Text>
                                    </Button>
                                )
                            }
                            </Mutation>
                            
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        height: 150,

    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    input: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        fontSize:18,
        textAlign:'center',
        flex:1
    },
    
})

export default withNavigation(CreateClass)
