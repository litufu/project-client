import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo'
import { Alert } from 'react-native'
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
import validator from 'validator';

import GET_ME from '../../graphql/get_me.query'
import ADD_UPDATE_LOVESIGNUP from '../../graphql/add_loveSignUp.mutation'
import GET_LOVEMATCH from '../../graphql/get_loveMatching.query'
import { DateStartTime, defaultAvatar } from '../../utils/settings'
import { getTimeByTimeZone } from '../../utils/tools'
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

    checkBasicInfo = (me) => {
        if (!me.loveSetting) {
            Alert.alert('提示', '请在报名页面右上角，点击设置，填写身高、体重等基本信息')
            return false
        }
        const birthday = new Date(me.birthday)
        const d = new Date()
        const age = d.getFullYear() - birthday.getFullYear() - ((d.getMonth() < birthday.getMonth() || d.getMonth() === birthday.getMonth() && d.getDate() < birthday.getDate()) ? 1 : 0);
        if (age < 18) {
            Alert.alert('未超过18岁不能报名！')
            return false
        }

        if (!validator.isInt(`${me.loveSetting.myHeight}`) || me.loveSetting.myHeight === 0) {
            Alert.alert('请在报名页由上表设置中填写身高信息')
            return false
        }
        if (!validator.isInt((`${me.loveSetting.myWeight}`)) || me.loveSetting.myWeight === 0) {
            Alert.alert('请在报名页由上表设置中填写体重信息')
            return false
        }
        if (!validator.isInt((`${me.loveSetting.otherHeightMin}`)) || me.loveSetting.otherHeightMin === 0) {
            Alert.alert('请在报名页由上表设置中填写要求对方最低身高信息')
            return false
        }
        if (!validator.isInt((`${me.loveSetting.otherHeightMax}`)) || me.loveSetting.otherHeightMax === 0) {
            Alert.alert('请在报名页由上表设置中填写要求对方最高身高信息')
            return false
        }
        if (!validator.isInt((`${me.loveSetting.otherWeightMin}`)) || me.loveSetting.otherWeightMin === 0) {
            Alert.alert('请在报名页由上表设置中填写要求对方最小体重信息')
            return false
        }
        if (!validator.isInt((`${me.loveSetting.otherWeightMax}`)) || me.loveSetting.otherWeightMax === 0) {
            Alert.alert('请在报名页由上表设置中填写要求对方最大体重信息')
            return false
        }
        if (!validator.isInt((`${me.loveSetting.otherAgeMin}`)) || me.loveSetting.otherAgeMin === 0) {
            Alert.alert('请在报名页由上表设置中填写要求对方最小年龄信息')
            return false
        }
        if (!validator.isInt((`${me.loveSetting.otherAgeMax}`)) || me.loveSetting.otherAgeMax === 0) {
            Alert.alert('请在报名页由上表设置中填写要求对方最大年龄信息')
            return false
        }
        if (me.gender === 'female') {
            if (!/^[A-Za-z0-9\u4e00-\u9fa5]+/.test(me.loveSetting.dateTime) || me.loveSetting.dateTime === "") {
                Alert.alert('请在报名页由上表设置中填写要求见面时间信息')
                return false
            }
            if (!/^[A-Za-z0-9\u4e00-\u9fa5]+/.test(me.loveSetting.datePlace || me.loveSetting.datePlace === "")) {
                Alert.alert('请在报名页由上表设置中填写要求见面地点信息')
                return false
            }
        }

        return true

    }

    render() {
        const { status } = this.state
        const now = getTimeByTimeZone(8)
        const week = now.getDay();
        let signUp
        if (week == 0 || week == 5 || week == 6) {
            signUp = false
        } else {
            signUp = true
        }
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
                                                (addOrUpdateLoveSignUp, { loading, error }) => {

                                                    return (
                                                        <Button
                                                            full
                                                            info
                                                            rounded
                                                            style={{ marginHorizontal: 20, marginVertical: 15 }}
                                                            disabled={!signUp || status !== "0"}
                                                            onPress={async () => {
                                                                if (this.checkBasicInfo(me)) {
                                                                    await addOrUpdateLoveSignUp()
                                                                    this.setState({ status: "1" })
                                                                }
                                                            }}
                                                        >
                                                            {loading
                                                                ? <Text>报名中...</Text>
                                                                : (
                                                                    <Text>{status === "0"
                                                                        ? "参与报名"
                                                                        : "已报名"
                                                                    }</Text>
                                                                )
                                                            }
                                                            {error && Alert.alert(errorMessage(error))}
                                                        </Button>
                                                    )
                                                }
                                            }
                                        </Mutation>

                                        {(signUp && status !== "0") && (
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
                                            (!signUp && week === 5 && hour <= 5 && status !== "0") && (
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
                                            (!signUp && !(week === 5 && hour <= 5) && status !== "0") && (
                                                <Query
                                                    query={GET_LOVEMATCH}
                                                    fetchPolicy="cache-and-network"
                                                >
                                                    {
                                                        ({ loading, error, data }) => {
                                                            if (loading) return <Spinner />
                                                            if (error) return <Text>{errorMessage(error)}</Text>
                                                            let person
                                                            if(data.loveMatch){
                                                                if (me.gender === "male" ) {
                                                                    person = data.loveMatch.woman
                                                                } else {
                                                                    person = data.loveMatch.man
                                                                }
                                                            }
                                                            if (person) {
                                                                const url = person.avatar ? person.avatar.url : defaultAvatar
                                                                const name = person.name
                                                                const height = person.loveSetting.myHeight
                                                                const weight = person.loveSetting.myWeight
                                                                const matcherId = person.id
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
                                                            } else {
                                                                return (
                                                                    <ListItem>
                                                                        <Text>本次未能匹配成功！下周一再报名试一下吧。放宽要求条件或办理会员可以提高匹配成功率。
                                                                            会员等级越高，匹配成功率越高。</Text>
                                                                    </ListItem>
                                                                )
                                                            }

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