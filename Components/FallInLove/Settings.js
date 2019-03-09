import React, { Component } from 'react';
import { TouchableHighlight, Alert } from 'react-native'
import { Mutation, Query } from 'react-apollo'
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
    Input,
    Item,
    Form,
    Label
} from 'native-base';
import validator from 'validator';
import GET_ME from '../../graphql/get_me.query'
import ADD_UPDATE_LOVESETTING from '../../graphql/add_loveSetting.mutation'

export default class Trade extends Component {

    constructor(props) {
        super(props);
        const me = props.navigation.getParam('me')
        this.state={
            myHeight: me.loveSetting.myHeight || "",
            myWeight: me.loveSetting.myWeight ||"",
            otherHeightMin: me.loveSetting.otherHeightMin ||"",
            otherHeightMax: me.loveSetting.otherHeightMax ||"",
            otherWeightMin: me.loveSetting.otherWeightMin ||"",
            otherWeightMax: me.loveSetting.otherWeightMax ||"",
            otherAgeMin: me.loveSetting.otherAgeMin ||"",
            otherAgeMax: me.loveSetting.otherAgeMax ||"",
            dateTime: me.loveSetting.dateTime ||"",
            datePlace: me.loveSetting.datePlace ||"",
            display: "main",
        }
      }

    _renderMain = (data) => {
        const { myHeight, myWeight, otherAgeMin, otherAgeMax, otherHeightMax,
            otherHeightMin, otherWeightMax, otherWeightMin, dateTime, datePlace,
        } = this.state
        
        return (
            <Content>
                <List>
                    <ListItem itemDivider>
                        <Text>我的条件</Text>
                    </ListItem>
                    <ListItem>
                        <Left>
                            <Text>身高</Text>
                        </Left>
                        <Right>
                            <TouchableHighlight
                                onPress={() => this.setState({ display: "myHeight" })}
                            >
                                <Text>
                                    {myHeight === "" ? "未填写" : `${myHeight}厘米`}
                                </Text>
                            </TouchableHighlight>
                        </Right>
                    </ListItem>
                    <ListItem>
                        <Left>
                            <Text>体重</Text>
                        </Left>
                        <Right>
                            <TouchableHighlight
                                onPress={() => this.setState({ display: "myWeight" })}
                            >
                                <Text>
                                    {myWeight === "" ? "未填写" : `${myWeight}公斤`}
                                </Text>
                            </TouchableHighlight>
                        </Right>
                    </ListItem>
                    <ListItem itemDivider>
                        <Text>要求对方的条件</Text>
                    </ListItem>
                    <ListItem style={{flex:1}} >
                        <Left>
                            <Text>身高</Text>
                        </Left>
                        <Right style={{flex:0.4}}>
                            <TouchableHighlight
                                onPress={() => this.setState({ display: "otherHeight" })}
                            >
                                <Text>
                                    {otherHeightMin === "" ? "未填写" : `${otherHeightMin}-${otherHeightMax}厘米`}
                                </Text>
                            </TouchableHighlight>
                        </Right>
                    </ListItem>
                    <ListItem>
                        <Left>
                            <Text>体重</Text>
                        </Left>
                        <Right>
                            <TouchableHighlight
                                onPress={() => this.setState({ display: "otherWeight" })}
                            >
                                <Text>
                                    {otherWeightMin === "" ? "未填写" : `${otherWeightMin}-${otherWeightMax}公斤`}
                                </Text>
                            </TouchableHighlight>
                        </Right>
                    </ListItem>
                    <ListItem>
                        <Left>
                            <Text>年龄</Text>
                        </Left>
                        <Right>
                            <TouchableHighlight
                                onPress={() => this.setState({ display: "otherAge" })}
                            >
                                <Text>
                                    {otherAgeMin === "" ? "未填写" : `${otherAgeMin}-${otherAgeMax}岁`}
                                </Text>
                            </TouchableHighlight>
                        </Right>
                    </ListItem>
                    {
                        data.me.gender === "female" && (
                            <List>
                                <ListItem itemDivider>
                                    <Text>约定见面时间和地点</Text>
                                </ListItem>
                                <ListItem>
                                    <Left>
                                        <Text>时间</Text>
                                    </Left>
                                    {
                                        !datePlace 
                                        ? (<Right>
                                            <TouchableHighlight
                                            onPress={() => this.setState({ display: "dateTime" })}
                                        >
                                            <Text>
                                                 未填写
                                            </Text>
                                        </TouchableHighlight>
                                        </Right>)
                                        :(
                                            <TouchableHighlight
                                            onPress={() => this.setState({ display: "dateTime" })}
                                        >
                                            <Text>
                                                {dateTime}
                                            </Text>
                                        </TouchableHighlight>
                                        )
                                    }
                                </ListItem>
                                <ListItem>
                                    <Left>
                                        <Text>地点</Text>
                                    </Left>
                                    {
                                        !datePlace 
                                        ? (<Right>
                                            <TouchableHighlight
                                            onPress={() => this.setState({ display: "datePlace" })}
                                        >
                                            <Text>
                                                 未填写
                                            </Text>
                                        </TouchableHighlight>
                                        </Right>)
                                        :(
                                            <TouchableHighlight
                                            onPress={() => this.setState({ display: "datePlace" })}
                                        >
                                            <Text>
                                                {datePlace}
                                            </Text>
                                        </TouchableHighlight>
                                        )
                                    }
                                        
                                </ListItem>
                            </List>
                        )
                    }

                </List>
            </Content>
        )
    }

    _renderMyHeight = () => (
        <Content>
            <Form>
                <Item stackedLabel>
                    <Label>你的身高</Label>
                    <Input
                        placeholder="请输入你的身高,单位为厘米"
                        value={this.state.myHeight}
                        onChangeText={text => this.setState({ myHeight: text })}
                    />
                </Item>
            </Form>


            <Button
                full
                rounded 
                style={{ marginHorizontal: 20, marginVertical: 15 }}
                onPress={() => {
                    if (validator.isInt(this.state.myHeight)) {
                        this.setState({ display: "main" })
                    } else {
                        Alert.alert('身高必须为整数')
                        return
                    }
                }}
            >
                <Text>确认</Text>
            </Button>
        </Content>
    )

    _renderMyWeight = () => (
        <Content>
            <Item stackedLabel>
                <Label>你的体重</Label>
                <Input
                    placeholder="请输入你的体重,单位为公斤"
                    value={this.state.myWeight}
                    onChangeText={text => this.setState({ myWeight: text })}
                />
            </Item>

            <Button
                full
                rounded 
                style={{ marginHorizontal: 20, marginVertical: 15 }}
                onPress={() => {
                    if (validator.isInt(this.state.myWeight)) {
                        this.setState({ display: "main" })
                    } else {
                        Alert.alert('体重必须为整数')
                        return
                    }
                }}
            >
                <Text>确认</Text>
            </Button>
        </Content>
    )

    _renderOtherHeight = () => (
        <Content>
            <Item stackedLabel>
                <Label>希望对方的最低身高</Label>
                <Input
                    placeholder="请输入你希望对方的最低身高，单位厘米"
                    value={this.state.otherHeightMin}
                    onChangeText={text => this.setState({ otherHeightMin: text })}
                />
            </Item>
            <Item stackedLabel>
                <Label>希望对方的最高身高</Label>
                <Input
                    placeholder="请输入你希望对方的最高身高，单位厘米"
                    value={this.state.otherHeightMax}
                    onChangeText={text => this.setState({ otherHeightMax: text })}
                />
            </Item>

            <Button
                full
                rounded 
                style={{ marginHorizontal: 20, marginVertical: 15 }}
                onPress={() => {
                    if (
                        validator.isInt(this.state.otherHeightMin) &&
                        validator.isInt(this.state.otherHeightMax) &&
                        parseInt(this.state.otherHeightMax) > parseInt(this.state.otherHeightMin)
                    ) {
                        this.setState({ display: "main" })
                    } else {
                        Alert.alert('输入的身高必须为整数,且最高身高应大于最低身高')
                        return
                    }
                }}
            >
                <Text>确认</Text>
            </Button>
        </Content>
    )

    _renderOtherWeight = () => (
        <Content>
            <Item stackedLabel>
                <Label>希望对方的最小体重</Label>
                <Input
                    placeholder="请输入你希望对方的最小体重，单位公斤"
                    value={this.state.otherWeightMin}
                    onChangeText={text => this.setState({ otherWeightMin: text })}
                />
            </Item>

            <Item stackedLabel>
                <Label>希望对方的最大体重</Label>
                <Input
                    placeholder="请输入你希望对方的最大体重，单位公斤"
                    value={this.state.otherWeightMax}
                    onChangeText={text => this.setState({ otherWeightMax: text })}
                />
            </Item>

            <Button
                full
                rounded 
                style={{ marginHorizontal: 20, marginVertical: 15 }}
                onPress={() => {
                    if (
                        validator.isInt(this.state.otherWeightMin) &&
                        validator.isInt(this.state.otherWeightMax) &&
                        parseInt(this.state.otherWeightMax) > parseInt(this.state.otherWeightMin)
                    ) {
                        this.setState({ display: "main" })
                    } else {
                        Alert.alert('输入的体重必须为整数,且最大体重应大于最小体重')
                        return
                    }
                }}
            >
                <Text>确认</Text>
            </Button>
        </Content>
    )

    _renderOtherAge = () => (
        <Content>
            <Item stackedLabel>
                <Label>希望对方的最小年龄</Label>
                <Input
                    placeholder="请输入你希望对方的最小年龄"
                    value={this.state.otherAgeMin}
                    onChangeText={text => this.setState({ otherAgeMin: text })}
                />
            </Item>
            <Item stackedLabel>
                <Label>希望对方的最大年龄</Label>
                <Input
                    placeholder="请输入你希望对方的最大年龄"
                    value={this.state.otherAgeMax}
                    onChangeText={text => this.setState({ otherAgeMax: text })}
                />
            </Item>

            <Button
                full
                rounded 
                style={{ marginHorizontal: 20, marginVertical: 15 }}
                onPress={() => {
                    if (
                        validator.isInt(this.state.otherAgeMin) &&
                        validator.isInt(this.state.otherAgeMax) &&
                        parseInt(this.state.otherAgeMax) > parseInt(this.state.otherAgeMin)
                    ) {
                        this.setState({ display: "main" })
                    } else {
                        Alert.alert('输入的年龄必须为整数,且最大年龄应大于最小年龄')
                        return
                    }
                }}
            >
                <Text>确认</Text>
            </Button>
        </Content>
    )

    _renderDateTime = () => (
        <Content>
            <Item stackedLabel>
                <Label>希望的见面时间</Label>
                <Input
                    placeholder="请输入你希望的见面时间"
                    value={this.state.dateTime}
                    onChangeText={text => this.setState({ dateTime: text })}
                />
                <Text>时间建议为周六或周日上午8点到晚上6点之间,如“周六上午10点”</Text>
            </Item>

            <Button
                full
                rounded 
                style={{ marginHorizontal: 20, marginVertical: 15 }}
                onPress={() => {
                    if (/^[A-Za-z0-9\u4e00-\u9fa5]+/.test(this.state.dateTime)) {
                        this.setState({ display: "main" })
                    } else {
                        Alert.alert('格式只能含有汉字、数字和英文')
                        return
                    }
                }}
            >
                <Text>确认</Text>
            </Button>
        </Content>
    )

    _renderDatePlace = () => (
        <Content>
            <Item stackedLabel>
                <Label>希望的见面地点</Label>
                <Input
                    placeholder="请输入你希望的见面地点"
                    value={this.state.datePlace}
                    onChangeText={text => this.setState({ datePlace: text })}
                />
                <Text>时间应为周六或周日上午8点到晚上6点之间,如“周六上午10点”</Text>
            </Item>

            <Button
                full
                rounded 
                style={{ marginHorizontal: 20, marginVertical: 15 }}
                onPress={() => {
                    if (/^[A-Za-z0-9\u4e00-\u9fa5]+/.test(this.state.datePlace)) {
                        this.setState({ display: "main" })
                    } else {
                        Alert.alert('格式只能含有汉字、数字和英文')
                        return
                    }
                }}
            >
                <Text>确认</Text>
            </Button>
        </Content>
    )

    _renderContent = (data) => {
        if (this.state.display === "main") {
            return this._renderMain(data)
        } else if (this.state.display === "myHeight") {
            return this._renderMyHeight()
        } else if (this.state.display === "myWeight") {
            return this._renderMyWeight()
        } else if (this.state.display === "otherHeight") {
            return this._renderOtherHeight()
        } else if (this.state.display === "otherWeight") {
            return this._renderOtherWeight()
        } else if (this.state.display === "otherAge") {
            return this._renderOtherAge()
        } else if (this.state.display === "dateTime") {
            return this._renderDateTime()
        } else if (this.state.display === "datePlace") {
            return this._renderDatePlace()
        }
    }



    render() {
        const { myHeight, myWeight, otherAgeMin, otherAgeMax, otherHeightMax,
            otherHeightMin, otherWeightMax, otherWeightMin, dateTime, datePlace, display
        } = this.state
        return (
            <Query query={GET_ME}>
                {
                    ({ loading, error, data }) => {
                        if (loading) return <Spinner />
                        if (error) return <Text>未能正确加载</Text>
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
                                        <Title>同城热恋-设置</Title>
                                    </Body>
                                    <Right>
                                        <Mutation
                                            mutation={ADD_UPDATE_LOVESETTING}
                                            update={(cache, { data: { addOrUpdateLoveSetting } }) => {
                                                const { me } = cache.readQuery({ query: GET_ME });
                                                cache.writeQuery({
                                                    query: GET_ME,
                                                    data: { me: { ...me, loveSetting: addOrUpdateLoveSetting } },
                                                });
                                            }}
                                        >
                                            {
                                                addOrUpdateLoveSetting => {
                                                    return (
                                                        <Button
                                                            transparent
                                                            onPress={() => {
                                                                if (myHeight === "") {
                                                                    Alert.alert('你尚未输入身高')
                                                                    return
                                                                }
                                                                if (myWeight === "") {
                                                                    Alert.alert('你尚未输入体重')
                                                                    return
                                                                }
                                                                if (otherHeightMax === "") {
                                                                    Alert.alert('你尚未输入希望对方最高身高')
                                                                    return
                                                                }
                                                                if (otherHeightMin === "") {
                                                                    Alert.alert('你尚未输入希望对方最低身高')
                                                                    return
                                                                }
                                                                if (otherWeightMin === "") {
                                                                    Alert.alert('你尚未输入希望对方最小体重')
                                                                    return
                                                                }
                                                                if (otherWeightMax === "") {
                                                                    Alert.alert('你尚未输入希望对方最大体重')
                                                                    return
                                                                }
                                                                if (otherAgeMin === "") {
                                                                    Alert.alert('你尚未输入希望对方最小年龄')
                                                                    return
                                                                }
                                                                if (otherAgeMax === "") {
                                                                    Alert.alert('你尚未输入希望对方最大年龄')
                                                                    return
                                                                }
                                                                if (data.me.gender === "female") {
                                                                    if (dateTime === "") {
                                                                        Alert.alert('你尚未输入希望的见面时间')
                                                                        return
                                                                    }
                                                                    if (datePlace === "") {
                                                                        Alert.alert('你尚未输入希望的见面地点')
                                                                        return
                                                                    }
                                                                }
                                                                addOrUpdateLoveSetting({
                                                                    variables: {
                                                                        myHeight: parseInt(myHeight),
                                                                        myWeight: parseInt(myWeight),
                                                                        otherHeightMin: parseInt(otherHeightMin),
                                                                        otherHeightMax: parseInt(otherHeightMax),
                                                                        otherWeightMin: parseInt(otherWeightMin),
                                                                        otherWeightMax: parseInt(otherWeightMax),
                                                                        otherAgeMin:parseInt(otherAgeMin),
                                                                        otherAgeMax:parseInt(otherAgeMax),
                                                                        dateTime,
                                                                        datePlace
                                                                    }
                                                                })
                                                                this.props.navigation.goBack()
                                                            }}
                                                        >
                                                            <Text>{display === "main" ? "确认" : ""}</Text>
                                                        </Button>
                                                    )
                                                }
                                            }
                                        </Mutation>
                                    </Right>
                                </Header>
                                {this._renderContent(data)}
                            </Container>
                        )
                    }
                }
            </Query>
        );
    }
}

