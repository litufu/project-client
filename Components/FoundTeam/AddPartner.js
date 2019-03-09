import React, { Component } from 'react';
import { StyleSheet, Alert, TouchableWithoutFeedback } from 'react-native'
import {
    Left,
    Body,
    Right,
    Button,
    Item,
    List,
    ListItem,
    Content,
    Text,
    Form,
    CheckBox,
    Container,
    Header,
    Icon,
    Title,
    Spinner,
    Thumbnail,
} from 'native-base';

import { PullPicker, SearchInput, Stepper } from 'teaset'
import { ApolloConsumer, Query, Mutation } from 'react-apollo';
import { trim, errorMessage } from '../../utils/tools'

import GET_SKILLS from "../../graphql/get_skills.query"
import GET_PARTNERCONDITIONS from "../../graphql/get_partnerConditions.query"
import ADD_PARTNERCONDITION from "../../graphql/add_partnerCondition.mutation"
import DELETE_PARTNERCONDITION from '../../graphql/delete_partnerCondition.mutation'
import CHANGE_PARTNER from '../../graphql/change_partner.mutation'
import REFRESH_PARTNERCONDITION from '../../graphql/refresh_partner.mutation'
import { defaultAvatar } from '../../utils/settings'


const placeMap = { 0: "本市", 1: "本省", 2: "全国" }
const items = ["本市", "本省", "全国"]

export default class StackedLabelExample extends Component {

    state = {
        display: "partner",
        partaners: [],
        skillName: "",
        number: 1,
        selectedIndex: 0,
        search: '',
        searchSkills: [],
    }

    _renderSkillName = () => (
        <ApolloConsumer>
            {client => (
                <Content>
                    <Item style={{ marginVertical: 10, flex: 1 }}>
                        <Left style={{ flex: 0.8 }}>
                            <SearchInput
                                style={{ width: 300, height: 40 }}
                                placeholder="输入技能名称..."
                                onChangeText={(text) => this.setState({ search: trim(text) })}
                                value={this.state.search}
                            />
                        </Left>
                        <Right style={{ flex: 0.2 }}>
                            <Button
                                style={{ flex: 1, marginHorizontal: 10 }}
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
                                        })
                                        this.setState({ searchSkills: data.skills })
                                    }}
                            >
                                <Text>搜索</Text>
                            </Button>
                        </Right>

                    </Item>
                    {this.state.searchSkills.map((skill, index) => (
                        <ListItem key={index}>
                            <CheckBox
                                onPress={() => this.setState({ skillName: skill.name, display: "addPartner" })}
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

    _renderAddPatenar = (project) => (
        <Form>
            <Item >
                <Left>
                    <Text>合伙人所需技能</Text>
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
            <Item >
                <Left>
                    <Text>合伙人数</Text>
                </Left>
                <Right>
                    <Stepper
                        style={{ height: 30, marginVertical: 5 }}
                        defaultValue={1}
                        min={1}
                        max={10}
                        value={this.state.number}
                        onChange={(value) => this.setState({ number: value })}
                    />
                </Right>
            </Item>
            <Item>
                <Left><Text>寻找范围</Text></Left>
                <Right>
                    <Button
                        transparent
                        onPress={() => PullPicker.show(
                            '寻找范围',
                            items,
                            this.state.selectedIndex,
                            (item, index) => this.setState({ selectedIndex: index })
                        )}
                    >
                        <Text>{~[0, 1, 2].indexOf(this.state.selectedIndex) ? placeMap[this.state.selectedIndex] : "请选择"}</Text>
                    </Button>
                </Right>
            </Item>
            <Mutation
                mutation={ADD_PARTNERCONDITION}
                update={(cache, { data: { addPartnerCondition } }) => {
                    const { partnerConditions } = cache.readQuery({ query: GET_PARTNERCONDITIONS, variables: { projectId: project.id } });
                    cache.writeQuery({
                        query: GET_PARTNERCONDITIONS,
                        variables: { projectId: project.id },
                        data: { partnerConditions: partnerConditions.concat([addPartnerCondition]) },
                    })
                }}
            >
                {
                    addPartnerCondition => (
                        <Button
                            full
                            style={{ marginHorizontal: 20, marginVertical: 15 }}
                            onPress={
                                async () => {
                                    if (parseInt(this.state.number) > 10) {
                                        Alert.alert('同一技能合伙人不超过10人')
                                        return
                                    }
                                    if (!this.state.skillName) {
                                        Alert.alert('技能不能为空')
                                        return
                                    }
                                    if (!~[0, 1, 2].indexOf(this.state.selectedIndex)) {
                                        Alert.alert('寻找范围为空')
                                        return
                                    }

                                    await addPartnerCondition({
                                        variables: {
                                            skillName: this.state.skillName,
                                            number: parseInt(this.state.number, 10),
                                            place: `${this.state.selectedIndex}`,
                                            projectId: project.id
                                        }
                                    })
                                    this.setState({
                                        display: "partner",
                                        skillName: "",
                                        number: "",
                                        selectedIndex: 0
                                    })
                                }
                            }
                        >
                            <Text>确认添加</Text>
                        </Button>
                    )
                }

            </Mutation>
        </Form>
    )

    _renderPatenar = (project) => (
        <List>
            <Button
                full
                style={{ marginHorizontal: 20, marginVertical: 15 }}
                onPress={() => this.setState({ display: "addPartner" })}
            >
                <Text>添加合伙人</Text>
            </Button>
            <Query query={GET_PARTNERCONDITIONS}
                variables={{ projectId: project.id }}
            >
                {
                    ({ loading, error, data }) => {
                        if (loading) return <Spinner />
                        if (error) return <Text>{errorMessage(error)}</Text>
                        return (
                            <Content>
                                {
                                    data.partnerConditions.map(partnerCondition => (
                                        <Content key={partnerCondition.id}>
                                            <Mutation
                                                mutation={DELETE_PARTNERCONDITION}
                                                update={(cache, { data: { deletePartnerCondition } }) => {
                                                    const { partnerConditions } = cache.readQuery({ query: GET_PARTNERCONDITIONS, variables: { projectId: project.id } })
                                                    cache.writeQuery({
                                                        query: GET_PARTNERCONDITIONS,
                                                        variables: { projectId: project.id },
                                                        data: { partnerConditions: partnerConditions.filter(pc => pc.id !== deletePartnerCondition.id) },
                                                    })
                                                }}
                                            >
                                                {
                                                    deletePartnerCondition => (
                                                        <ListItem
                                                            itemDivider
                                                            onLongPress={() => {
                                                                Alert.alert(
                                                                    '是否删除？',
                                                                    partnerCondition.skillName,
                                                                    [
                                                                        {
                                                                            text: '取消',
                                                                            onPress: () => console.log('Cancel Pressed'),
                                                                            style: 'cancel',
                                                                        },
                                                                        { text: '删除', onPress: () => deletePartnerCondition({ variables: { id: partnerCondition.id } }) },
                                                                    ],
                                                                    { cancelable: false },
                                                                )
                                                            }}
                                                        >
                                                            <Left><Text>{`技能:${partnerCondition.skillName}`}</Text></Left>
                                                            <Body>
                                                                <Text>{`人数:${partnerCondition.number}`}</Text>
                                                                <Text>{`范围:${placeMap[parseInt(partnerCondition.place)]}`}</Text>
                                                            </Body>
                                                            <Right>
                                                                <TouchableWithoutFeedback
                                                                    onPress={() => {
                                                                        Alert.alert(
                                                                            '是否删除？',
                                                                            partnerCondition.skillName,
                                                                            [
                                                                                {
                                                                                    text: '取消',
                                                                                    onPress: () => console.log('Cancel Pressed'),
                                                                                    style: 'cancel',
                                                                                },
                                                                                { text: '删除', onPress: () => deletePartnerCondition({ variables: { id: partnerCondition.id } }) },
                                                                            ],
                                                                            { cancelable: false },
                                                                        )
                                                                    }}
                                                                >
                                                                    <Icon type="FontAwesome" name="trash-o" />
                                                                </TouchableWithoutFeedback>

                                                            </Right>
                                                        </ListItem>
                                                    )
                                                }
                                            </Mutation>
                                            {
                                                partnerCondition.partners.length > 0
                                                    ? (<List>
                                                        {
                                                            partnerCondition.partners.map(partner => (
                                                                <ListItem thumbnail key={partner.id}>
                                                                    <Left>
                                                                        <TouchableWithoutFeedback
                                                                            onPress={() => this.props.navigation.navigate('UserProfile', { id: partner.id })}
                                                                        >
                                                                            <Thumbnail source={{ uri: partner.avatar ? partner.avatar.url : defaultAvatar }} />
                                                                        </TouchableWithoutFeedback>
                                                                    </Left>
                                                                    <Body>
                                                                        <TouchableWithoutFeedback
                                                                            onPress={() => this.props.navigation.navigate('UserProfile', { id: partner.id })}
                                                                        >
                                                                            <Text>{partner.name}</Text>
                                                                        </TouchableWithoutFeedback>
                                                                    </Body>
                                                                    <Right>
                                                                        <Mutation
                                                                            mutation={CHANGE_PARTNER}
                                                                            update={(cache, { data: { changePartner } }) => {
                                                                                const { partnerConditions } = cache.readQuery({ query: GET_PARTNERCONDITIONS, variables: { projectId: project.id } })
                                                                                cache.writeQuery({
                                                                                    query: GET_PARTNERCONDITIONS,
                                                                                    variables: { projectId: project.id },
                                                                                    data: {
                                                                                        partnerConditions: partnerConditions.map(pc => {
                                                                                            if (pc.id === partnerCondition.id) {
                                                                                                return changePartner
                                                                                            }
                                                                                            return pc
                                                                                        })
                                                                                    },
                                                                                })
                                                                            }}
                                                                        >
                                                                            {
                                                                                changePartner => (
                                                                                    <Button
                                                                                        onPress={() => {
                                                                                            changePartner({
                                                                                                variables: {
                                                                                                    conditionId: partnerCondition.id,
                                                                                                    uid: partner.id
                                                                                                }
                                                                                            })
                                                                                        }}
                                                                                    >
                                                                                        <Text>换一个</Text>
                                                                                    </Button>
                                                                                )
                                                                            }
                                                                        </Mutation>
                                                                    </Right>
                                                                </ListItem>
                                                            ))
                                                        }
                                                    </List>)
                                                    : (
                                                        <Mutation
                                                            mutation={REFRESH_PARTNERCONDITION}
                                                            update={(cache, { data: { refreshPartner } }) => {
                                                                const { partnerConditions } = cache.readQuery({ query: GET_PARTNERCONDITIONS, variables: { projectId: project.id } })
                                                                cache.writeQuery({
                                                                    query: GET_PARTNERCONDITIONS,
                                                                    variables: { projectId: project.id },
                                                                    data: {
                                                                        partnerConditions: partnerConditions.map(pc => {
                                                                            if (pc.id === partnerCondition.id) {
                                                                                return refreshPartner
                                                                            }
                                                                            return pc
                                                                        })
                                                                    },
                                                                })
                                                            }}
                                                        >
                                                            {
                                                                (refreshPartner, { loading }) => {
                                                                    if (loading) return <Spinner />
                                                                    return (
                                                                        <ListItem>
                                                                            <Left>
                                                                                <Text>目前尚无满足条件的合伙人,尝试全国范围内查找或过段时间刷新重试。</Text>
                                                                            </Left>
                                                                            <Right>
                                                                                <Button
                                                                                    onPress={() => {
                                                                                        refreshPartner({ variables: { conditionId: partnerCondition.id } })
                                                                                    }}
                                                                                >
                                                                                    <Text>
                                                                                        刷新
                                                                                </Text>
                                                                                </Button>
                                                                            </Right>
                                                                        </ListItem>
                                                                    )
                                                                }
                                                            }
                                                        </Mutation>
                                                    )
                                            }
                                        </Content>
                                    ))
                                }
                            </Content>
                        )
                    }
                }
            </Query>
        </List>
    )

    _renderContent = (display, project) => {
        if (display === "partner") {
            return this._renderPatenar(project)
        } else if (display === "addPartner") {
            return this._renderAddPatenar(project)
        } else if (display === "skillName") {
            return this._renderSkillName()
        }
    }


    render() {
        const { display } = this.state
        const project = this.props.navigation.getParam('project')
        return (
            <Container>
                <Header>
                    <Left>
                        <Button
                            onPress={() => this.props.navigation.goBack()}
                            transparent
                        >
                            <Icon name='md-arrow-back' type='Ionicons' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>{project.name}</Title>
                    </Body>
                    <Right >
                    </Right>
                </Header>
                <Content>
                    {this._renderContent(display, project)}
                </Content>
            </Container>
        )
    }
}
