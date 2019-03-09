import React, { Component } from 'react';
import { StyleSheet, Alert } from 'react-native'
import {
    Left,
    Body,
    Right,
    Button,
    Item,
    List,
    ListItem,
    Textarea,
    Input,
    Content,
    Text,
    Picker,
    Form,
    Label,
    CheckBox
} from 'native-base';
import { PullPicker } from 'teaset'
import { ApolloConsumer } from 'react-apollo';
import { SearchBar } from 'react-native-elements'
import { trim } from '../../utils/tools'

import GET_SKILLS from "../../graphql/get_skills.query"

const placeMap = { "0": "本市", "1": "本省", "2": "全国" }
const items = ["本市", "本省", "全国"]

export default class SendInvitation extends Component {

    state = {
        name: "",
        content: "",
        display: "main",
        partaners: [],
        skillName: "",
        number: "",
        selectedIndex: "",
        search: '',
        searchSkills: [],
    }

    _renderName = () => (
        <List>
            <ListItem>
                <Input
                    placeholder="请输入项目名称"
                    value={this.state.name}
                    onChangeText={text => this.setState({ name: text })}
                />
            </ListItem>
            <Button
                full
                style={{ marginHorizontal: 20, marginVertical: 15 }}
                onPress={() => this.setState({ display: "project" })}
            >
                <Text>确认</Text>
            </Button>
        </List>
    )

    _renderIntroduce = () => (
        <Content padder>
            <Form>
                <Textarea
                    placeholder="请输入项目简介,长度小于200字"
                    maxLength={200}
                    rowSpan={5}
                    bordered
                    value={this.state.content}
                    onChangeText={text => this.setState({ content: text })}
                />
            </Form>
            <Button
                full
                style={{ marginHorizontal: 20, marginVertical: 15 }}
                onPress={() => this.setState({ display: "project" })}
            >
                <Text>确认</Text>
            </Button>
        </Content>
    )

    _renderSkillName = () => (
        <ApolloConsumer>
            {client => (
                <Content>
                    <Item>
                        <SearchBar
                            placeholder="输入技能名称..."
                            onChangeText={(text) => this.setState({ search: text })}
                            value={this.state.search}
                        />
                        <Button
                            onPress={
                                async () => {
                                    const search = trim(this.state.search).toLowerCase()
                                    if (!/^[A-Za-z0-9\u4e00-\u9fa5]+/.test(search)) {
                                        Alert.alert('格式必须为英文、中文或数字')
                                        return
                                    }
                                    const { data } = await client.query({
                                        query: GET_SKILLS,
                                        variables: { name: search }
                                    });
                                    this.setState({ searchSkills: data.skills });
                                }}
                        >
                            <Text>搜索</Text>
                        </Button>
                    </Item>
                    {this.state.searchSkills.map((skill,index)=>(
                        <ListItem key={index}>
                            <CheckBox 
                            onPress={()=>this.setState({skillName:skill.name,display:"addPartener"})}
                           />
                            <Body>
                                <Text>{skill.name}</Text>
                            </Body>
                        </ListItem>
                    ))}
                </Content>
            )}
        </ApolloConsumer>
    )

    _renderAddPatenar = () => (

        <Form>
            <Item stackedLabel>
                <Left>
                    <Text>技能名称</Text>
                </Left>
                <Right>
                    <Button
                        transparent
                        onPress={() => this.setState({ display: "skillName" })}
                    >
                        <Text>{this.state.skillName ? this.state.skillName : "请选择"}</Text>
                    </Button>
                </Right>
            </Item>
            <Item stackedLabel last>
                <Label>所需人数</Label>
                <Input
                    value={this.state.number}
                    onChangeText={(value) => this.setState({ number: value })}
                />
            </Item>
            <Item>
                <Left><Text>发布范围</Text></Left>
                <Right>
                    <Button
                        transparent
                        onPress={() => PullPicker.show(
                            '发布范围',
                            items,
                            this.state.selectedIndex,
                            (item, index) => this.setState({ selectedIndex: index })
                        )}
                    >
                        <Text>{placeMap[this.state.selectedIndex]}</Text>
                    </Button>
                </Right>
            </Item>
            <Button
                full
                style={{ marginHorizontal: 20, marginVertical: 15 }}
                onPress={() => this.setState({ 
                    display: "project",
                    partaners:this.state.partaners.push(
                        {skillName:this.state.skillName,
                            number:this.state.number,
                            place:this.state.selectedIndex
                        }
                        ),
                skillName:"",
                number:"",
                selectedIndex:""
                })}
            >
                <Text>确认添加</Text>
            </Button>
        </Form>
    )

    _renderPatenar = () => (
        <List>
            <Item style={{flex:1}}>
            <Button
                style={{ marginHorizontal: 20, marginVertical: 15 ,flex:0.5}}
                onPress={() => this.setState({ display: "addPartener" })}
            >
                <Text>添加合伙人</Text>
            </Button>
            <Button
                style={{ marginHorizontal: 20, marginVertical: 15,flex:0.5 }}
                onPress={() => this.setState({ display: "project" })}
            >
                <Text>确认完成</Text>
            </Button>
            </Item>
            <ListItem>
                <Left><Text>合伙人所需技能</Text></Left>
                <Body><Text>人数</Text></Body>
                <Right><Text>地点</Text></Right>
            </ListItem>
            {
                this.state.partaners.map(partaner => (
                    <ListItem>
                        <Left>{partaner.skillName}</Left>
                        <Body>{partaner.number}</Body>
                        <Right>{placeMap[partaner.place]}</Right>
                    </ListItem>
                ))
            }
        </List>
    )


    _renderProject = (placeName) => {
        const { name, content,partaners } = this.state
        return (
            <List>
                <ListItem
                    style={{ flex: 1 }}
                    onPress={() => this.setState({ display: "name" })}
                >
                    <Left style={styles.left}>
                        <Text>项目名称</Text>
                    </Left>
                    <Right style={styles.right}>
                        <Text>{!!name ? name : "未填写"}</Text>
                    </Right>
                </ListItem>
                <ListItem
                    style={{ flex: 1 }}
                >
                    <Left style={styles.left}>
                        <Text>项目地点</Text>
                    </Left>
                    <Right style={styles.right}>
                        <Text>{placeName}</Text>
                    </Right>
                </ListItem>
                <ListItem
                    onPress={() => this.setState({ display: "introduce" })}
                    style={{ flex: 1 }}
                >
                    <Left style={styles.left}>
                        <Text>项目简介</Text>
                    </Left>
                    <Right style={styles.right}>
                        <Text>{!!content ? `${content.slice(0, 5)}...` : "未填写"}</Text>
                    </Right>
                </ListItem>
                <ListItem
                    onPress={() => this.setState({ display: "partaner" })}
                    style={{ flex: 1 }}
                >
                    <Left style={styles.left}>
                        <Text>寻找合伙人</Text>
                    </Left>
                    <Right style={styles.right}>
                        <Text>{partaners.length===0?"未填写":`${partaners[0].skillName}...`}</Text>
                    </Right>
                </ListItem>

                <Item style={{ flex: 1 }}>
                    <Button
                        onPress={()=>this.setState({display:"showProject"})}
                        style={{ marginHorizontal: 20, marginVertical: 15, flex: 0.5 }}
                    >
                        <Text>预览</Text>
                    </Button>
                    <Button

                        style={{ marginHorizontal: 20, marginVertical: 15, flex: 0.5 }}
                    >
                        <Text>确认发布</Text>
                    </Button>
                </Item>
            </List>
        )
    }

    _showProject=(placeName)=>(
        <List>
            <Button
            onPress={()=>this.setState({display:"project"})}
            >
            <Text>返回</Text>
            </Button>
            <ListItem>
                <Left>
                    <Text>项目名称:</Text>
                </Left>
                <Text>{this.state.name}</Text>
            </ListItem>
            <ListItem>
                <Left>
                    <Text>项目地点:</Text>
                </Left>
                <Text>{placeName}</Text>
            </ListItem>
            <ListItem>
                <Text>项目简介：</Text>
            </ListItem>
            <ListItem>
                <Text>{this.state.content}</Text>
            </ListItem>
            <ListItem>
                <Text>寻找合伙人明细：</Text>
            </ListItem>
            {
                this.state.partaners.map(partaner=>(
                    <ListItem>
                        <Text>`技能名称：${partaner.skillName}`</Text>
                        <Text>`人数：${partaner.number}`</Text>
                        <Text>`地点：${placeMap[partaner.place]}`</Text>
                    </ListItem>
                ))
            }

        </List>
    )

    _renderMain = () => (
        <List>
            <Button
                full
                style={{ marginHorizontal: 20, marginVertical: 15 }}
                onPress={() => this.setState({ display: "project" })}
            >
                <Text>创建项目</Text>
            </Button>
            <ListItem avatar>
                <Left>
                    <Text>项目名称：</Text>
                    <Text note>项目地点：</Text>
                </Left>
                <Right>
                    <Text note>进入</Text>
                </Right>
            </ListItem>
        </List>
    )


    _renderContent = (display) => {
        if (display === "main") {
            return this._renderMain()
        } else if (display === "project") {
            return this._renderProject(placeName)
        } else if (display === "name") {
            return this._renderName()
        } else if (display === "partaner") {
            return this._renderPatenar()
        } else if (display === "introduce") {
            return this._renderIntroduce()
        } else if (display === "addPartener") {
            return this._renderAddPatenar()
        } else if(display ==="skillName"){
            return this._renderSkillName()
        } else if(display==="showProject"){
            return this._showProject()
        }
    }

    render() {
        const { display } = this.state
        const placeName = `${this.props.me.residence.province.name}${this.props.me.residence.city.name}`
        return (
            <Content>
                {this._renderContent(display,placeName)}
            </Content>
        )
    }
}

const styles = StyleSheet.create({
    left: {
        flex: 0.4
    },
    right: {
        flex: 0.6
    }
})