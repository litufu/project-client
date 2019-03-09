import React, { Component } from 'react';
import { View, StyleSheet, TouchableNativeFeedback, TextInput, Alert, } from 'react-native'
import { SearchBar } from 'react-native-elements'

import {
    Container,
    Content,
    List,
    ListItem,
    Text,
    Left,
    Right,
    Input,
    Button,
    CheckBox,
    Body,
    Label,
    Picker,
    Icon,
    Spinner,
    Item,
    Form,
    Radio
} from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Query, Mutation, ApolloConsumer } from 'react-apollo'
import { withNavigation } from 'react-navigation'

import { errorMessage,trim } from '../../utils/tools'
import MyDateTime from '../MyDatetime'
import GET_ME from '../../graphql/get_me.query'
import ADDORUPDATE_WORK from '../../graphql/add_update_work.mutation'
import GET_STATIONS from '../../graphql/get_stations.query'

export default class Job extends React.Component {
    state = {
        startTime: this.props.startTime || "",
        endTime: this.props.endTime || "",
        companyName: this.props.companyName || "",
        department: this.props.department || "",
        post: this.props.postName || "",
        now: this.props.now || false,
        selectPost: false,
        selectStaionId: this.props.postId ||"",
        loading: false,
        stations: [],
    }

    _reconfirm = (addOrUpdateWork, client) => {
        const { startTime, endTime, companyName, department, post, now,selectStaionId } = this.state
        const checkCompanyName = /^[（()）\u4E00-\u9FA5\uf900-\ufa2d·s]{2,30}$/
        const rxName = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,30}$/

        if (startTime === "") {
            Alert.alert('未选择开始工作时间')
            return
        }

        if (endTime === "" && now === false) {
            Alert.alert('未选择离职时间')
            return
        }
        


        
        if (companyName === "") {
            Alert.alert('未输入单位名称')
            return
        }
        if (!checkCompanyName.test(companyName)) {
            Alert.alert('单位名称暂不支持')
            return
        }
        if (department === "") {
            Alert.alert('未输入部门名称')
            return
        }
        if (!rxName.test(companyName)) {
            Alert.alert('部门名称暂不支持')
            return
        }
        if (post === "") {
            Alert.alert('未输入职位名称')
            return
        }
        if (!rxName.test(post)) {
            Alert.alert('岗位名称暂不支持')
            return
        }

        if (now) {
            Alert.alert(
                '请确认:',
                `
                单位:${companyName}
                入职时间:${(new Date(startTime)).toLocaleDateString()}
                离职时间:${now ? "在职状态" : (new Date(endTime)).toLocaleDateString()}
                部门:${department}
                职位:${post}
                
            `,
                [
                    { text: '取消', onPress: () => console.log('取消'), style: 'cancel' },
                    { text: '确认', onPress: () => this._submit(startTime, "9999-12-1", companyName, department, post, selectStaionId,addOrUpdateWork, client) },
                ],
                { cancelable: false }
            )
        } else {
            Alert.alert(
                '请确认:',
                `
                单位:${companyName}
                入职时间:${(new Date(startTime)).toLocaleDateString()}
                离职时间:${now ? "在职状态" :  (new Date(endTime)).toLocaleDateString()}
                部门:${department}
                职位:${post}
                
                上述信息一经确认将无法修改。
            `,
                [
                    { text: '取消', onPress: () => console.log('取消'), style: 'cancel' },
                    { text: '确认', onPress: () => this._submit(startTime, endTime, companyName, department, post, selectStaionId, addOrUpdateWork, client) },
                ],
                { cancelable: false }
            )
        }
    }

    _submit = (startTime, endTime, companyName, department, post,selectStaionId, addOrUpdateWork, client) => {
        const { me } = client.readQuery({ query: GET_ME })
        const startYear = (new Date(startTime)).getFullYear()
        const endYear = (endTime==="9999-12-1" ? 9999: (new Date(endTime)).getFullYear())
        const birthyear = new Date(me.birthday).getFullYear()
        if (birthyear > startYear) {
            Alert.alert('出生后才能上班，请检查出生日期是否正确')
            return
        }
        if (birthyear + 10 > parseInt(startYear)) {
            Alert.alert('太小了，无法上班，请检查出生日期是否设置错误')
            return
        }
        if (parseInt(startYear) > parseInt(endYear)) {
            Alert.alert('入职年份必须小于离职年份')
            return
        }
        if(!this.props.updateId){
            if(endYear===9999 && (me.works.filter(work=>new Date(work.endTime).getFullYear()===9999)).length>0){
                Alert.alert('在职状态仅能选择一家公司')
                return
            }
            if(me.works.filter(work=>{
                if(((new Date(startTime)> new Date(work.startTime)) && (new Date(startTime) < new Date(work.endTime)))||
                ((new Date(endTime)> new Date(work.startTime)) && (new Date(endTime) < new Date(work.endTime)))
                ){
                    return true
                }
                return false
            }).length>0){
                Alert.alert('同一时间只能选择一家公司工作')
                return
            }
        }else{
            if(me.works.filter(work=>new Date(work.endTime).getFullYear()!==9999).filter(work=>{
                if(((new Date(startTime)> new Date(work.startTime)) && (new Date(startTime) < new Date(work.endTime)))||
                ((new Date(endTime)> new Date(work.startTime)) && (new Date(endTime) < new Date(work.endTime)))
                ){
                    return true
                }
                return false
            }).length>0){
                Alert.alert('同一时间只能选择一家公司工作')
                return
            }
        }
      
            
        addOrUpdateWork({
            variables: {
                startTime,
                endTime,
                companyName,
                department,
                stationId:selectStaionId,
                updateId:this.props.updateId
            },
            // optimisticResponse: {
            //     __typename: "Mutation",
            //     addOrUpdateWork: {
            //         __typename: "Work",
            //         id: '123',
            //         startTime: startTime,
            //         endTime: endTime,
            //         department: department,
            //         post: {
            //             __typename:"Station",
            //             id:'123',
            //             name:post,
            //         },
            //         company: {
            //             __typename: "Company",
            //             id: "456",
            //             name: companyName
            //         }
            //     }
            // },
            update: (cache, { data }) => {
                const {me} = cache.readQuery({ query: GET_ME });
                const updates = me.works.filter(work=>work.id===data.addOrUpdateWork.id)
                if(updates.length>0){
                    const newData = {...me,works:me.works.map(work=>{
                        if(work.id===this.props.updateId){
                            return data.addOrUpdateWork
                        }
                        return work
                    })}
                    cache.writeQuery({
                        query: GET_ME,
                        data: {me:newData}
                    });
                }else{
                    me.works.push(data.addOrUpdateWork);
                    cache.writeQuery({
                        query: GET_ME,
                        data: {me}
                    });
                }
            }
        })
        this.props.confirm()
        
    }

    _renderSearchPost = () => (
        <ApolloConsumer>
            {client => (
                <SearchBar
                    round
                    lightTheme
                    onChangeText={(text) => this.setState({ post: text })}
                    onClearText={() => this.setState({ post: "" })}
                    onSubmitEditing={async () => {
                        if(trim(this.state.post).length===0){
                            Alert.alert('请输入关键字')
                            return
                        }
                        if(~['人','员','工','师'].indexOf(trim(this.state.post))){
                            Alert.alert('关键字太简单，')
                            return
                        }
                        this.setState({ loading: true })
                        const { data } = await client.query({
                            query: GET_STATIONS,
                            variables: { text: trim(this.state.post) }
                        });
                        this.setState({ loading: false, stations: data.stations })
                    }}
                    placeholder='搜索职位...' />
                  
            )}
        </ApolloConsumer>
    )


    render() {
        const { companyName, department, post, now, selectPost, selectStaionId, stations, loading } = this.state
        return (

            <Container>
                {
                    selectPost &&
                    <Content>
                        {this._renderSearchPost()}
                        {loading && <Spinner />}
                        {!loading &&
                            <List>
                                {
                                    stations.map(station => (
                                        station.id==='000' ? (<Text key={station.id}>{station.name}</Text>)
                                        :(<ListItem
                                            key={station.id}
                                        >
                                            <Left>
                                                <Text>{station.name}</Text>
                                            </Left>
                                            <Right>
                                                <Radio
                                                    selected={selectStaionId === station.id}
                                                    onPress={() => this.setState({ selectStaionId: station.id, post: station.name, selectPost: false })}
                                                />
                                            </Right>
                                        </ListItem>)
                                    ))
                                }
                            </List>
                        }
                    </Content>
                }
                {
                    !selectPost && (
                        <Content>
                            <List >
                                <Item>
                                    <Input
                                        style={styles.input}
                                        placeholder="单位全称"
                                        value={companyName}
                                        onChangeText={(companyName) => this.setState({ companyName })}
                                        disabled={this.props.updateId?true:false}
                                    />
                                </Item>
                                <Item>
                                    <Input
                                        style={styles.input}
                                        placeholder="部门名称"
                                        value={department}
                                        onChangeText={(department) => this.setState({ department })}
                                    />
                                </Item>
                                <ListItem>

                                    <Left style={{flex:0.3}}>
                                        <Text>职位名称:</Text>
                                    </Left>
                                    <Right style={{flex:0.7}}>
                                        <TouchableNativeFeedback
                                            onPress={() => this.setState({ selectPost: true })}
                                        >
                                            <Text>{post ? post : "未选择"}</Text>
                                        </TouchableNativeFeedback>
                                    </Right>
                                </ListItem>

                                <ListItem >
                                    <Left >
                                        <Text>开始工作时间:</Text>
                                    </Left>
                                    <View>
                                        <MyDateTime
                                            mode="date"
                                            handleDate={(startTime) => this.setState({ startTime })}
                                        />
                                    </View>
                                </ListItem>
                                {
                                    !now && (<ListItem >
                                        <Left >
                                            <Text>结束工作时间:</Text>
                                        </Left>
                                        <View >
                                            <MyDateTime
                                                mode="date"
                                                handleDate={(endTime) => this.setState({ endTime })}
                                            />
                                        </View>
                                    </ListItem>)
                                }
                                <ListItem>
                                    <CheckBox
                                        checked={now}
                                        onPress={() => { this.setState({ now: !now }) }}
                                    />
                                    <Body style={{ paddingHorizontal: 10 }}>
                                        <Text >目前在职</Text>
                                    </Body>
                                </ListItem>
                                <ListItem>
                                    <Body>
                                        <Mutation
                                            mutation={ADDORUPDATE_WORK}
                                            onCompleted={() => Alert.alert(this.props.updateId?"修改完成":'保存完成')}
                                        >
                                            {
                                                (addOrUpdateWork, { loading, error, client }) => {
                                                    return (<Button
                                                        block
                                                        onPress={() => this._reconfirm(addOrUpdateWork, client)}
                                                    >
                                                        <Text>确定</Text>
                                                        {loading && <Spinner />}
                                                        {error && Alert.alert(errorMessage(error))}
                                                    </Button>)
                                                }
                                            }
                                        </Mutation>
                                    </Body>
                                </ListItem>
                            </List>
                        </Content>
                    )
                }

            </Container>

        )
    }
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    body: {
        flex: 0.3
    },
    right: {
        flex: 0.5,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-end"
    },
    left: {
        flex: 0.2,
    },
    input: {
        paddingHorizontal: 10,
    }

})