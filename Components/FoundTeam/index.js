import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Segment, Content, Text, Spinner } from 'native-base';
import { Query } from 'react-apollo';
import Project from './Project'
import ReceiveInvitation from './ReceiveInvitation'

import { errorMessage } from '../../utils/tools'
import GET_ME from '../../graphql/get_me.query'


export default class FoundTeam extends Component {
    state = {
        selected: "1"
    }

    render() {
        const { selected } = this.state
        return (
            <Query query={GET_ME}>
                {
                    ({ loading, error, data }) => {
                        if (loading) return <Spinner />
                        if (error) return <Text>{errorMessage(error)}</Text>
                        return (
                            <Container>
                                <Header hasSegment>
                                    <Left>
                                        <Button transparent>
                                            <Icon name="arrow-back" />
                                        </Button>
                                    </Left>
                                    <Body>
                                        <Title>创业组团</Title>
                                    </Body>
                                    <Right>
                                        <Button
                                            onPress={() => this.props.navigation.navigate('SkillSetting')}
                                            transparent>
                                            <Text>设置</Text>
                                        </Button>
                                    </Right>
                                </Header>
                                <Segment>
                                    <Button
                                        first
                                        active={selected === "1"}
                                        onPress={() => this.setState({ selected: "1" })}
                                    >
                                        <Text>发起的合伙要约</Text>
                                    </Button>
                                    <Button
                                        active={selected === "2"}
                                        onPress={() => this.setState({ selected: "2" })}
                                    >
                                        <Text>收到的合伙要约</Text>
                                    </Button>
                                </Segment>
                                {
                                    selected === "1" && (
                                        <Project 
                                        me={data.me}
                                        navigation={this.props.navigation}
                                         />
                                    )
                                }
                                {
                                    selected === "2" && (
                                        <ReceiveInvitation 
                                        me={data.me} 
                                        navigation={this.props.navigation}
                                        />
                                    )
                                }
                            </Container>
                        )
                    }
                }
            </Query>
        );
    }
}