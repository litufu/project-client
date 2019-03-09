import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo'
import {
    Container,
    Header,
    Content,
    List,
    Icon,
    ListItem,
    Title,
    Text,
    Left,
    Body,
    Right,
    Button,
    Spinner,
    FooterTab,
    Footer,
    Thumbnail,
} from 'native-base';

import GET_ME from '../../graphql/get_me.query'
import ADD_UPDATE_LOVESIGNUP from '../../graphql/add_loveSignUp.mutation'
import GET_LOVEMATCH from '../../graphql/get_loveMatching.query'
import { DateStartTime ,defaultAvatar} from '../../utils/settings'
import { errorMessage } from '../../utils/tools'

/**
 * 规则：
 * 首先检查用户是否报名（检查是否存在报名，且报名期间为当前期间）
 * 如果已经报名则将state中的status设置为1，没有报名为0，点击报名后status设置为1
 * 如果是星期五、星期六和星期日，无法报名，signup为false,否则signup为true
 * 当status为1或者signup为false，报名按钮为disabled,无法报名
 * 如果是周五晚上1点到5点，显示正在统计匹配结果。
 *  
 */

export default class FallInLove extends Component {

    constructor(props) {
        super(props);
        const { me } = props.navigation.getParam('data')
        const now = new Date()
        const phase = parseInt(`${(now.getTime() - DateStartTime.getTime()) / 1000 / 60 / 60 / 24 / 7}`) + 1
        let status
        if (me.signUpLove) {
            if (me.signUpLove.period === `${phase}`) {
                status = "1"
            } else {
                status = "0"
            }
        } else {
            status = "0"
        }
        this.state = {
            status
        }
    }

    render() {
        const { status } = this.state
        const week = new Date().getDay();
        let signUp
        if (week == 0 || week == 5 || week == 6) {
            signUp = false
        } else {
            signUp = true
        }
        const now = new Date()
        const phase = parseInt(`${(now.getTime() - DateStartTime.getTime()) / 1000 / 60 / 60 / 24 / 7}`) + 1
        const hour = now.getHours()
        return (
            <Query query={GET_ME}>
                {
                    ({ loading, error, data }) => {
                        if (loading) return <Spinner />
                        if (error) return <Text>{errorMessage(error)}</Text>
                        const me = data.me
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
                                        <Title>同城热恋</Title>
                                    </Body>
                                    <Right >
                                        <Button
                                            onPress={() => this.props.navigation.navigate('FallInLoveSettings', { me: data.me })}
                                            transparent
                                        >
                                            <Icon name='md-settings' type='Ionicons' />
                                        </Button>
                                    </Right>
                                </Header>
                                <Content>
                                    <List>
                                        <ListItem>
                                            <Text>{signUp ? `${data.me.residence ? `${data.me.residence.province.name}${data.me.residence.city.name}` : ""}相亲报名第${phase}期` : "本期报名已截止"}</Text>
                                        </ListItem>
                                        <Mutation
                                            mutation={ADD_UPDATE_LOVESIGNUP}
                                            update={(cache, { data: { addOrUpdateLoveSignUp } }) => {
                                                const { me } = cache.readQuery({ query: GET_ME });
                                                cache.writeQuery({
                                                    query: GET_ME,
                                                    data: { me: { ...me, signUpLove: addOrUpdateLoveSignUp } },
                                                });
                                            }}
                                        >
                                            {
                                                addOrUpdateLoveSignUp => {

                                                    return (
                                                        <Button
                                                            full
                                                            info
                                                            rounded
                                                            style={{ marginHorizontal: 20, marginVertical: 15 }}
                                                            disabled={!signUp || status !== "0"}
                                                            onPress={() => {

                                                                addOrUpdateLoveSignUp()
                                                                this.setState({ status: "1" })

                                                            }}
                                                        >
                                                            <Text>{status === "0" ? "参与报名" : "已报名"}</Text>
                                                        </Button>
                                                    )
                                                }
                                            }
                                        </Mutation>

                                        {signUp && (
                                            <List>
                                                <ListItem>
                                                    <Text>见面时间：周五公布结果</Text>
                                                </ListItem>
                                                <ListItem>
                                                    <Text>见面地点：周五公布结果</Text>
                                                </ListItem>
                                                <ListItem>
                                                    <Text>本期相亲对象：周五公布结果</Text>
                                                </ListItem>
                                            </List>
                                        )}

                                        {
                                            (!signUp && week === 5 && hour <= 5) && (
                                                <List>
                                                    <ListItem>
                                                        <Text>见面时间：正在统计分配结果，请稍等...</Text>
                                                    </ListItem>
                                                    <ListItem>
                                                        <Text>见面地点：正在统计分配结果，请稍等...</Text>
                                                    </ListItem>
                                                    <ListItem>
                                                        <Text>本期相亲对象：正在统计分配结果，请稍等...</Text>
                                                    </ListItem>
                                                </List>
                                            )
                                        }

                                        {
                                            (!signUp && !(week === 5 && hour <= 5)) && (
                                                <Query 
                                                query={GET_LOVEMATCH}
                                                fetchPolicy="cache-and-network"
                                                >
                                                    {
                                                        ({ loading, error, data }) => {
                                                            if (loading) return <Spinner />
                                                            if (error) return <Text>{errorMessage(error)}</Text>
                                                            const url = me.gender === "male" 
                                                                ? (data.loveMatch.woman.avatar?data.loveMatch.woman.avatar.url:defaultAvatar) 
                                                                : (data.loveMatch.man.avatar?data.loveMatch.man.avatar.url:defaultAvatar)
                                                            const name = me.gender === "male" ? data.loveMatch.woman.name : data.loveMatch.man.name
                                                            const height = me.gender === "male" ? data.loveMatch.woman.loveSetting.myHeight : data.loveMatch.man.loveSetting.myHeight
                                                            const weight = me.gender === "male" ? data.loveMatch.woman.loveSetting.myWeight : data.loveMatch.man.loveSetting.myWeight
                                                            const matcherId = me.gender === "male" ? data.loveMatch.woman.id : data.loveMatch.man.id
                                                            return (
                                                                <List>
                                                                    <ListItem>
                                                                        <Text>见面时间：{data.loveMatch.woman.loveSetting.dateTime}</Text>
                                                                    </ListItem>
                                                                    <ListItem>
                                                                        <Text>见面地点：{data.loveMatch.woman.loveSetting.datePlace}</Text>
                                                                    </ListItem>
                                                                    <ListItem 
                                                                    onPress={() => this.props.navigation.navigate('UserProfile', { id: matcherId, me })}
                                                                    thumbnail>
                                                                        <Left>
                                                                            <Thumbnail square source={{ uri: url }} />
                                                                        </Left>
                                                                        <Body>
                                                                            <Text>{name}</Text>
                                                                            <Text note numberOfLines={1}>{`身高：${height}cm 体重：${weight}公斤`}</Text>
                                                                        </Body>
                                                                        <Right>
                                                                            <Button 
                                                                            onPress={() => this.props.navigation.navigate('UserProfile', { id: matcherId, me })}
                                                                            transparent>
                                                                                <Text>查看</Text>
                                                                            </Button>
                                                                        </Right>
                                                                    </ListItem>

                                                                </List>
                                                            )
                                                        }
                                                    }

                                                </Query>
                                            )
                                        }
                                    </List>
                                </Content>
                                <Footer>
                                    <FooterTab style={{ backgroundColor: 'white' }}>
                                        <Button
                                            full
                                            transparent
                                            onPress={() => this.props.navigation.navigate('FallInLoveRules')}
                                        >
                                            <Text style={{ fontSize: 14 }}>
                                                规则和建议
                                </Text>
                                        </Button>
                                    </FooterTab>
                                </Footer>
                            </Container>
                        )
                    }
                }
            </Query>
        );
    }
}