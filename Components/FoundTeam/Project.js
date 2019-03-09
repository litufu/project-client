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
    CheckBox,
    Spinner
} from 'native-base';
import { trim, errorMessage } from '../../utils/tools'

import GET_PROJECTS from '../../graphql/get_projects.query'
import CREATE_PROJECT from '../../graphql/create_project.muation'
import { Query,Mutation } from 'react-apollo';


export default class SendInvitation extends Component {

    state = {
        name: "",
        content: "",
        display: "main",
    }

    _renderName = () => (
        <List>
            <ListItem>
                <Input
                    placeholder="请输入项目名称"
                    value={this.state.name}
                    onChangeText={text => this.setState({ name: trim(text) })}
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
                    onChangeText={text => this.setState({ content: trim(text) })}
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

    _renderProject = (placeName) => {
        const { name, content } = this.state
        return (
            <List>
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
                    <Mutation
                        mutation={CREATE_PROJECT}
                        update={(cache, { data: { createProject } }) => {
                            const { projects } = cache.readQuery({ query: GET_PROJECTS });
                            cache.writeQuery({
                                query: GET_PROJECTS,
                                data: { projects: projects.concat([createProject]) },
                            });
                        }}
                    >
                        {
                            createProject => (
                                <Button
                                    full
                                    style={{ marginHorizontal: 20, marginVertical: 15 }}
                                    onPress={() => {
                                        if (!/^[_,.，。！!;；：:A-Za-z0-9\u4e00-\u9fa5]+/.test(this.state.name)) {
                                            Alert.alert('项目名称格式错误')
                                            return
                                        }
                                        if (!/^[_,.，。！!;；：:A-Za-z0-9\u4e00-\u9fa5]+/.test(this.state.content)) {
                                            Alert.alert('项目内容格式错误，请检查是否包含特殊字符')
                                            return
                                        }
                                        createProject({ variables: { name, content } })
                                        this.setState({ name: "", content: "", display: "main" })
                                    }}
                                >
                                    <Text>确认</Text>
                                </Button>
                            )
                        }

                    </Mutation>
            </List>
        )
    }


    _renderMain = () => (
        <Query query={GET_PROJECTS}>
            {
                ({ loading, error, data }) => {
                    if (loading) return <Spinner />
                    if (error) return <Text>{errorMessage(error)}</Text>
                    return (
                        <List>
                            {data.projects.length<1 && <Button
                                full
                                style={{ marginHorizontal: 20, marginVertical: 15 }}
                                onPress={() => {
                                    this.setState({ display: "project" })
                                }}
                            >
                                <Text>新建创业项目</Text>
                            </Button>}
                            {
                                data.projects.map((project,index) => (
                                    <ListItem avatar key={index}>
                                        <Body>
                                            <Text>{`项目名称：${project.name}`}</Text>
                                            <Text note>{`项目地点：${project.place.name}`}</Text>
                                        </Body>
                                        <Right>
                                            <Button
                                                onPress={() => this.props.navigation.navigate('AddPartner', { project })}
                                            >
                                                <Text>进入</Text>
                                            </Button>
                                        </Right>
                                    </ListItem>
                                ))
                            }
                        </List>
                    )
                }
            }
        </Query>
    )


    _renderContent = (display,placeName) => {
        if (display === "main") {
            return this._renderMain()
        } else if (display === "project") {
            return this._renderProject(placeName)
        } else if (display === "name") {
            return this._renderName()
        } else if (display === "introduce") {
            return this._renderIntroduce()
        }
    }

    render() {
        const { display } = this.state
        const placeName = `${this.props.me.residence.province.name}${this.props.me.residence.city.name}`
        return (
            <Content>
                {this._renderContent(display, placeName)}
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