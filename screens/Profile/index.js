import React, { Component } from 'react';
import { Query } from 'react-apollo'
import { NetInfo ,Alert} from 'react-native'
import {
    Container,
    Header,
    Content,
    List,
    ListItem,
    Text,
    Icon,
    Left,
    Body,
    Right,
    Thumbnail,
    Button,
    Title
} from 'native-base';
import { Divider } from 'react-native-elements'

import { headerBackgroundColor, headerFontColor, statusBarHeight, headerButtonColor } from '../../utils/settings'
import { defaultAvatar } from '../../utils/settings'
import { checkBasicInfo } from '../../utils/tools'
import GET_ME from '../../graphql/get_me.query';
import GET_FEESETTINGS from '../../graphql/get_feeSettings.query'

export default class ProfileScreen extends Component {

    static navigationOptions = {
        header: null,
    };

    state = {
        connectionType: null,
    }

    async componentDidMount() {
        this.subscription = NetInfo.addEventListener(
            'connectionChange',
            this.handleChange,
        );

        const { type } = await NetInfo.getConnectionInfo();

        this.setState({ connectionType: type });
    }

    componentWillUnmount() {
        this.subscription.remove();
    }

    handleChange = connectionType => {
        this.setState({ connectionType });
    };

    _renderContent = () => (
        <Content>
            <Query
                query={GET_ME}>
                {
                    ({ loading, error, data }) => {

                        if (loading) return <Spinner />
                        if (error) return <Text>{errorMessage(error)}</Text>
                        const me = data.me
                        if (!me) this.props.navigation.navigate('Login')
                        return (
                            <List>
                                <ListItem
                                    onPress={() => this.props.navigation.navigate('UserProfile', { id: me.id, me })}
                                    thumbnail>
                                    <Left>
                                        <Thumbnail
                                            large
                                            square
                                            style={{ marginVertical: 10 }}
                                            source={{ uri: (me.avatar && me.avatar.url) ? me.avatar.url : defaultAvatar }}
                                        />
                                    </Left>
                                    <Body>
                                        <Text>{me && me.name}</Text>
                                        <Text note numberOfLines={1}>{me.username}</Text>
                                    </Body>
                                    <Right>
                                    </Right>
                                </ListItem>
                                <Divider style={{ height: 15 }} />
                                <ListItem
                                    onPress={() => this.props.navigation.navigate('BasicInfo')}
                                    icon>
                                    <Left>
                                        <Button style={{ backgroundColor: "#A4C8F0" }}>
                                            <Icon type="FontAwesome" name="info" />
                                        </Button>
                                    </Left>
                                    <Body>
                                        <Text>基本信息</Text>
                                    </Body>
                                    <Right>
                                        <Icon name="arrow-forward" />
                                    </Right>
                                </ListItem>
                                <ListItem
                                    onPress={() => {
                                        if (!checkBasicInfo(me)) {
                                            Alert.alert('请先完善个人基本信息')
                                            return
                                        }
                                        this.props.navigation.navigate('FamilyRelationship', { me })
                                    }

                                    }
                                    icon
                                >
                                    <Left>
                                        <Button style={{ backgroundColor: "#FEA8A1" }}>
                                            <Icon type="FontAwesome" name="link" />
                                        </Button>
                                    </Left>
                                    <Body>
                                        <Text>家庭成员</Text>
                                    </Body>
                                    <Right>
                                        <Icon name="arrow-forward" />
                                    </Right>
                                </ListItem>
                                <ListItem
                                    onPress={() => {
                                        if (!checkBasicInfo(me)) {
                                            Alert.alert('请先完善个人基本信息')
                                            return
                                        }
                                        this.props.navigation.navigate('StudyHistroy')
                                    }
                                    }
                                    icon>
                                    <Left>
                                        <Button style={{ backgroundColor: "#57DCE7" }}>
                                            <Icon type="FontAwesome" name="book" />
                                        </Button>
                                    </Left>
                                    <Body>
                                        <Text>学习经历</Text>
                                    </Body>
                                    <Right>
                                        <Icon active name="arrow-forward" />
                                    </Right>
                                </ListItem>
                                <ListItem
                                    onPress={() => {
                                        if (!checkBasicInfo(me)) {
                                            Alert.alert('请先完善个人基本信息')
                                            return
                                        }
                                        this.props.navigation.navigate('Work')
                                    }
                                    }
                                    icon>
                                    <Left>
                                        <Button style={{ backgroundColor: "#FAD291" }}>
                                            <Icon type="MaterialCommunityIcons" name="worker" />
                                        </Button>
                                    </Left>
                                    <Body>
                                        <Text>工作经历</Text>
                                    </Body>
                                    <Right>
                                        <Icon active name="arrow-forward" />
                                    </Right>
                                </ListItem>
                            </List>
                        )
                    }
                }
            </Query>

            <Divider style={{ height: 15 }} />
            {/* <Query
                query={GET_FEESETTINGS}
                fetchPolicy="cache-and-network"
            >
                {
                    ({ loading, error, data }) => {
                        if (loading) return <Text></Text>
                        if (error) return <Text></Text>
                        if (data.feeSettings) {
                            const fees = data.feeSettings.map(setting => setting.fee)
                            if (fees.length > 0) {
                                return (
                                    <ListItem
                                        onPress={() => this.props.navigation.navigate('Product')}
                                        icon>
                                        <Left>
                                            <Button style={{ backgroundColor: "#A4C8F0" }}>
                                                <Icon type="MaterialIcons" name="attach-money" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text>购买</Text>
                                        </Body>
                                        <Right>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                    </ListItem>
                                )
                            }
                        }
                        return <Text></Text>
                    }
                }
            </Query> */}
            <ListItem
                onPress={() => this.props.navigation.navigate('Product')}
                icon>
                <Left>
                    <Button style={{ backgroundColor: "#A4C8F0" }}>
                        <Icon type="MaterialIcons" name="attach-money" />
                    </Button>
                </Left>
                <Body>
                    <Text>购买</Text>
                </Body>
                <Right>
                    <Icon active name="arrow-forward" />
                </Right>
            </ListItem>
            <ListItem
                onPress={() => this.props.navigation.navigate('Settings')}
                icon>
                <Left>
                    <Button style={{ backgroundColor: "#C47EFF" }}>
                        <Icon type="Ionicons" name="settings" />
                    </Button>
                </Left>
                <Body>
                    <Text>其他</Text>
                </Body>
                <Right>
                    <Icon active name="arrow-forward" />
                </Right>
            </ListItem>
        </Content>


    )

    render() {
        const { connectionType } = this.state;
        const isConnected = connectionType !== 'none';
        return (
            <Container>
                <Header style={{ marginTop: statusBarHeight }}>
                    <Left />
                    <Body style={{ alignItems: 'flex-end', justifyContent: "center", }}>
                        <Title>设置</Title>
                    </Body>
                    <Right />
                </Header>
                {
                    isConnected
                        ? (
                            <Content>
                                {this._renderContent()}
                            </Content>
                        )
                        : (
                            <Content>
                                <Text>网络连接失败</Text>
                            </Content>
                        )
                }
            </Container>

        );
    }
}