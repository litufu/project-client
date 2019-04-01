import React, { Component } from 'react';
import { Query ,Mutation} from 'react-apollo'
import { Image, Alert,Dimensions } from 'react-native';
import {
    Container,
    Header,
    Content,
    Card,
    CardItem,
    Thumbnail,
    Text,
    Button,
    Icon,
    Left,
    Body,
    Right,
    Title,
    Spinner,

} from 'native-base';

const {width,height} = Dimensions.get('window');

import { defaultAvatar } from '../../utils/settings'
import PARTAKE_ACTIVITY from '../../graphql/partake_activity.mutation'
import GET_ME from '../../graphql/get_me.query'
import { errorMessage } from '../../utils/tools';

export default class ActivityDetail extends Component {
    render() {
        const activity = this.props.navigation.getParam('activity')
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
                        <Title>{activity.title}</Title>
                    </Body>
                    <Right >
                    </Right>
                </Header>
                <Query query={GET_ME}>
                    {
                        ({ loading, error, data }) => {
                            if (loading) return <Spinner />
                            if (error) return <Text>{errorMessage(error)}</Text>
                            const me = data.me
                            return (
                                <Content>
                                    <Card style={{ flex: 0 }}>
                                        <CardItem>
                                            <Left>
                                                <Thumbnail source={{ uri: activity.creater.avatar ? activity.creater.avatar.url : defaultAvatar }} />
                                                <Body>
                                                    <Text>{activity.creater.name}</Text>
                                                    <Text note>{activity.creater.username}</Text>
                                                </Body>
                                            </Left>
                                        </CardItem>
                                        <CardItem>
                                            <Left>
                                                <Body>
                                                    <Text >{`开始时间:${new Date(activity.startTime).toLocaleDateString()} ${new Date(activity.startTime).toLocaleTimeString()}`}</Text>

                                                </Body>
                                            </Left>
                                        </CardItem>
                                        <CardItem>
                                            <Left>
                                                <Body>
                                                    <Text >{`结束时间:${new Date(activity.endTime).toLocaleDateString()} ${new Date(activity.endTime).toLocaleTimeString()}`}</Text>

                                                </Body>
                                            </Left>
                                        </CardItem>
                                        <CardItem>
                                            <Left>
                                                <Body>
                                                    <Text > {`地点:${activity.location}`}</Text>
                                                </Body>
                                            </Left>
                                        </CardItem>
                                        <CardItem>
                                            <Left>
                                                <Text>
                                                    {`人数:${activity.number}`}
                                                </Text>
                                            </Left>
                                        </CardItem>
                                        <CardItem>
                                            <Body>
                                                <Image source={{ uri: activity.image.url }} style={{ height: width-30, width: width-30, flex: 1,padding:10 }} />
                                                <Text>
                                                    {activity.content}
                                                </Text>
                                            </Body>
                                        </CardItem>
                                        {
                                            (activity.creater.id !== me.id &&
                                            activity.users.filter(user=>user.id===me.id).length===0) &&
                                            (
                                                <CardItem>
                                                <Body>
                                                    <Mutation 
                                                    mutation={PARTAKE_ACTIVITY}
                                                    update={(cache, { data: { partakeActivity } }) => {
                                                        const { me } = cache.readQuery({ query: GET_ME });
                                                        cache.writeQuery({
                                                            query: GET_ME,
                                                            data: { me: { ...me, activities: me.activities.concat([partakeActivity]) } },
                                                        });
                                                    }}
                                                    onCompleted={()=>Alert.alert('报名成功')}
                                                    >
                                                        {
                                                            (partakeActivity, { loading, error, data }) => {
                                                                return (
                                                                    <Button
                                                                        full
                                                                        transparent
                                                                        textStyle={{ color: '#87838B', fontSize: 15 }}
                                                                        onPress={() => {
                                                                            partakeActivity({ variables: { activityId: activity.id } })
                                                                        }}
                                                                    >
                                                                        <Text>{loading ? "报名中..." : "报名参加"}</Text>
                                                                        {error && Alert.alert(errorMessage(error))}
                                                                    </Button>
                                                                )
                                                            }
                                                        }
                                                    </Mutation>
                                                </Body>
                                            </CardItem>
                                            )
                                        }
                                    </Card>
                                </Content>
                            )
                        }
                    }
                </Query>
            </Container>
        );
    }
}