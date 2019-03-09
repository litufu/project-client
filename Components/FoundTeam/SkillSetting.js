import React, { Component } from 'react';
import { Alert } from 'react-native'
import {
    Container,
    Header,
    Left,
    Body,
    Right,
    Button,
    Icon,
    List,
    ListItem,
    Input,
    Content,
    Text,
    Form,
    Item,
    Spinner,
    Title,
    Label,
} from 'native-base';
import { Query ,Mutation} from 'react-apollo';

import ADD_SKILL from '../../graphql/add_skill.mutation'
import GET_ME from '../../graphql/get_me.query'
import { errorMessage ,trim} from '../../utils/tools';

export default class SkillSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: "main",
            name: "",
        };
    }

    _renderMain = (data) => (
       
        <List>
           <Button
            full
            style={{ marginHorizontal: 20, marginVertical: 15 }}
            onPress={() => {
                if(data.me.skills.length>=10) {
                    Alert.alert('最多添加10项技能')
                    return
                }
                this.setState({ display: "addSkill" })

            }}
        >
            <Text>添加技能</Text>
        </Button>
        <ListItem>
            <Left>
                <Text>技能名称</Text>
            </Left>
        </ListItem>
            {
                data.me.skills.map((skill,index)=> (
                    <ListItem key={index}>
                        <Left>
                            <Text>
                                {skill.name}
                            </Text>
                        </Left>
                    </ListItem>
                ))
            }
        </List>
    )

    _renderAddSkill = () => (
        <Form>
            <Item stackedLabel>
                <Label>技能名称</Label>
                <Input
                    placeholder="请输入你掌握技能的关键字"
                    value={this.state.name}
                    onChangeText={(text)=>this.setState({name:trim(text).toLowerCase()})}
                />
            </Item>
            <Mutation
                mutation={ADD_SKILL}
                update={(cache, { data: { addSkill } }) => {
                    const { me } = cache.readQuery({ query: GET_ME });
                    cache.writeQuery({
                        query: GET_ME,
                        data: { me: { ...me, skills: me.skills.concat([addSkill]) } },
                    });
                }}
            >
                {
                    addSkill => (
                        <Button
                            onPress={() => {
                                if (!/^[A-Za-z0-9\u4e00-\u9fa5]+/.test(this.state.name)) {
                                    Alert.alert('技能名称只能用英文、中文和数字')
                                    return
                                }
                                addSkill({ variables: {name:this.state.name} })
                                this.setState({ name: "",  display: "main" })
                            }}
                            full
                            style={{ marginHorizontal: 20, marginVertical: 15 }}
                        >
                            <Text>添加</Text>
                        </Button>
                    )
                }
            </Mutation>
        </Form>
    )

    _renderContent=(display,data)=>{
        if(display=="main"){
            return this._renderMain(data)
        }else if(display==="addSkill"){
            return this._renderAddSkill()
        }
    }

    render() {
        const {display} = this.state
        return (
            <Query query={GET_ME}>
                {
                    ({ loading, error, data }) => {
                        if (loading) return <Spinner />
                        if (error) return <Text>{errorMessage(error)}</Text>
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
                                        <Title>职业技能设置</Title>
                                    </Body>
                                    <Right />
                                </Header>
                                <Content>
                                   {this._renderContent(display,data)}
                                </Content>
                            </Container>
                        )
                    }
                }
            </Query>
        );
    }
}