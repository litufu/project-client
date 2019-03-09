import React from 'react'
import { Alert } from 'react-native'
import { Query, Mutation, compose, graphql } from 'react-apollo'
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Left,
    Right,
    Body,
    Icon,
    Text,
    Spinner,
    List,
    ListItem,
    CheckBox
} from 'native-base';
import { errorMessage } from '../../utils/tools'
import { statusBarHeight } from '../../utils/settings'
import FINDPASSWORDS from '../../graphql/findpasswords.query'
import GET_ME from '../../graphql/get_me.query'
import FINDPASSWORD from '../../graphql/find_password.mutation'


class FindPassword extends React.Component {

    state = {
        checekUserId: "",
    }

    handlePress = (findPassword) => {
        
        if(!this.state.checekUserId) return 
        findPassword(
            { variables: { forgetterId: this.state.checekUserId } },
        )
    }

    render() {
        const me = this.props.MeData.me
        if (this.props.FPData.loading || this.props.MeData.loading) return <Spinner />
        if (this.props.FPData.error) return <Text>{errorMessage(this.props.FPData.error)}</Text>

        return (
            <Container>
                <Header style={{ marginTop: statusBarHeight }}>
                    <Left>
                        <Button
                            onPress={() => this.props.navigation.goBack()}
                            transparent
                        >
                            <Icon name='md-arrow-back' type='Ionicons' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>找回密码</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <List>
                    {
                        me.families.filter(family => !!family.to.user).map(family => (
                            <ListItem key={family.id} >
                                <CheckBox 
                                onPress={() => this.setState({ checekUserId: family.to.user.id })}
                                checked={family.to.user.id === this.state.checekUserId} />
                                <Body>
                                    <Text>{family.to.name}</Text>
                                </Body>
                            </ListItem>
                        ))
                    }
                    </List>
                    <ListItem>
                        <Mutation
                            mutation={FINDPASSWORD}
                            onCompleted={(data) => {
                                data.findPassword.times === 2
                                    ? Alert.alert('密码重置成功', '新密码：123456abcd')
                                    : Alert.alert('提交成功,还需要一名家人提交修改。')
                            }}
                        >
                            {
                                (findPassword, { loading }) => {
                                    return (
                                        <Button
                                        block
                                            disabled={this.props.FPData.findPasswords.filter(findpassword => {
                                                if (findpassword.forgetter.id === this.state.checekUserId &&
                                                    findpassword.remmember.filter(rem => rem.id === me.id).length > 0
                                                ) {
                                                    return true
                                                }
                                                return false
                                            }).length>0 ? true : false}
                                            onPress={()=>this.handlePress(findPassword)}>
                                            <Text>
                                                {`提交${loading ? "中..." : ""}`}
                                            </Text>
                                        </Button>
                                    )
                                }
                            }

                        </Mutation>
                    </ListItem>
                </Content>
            </Container>
        )
    }
}

export default compose(
    graphql(FINDPASSWORDS,
        {
            options: { fetchPolicy: 'network-only' },
            name: 'FPData'
        }),
    graphql(GET_ME, { name: 'MeData' }),
)(FindPassword);


