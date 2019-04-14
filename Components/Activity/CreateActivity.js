import React, { Component } from 'react';
import { Alert, Image, TouchableHighlight, StyleSheet, View } from 'react-native'
import { Query, Mutation } from 'react-apollo'
import {
    Container,
    Header,
    Content,
    List,
    ListItem,
    Text,
    Left,
    Right,
    Icon,
    Body,
    Item,
    Form,
    Title,
    Input,
    Button,
    Spinner
} from 'native-base';
import validator from 'validator'
import { Stepper, ActionSheet } from 'teaset'
import { ImagePicker } from 'expo';

import MyDatetime from '../MyDatetime'
import { trim,errorMessage,checkCnEnNum } from '../../utils/tools'

import ACTIVITYTYPES from '../../graphql/get_activityTypes.query'
import POST_ACTIVITYPHOTO from '../../graphql/post_activityPhoto.mutation'
import ADD_ACTIVITY from '../../graphql/add_activity.mutation'
import GET_ME from '../../graphql/get_me.query'

export default class CreateActivity extends Component {
    state = {
        display: "main",
        title: "",
        startTime: new Date(),
        endTime: new Date(),
        location: "",
        content: "",
        number: 3,
        type: {},
        image: null,
        selectedType: "",
        imageId: "",
        imageName:"",
    }


    _uploadImage = () => (
        <Mutation
            mutation={POST_ACTIVITYPHOTO}
            onCompleted={(data) => this.setState({ imageId: data.postActivityPhoto.id ,imageName:data.postActivityPhoto.name})}
        >
            {
                (postActivityPhoto, { loading, error, data }) => {
                    if (loading) return <Spinner />
                    if (error) return <Text>{error.message}</Text>

                    if (data) {
                        const xhr = new XMLHttpRequest()
                        xhr.open('PUT', data.postActivityPhoto.url)
                        xhr.onreadystatechange = function () {
                            if (xhr.readyState === 4) {
                                if (xhr.status === 200) {
                                    console.log('Image successfully uploaded to oss')
                                } else {
                                    console.log('Error while sending the image to oss')
                                }
                            }
                        }
                        xhr.setRequestHeader('Content-Type', 'image/jpeg')
                        xhr.send({ uri: this.state.image, type: 'image/jpeg', name: data.postActivityPhoto.name })

                        return (
                            <TouchableHighlight
                                onPress={() => this.onPressImage(postActivityPhoto)}
                            >
                                <Image source={{ uri: `https://gewu-avatar.oss-cn-hangzhou.aliyuncs.com/activity/${data.postActivityPhoto.name}` }} style={{ height: 60, width: 60 }} />
                            </TouchableHighlight>
                        )

                    }

                    return (
                        <TouchableHighlight
                            onPress={() => this.onPressImage(postActivityPhoto)}
                        >
                            <Text>上传照片</Text>
                        </TouchableHighlight>
                    )
                }
            }
        </Mutation>

    )

    _pickImage = async (postPhoto) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
        });
        this.setState({ image: result.uri })
        if (!result.cancelled) {
            const data = await postPhoto(
                {
                    variables: { uri: result.uri },
                })
             this.setState({ imageId: data.postActivityPhoto.id })
        }
    };

    onPressImage = (postPhoto) => {
        let items = [
            { title: '从相册选取照片', onPress: async () => await this._pickImage(postPhoto) },
        ];
        let cancelItem = { title: '取消' };
        ActionSheet.show(items, cancelItem);
    }

    _renderMain = () => (
        <Content>
            <List>
                <ListItem
                    onPress={() => this.setState({ display: "title" })}
                >
                    <Left style={styles.left}>
                        <Text>标题</Text>
                    </Left>
                    <Right style={styles.right}>
                        <Text>{`${this.state.title.length>5?this.state.title.slice(0, 5):this.state.title}...`}</Text>
                    </Right>
                </ListItem>
                <ListItem>
                    <Left style={styles.left}>
                        <Text>开始时间</Text>
                    </Left>
                    <Right style={styles.right}>
                        <MyDatetime
                            showtime={true}
                            handleDate={(date) => this.setState({ startTime: date })}
                        />
                    </Right>
                </ListItem>
                <ListItem>
                    <Left style={styles.left}>
                        <Text>结束时间</Text>
                    </Left>
                    <Right style={styles.right}>
                        <MyDatetime
                            showtime={true}
                            handleDate={(date) => this.setState({ endTime: date })}
                        />
                    </Right>
                </ListItem>
                <ListItem
                >
                    <Left>
                        <Text>人数</Text>
                    </Left>
                    <Right >
                        <Stepper
                            style={{ height: 30, marginVertical: 5 }}
                            defaultValue={3}
                            min={3}
                            max={30}
                            value={parseInt(this.state.number)}
                            onChange={(value) => this.setState({ number: parseInt(value) })}
                        />
                    </Right>
                </ListItem>
                <ListItem
                    onPress={() => this.setState({ display: "location" })}
                >
                    <Left style={styles.left}>
                        <Text>地点</Text>
                    </Left>
                    <Right style={styles.right}>
                        <Text>{`${this.state.location.length>5?this.state.location.slice(0, 5):this.state.location}...`}</Text>
                    </Right>
                </ListItem>
                <ListItem
                    onPress={() => this.setState({ display: "type" })}
                >
                    <Left style={styles.left}>
                        <Text>活动类型</Text>
                    </Left>
                    <Right style={styles.right}>
                        <Text>{this.state.type.second ? this.state.type.second : "..."}</Text>
                    </Right>
                </ListItem>
                <ListItem
                    // onPress={() => this.setState({ display: "type" })}
                >
                    <Left >
                        <Text>活动海报</Text>
                    </Left>
                    <Right>
                        {this.state.imageName 
                        ? (
                            <Image source={{ uri: `https://gewu-avatar.oss-cn-hangzhou.aliyuncs.com/activity/${this.state.imageName}` }} style={{ height: 60, width: 60 }} />
                        )
                        : this._uploadImage()
                        }
                    </Right>
                </ListItem>
                <ListItem
                  
                    onPress={() => this.setState({ display: "content" })}
                >
                    <Left   style={styles.left}>
                        <Text>内容</Text>
                    </Left>
                    <Right   style={styles.right}>
                         <Text>{`${this.state.content.length>5?this.state.content.slice(0, 5):this.state.content}...`}</Text>
                    </Right>
                </ListItem>
            </List>
            <Mutation
                mutation={ADD_ACTIVITY}
                onError={(error)=>Alert.alert(errorMessage(error))}
                update={(cache, { data: { addActivity } }) => {
                    const { me } = cache.readQuery({ query: GET_ME });
                    cache.writeQuery({
                        query: GET_ME,
                        data: { me: { ...me, activities: me.activities.concat([addActivity]) } },
                    });
                }}
                onCompleted={() => Alert.alert('提交完成')}
            >
                {
                    (addActivity, { loading, error, data }) => {

                        return (
                            <Button
                                full
                                rounded
                                disabled={loading?true:false}
                                style={{ marginHorizontal: 20, marginVertical: 15 }}
                                onPress={() => {
                                    const { startTime, endTime, title, content, imageId, number, type, location } = this.state
                                    if (validator.isEmpty(this._checkData())) {
                                        addActivity({
                                            variables: {
                                                startTime,
                                                endTime,
                                                title,
                                                content,
                                                imageId,
                                                number,
                                                typeId: type.id,
                                                location
                                            }
                                        })
                                    } else {
                                        Alert.alert(this._checkData())
                                        return
                                    }
                                }}
                            >
                                <Text>{loading ? "提交中" : "确认提交"}</Text>
                            </Button>
                        )
                    }
                }

            </Mutation>
            <View style={{flexDirection:"row",paddingHorizontal:15,marginVertical:10,}}>
            <Text>创建活动代表同意</Text>
            <TouchableHighlight
                onPress={() => this.props.navigation.navigate('ActivityRules')}
            >
                <Text
                    style={{ color: 'blue' }}
                >活动规则</Text>
            </TouchableHighlight>
            </View>
        </Content>
    )

    _checkData = () => {
        const { startTime, endTime, title, content, imageId, number, type, location } = this.state
        if (!validator.toDate(`${startTime}`)) {
            return "未选择开始日期"
        }
        if (!validator.toDate(`${endTime}`)) {
            return "未选择结束日期"
        }
        if (validator.toDate(`${startTime}`) > validator.toDate(`${endTime}`)) {
            return "开始日期大于结束日期"
        }
        if (!validator.isInt(`${number}`)) {
            return "人数错误"
        }
        if (validator.isEmpty(title)) {
            return "标题不能为空"
        }
        if (validator.isEmpty(content)) {
            return "内容不能为空"
        }
        if (validator.isEmpty(location)) {
            return "地址不能为空"
        }
        if (!type.id) {
            return "未选择类型"
        }
        if (validator.isEmpty(imageId)) {
            return "未上传图像"
        }
        return ""

    }

    _renderTitle = () => (
        <Content>
            <Form>
                <Item >
                    <Input
                        placeholder="请输入标题"
                        onChangeText={(text) => this.setState({ title: trim(text) })}
                        value={this.state.title}
                        maxLength={20}
                    />
                </Item>
                <View style={{ marginVertical: 10, padding: 10 }}>
                    <Text>长度在5-20之间,标题仅限中文、英文和数字</Text>
                </View>
                {
                    !!this.state.title && (
                        <Button
                            full
                            rounded
                            style={{ marginHorizontal: 20, marginVertical: 15 }}
                            onPress={() => {
                                if (!validator.isLength(this.state.title, { min: 5, max: 20 })) {
                                    Alert.alert('长度必须在5-20之间')
                                    return
                                }else if(!checkCnEnNum(this.state.title)){
                                    Alert.alert('格式必须为中文、英文或数字')
                                    return
                                }
                                this.setState({ display: "main" })
                            }}
                        >
                            <Text>确认</Text>
                        </Button>
                    )
                }

            </Form>
        </Content>
    )

    _renderActivityContent = () => (
        <Content>
            <Form>
                <Item >
                    <Input
                        placeholder="请输入活动内容"
                        onChangeText={(text) => this.setState({ content: trim(text) })}
                        value={this.state.content}
                        maxLength={500}
                        multiline={true}
                        numberOfLines={10}
                    />
                </Item>
                <View style={{ marginVertical: 10, padding: 10 }}>
                    <Text>长度在5-500字之间</Text>
                </View>
                {
                    !!this.state.content && (
                        <Button
                            full
                            rounded
                            style={{ marginHorizontal: 20, marginVertical: 15 }}
                            onPress={() => {
                                if (!validator.isLength(this.state.content, { min: 5, max: 500 })) {
                                    Alert.alert('长度必须在5-500之间')
                                    return
                                }
                                this.setState({ display: "main" })
                            }}
                        >
                            <Text>确认</Text>
                        </Button>
                    )
                }
                
            </Form>
        </Content>
    )

    _renderLocation = (me) => (
        <Content>
            <Form>
                <Item style={{ marginVertical: 10, padding: 5 }}>
                    <Text>{`${me.residence.province.name}${me.residence.city.name}`}</Text>
                </Item>
                <Item >
                    <Input
                        placeholder="请输入活动具体地点"
                        onChangeText={(text) => this.setState({ location: trim(text) })}
                        value={this.state.location}
                    />
                </Item>
                {
                    !!this.state.location && (
                        <Button
                            full
                            rounded
                            style={{ marginHorizontal: 20, marginVertical: 15 }}
                            onPress={() => {
                                this.setState({ display: "main" })
                            }}
                        >
                            <Text>确认</Text>
                        </Button>
                    )
                }

            </Form>
        </Content>
    )

    _renderType = () => (
        <Query query={ACTIVITYTYPES}>
            {
                ({ loading, error, data }) => {
                    if (loading) return <Spinner />
                    if (error) return <Text>{errorMessage(error)}</Text>
                    const activityTypes = data.activityTypes
                    const activityTypesSet = new Set(activityTypes.map(type => type.first))
                    const firstTypes = [...activityTypesSet]
                    return (
                        <Content>
                            {
                                firstTypes.map((type, index) => (
                                    <List key={index}>
                                        <ListItem
                                            itemDivider
                                        >
                                            <Text>{type}</Text>
                                        </ListItem>
                                        {
                                            activityTypes.filter(activeType => activeType.first === type).map((activeType, index) => (
                                                <ListItem
                                                    key={index}
                                                    onPress={() => this.setState({ type: activeType, display: "main" })}
                                                >
                                                    <Text
                                                        key={index}
                                                    >
                                                        {activeType.second}
                                                    </Text>
                                                </ListItem>
                                            ))
                                        }
                                    </List>
                                ))
                            }
                        </Content>
                    )
                }
            }
        </Query>
    )


    _renderContent = (me) => {
        const { display } = this.state
        if (display === "main") {
            return this._renderMain()
        } else if (display === "title") {
            return this._renderTitle()
        } else if (display === "content") {
            return this._renderActivityContent()
        } else if (display === "location") {
            return this._renderLocation(me)
        } else if (display === "type") {
            return this._renderType()
        }
    }

    render() {
        const data = this.props.navigation.getParam('data')
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
                        <Title>创建活动</Title>
                    </Body>
                    <Right >
                    </Right>
                </Header>
                {
                    this._renderContent(me)
                }
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    left: { flex: 0.3 },
    right: { flex: 0.7 }
})