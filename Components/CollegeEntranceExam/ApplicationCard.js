import React, { Component } from "react";
import { StyleSheet, Alert } from 'react-native'
import { Mutation } from 'react-apollo'
import { Content, Left, Right, Card, CardItem, Text, Body, Button, Spinner } from "native-base";

import CANCEL_REGSTATUS from '../../graphql/cancel_regStatus.mutation'
import GET_ME from '../../graphql/get_me.query'
import {errorMessage} from '../../utils/tools'

export default class ApplicationCard extends Component {

    handleCancel=async (cancelRegStatus)=>{
        const id = this.props.id
        await cancelRegStatus({
            variables:{id},
        })
        Alert.alert('取消报名成功')
    }

    render() {
        const education = this.props.education || ""
        const subjectName = this.props.subjectName || ""
        const universityName = this.props.universityName || ""
        const majorName = this.props.majorName || ""
        const provinceName = this.props.provinceName || ""
        const personNum = this.props.personNum || 0
        const lowwestScore = this.props.lowwestScore || 0
        const proLowwestScore = this.props.proLowwestScore || 0
        const twoBtn = this.props.twoBtn || false

        return (

            <Card>
                <CardItem bordered>
                    <Left style={styles.left}>
                        <Text>{`学历:${education}`}</Text>
                    </Left>
                    <Right style={styles.right}>
                        <Text>{`学校:${universityName}`}</Text>
                    </Right>
                </CardItem>
                <CardItem bordered>
                    <Left style={styles.left}>
                        <Text>{`省份:${provinceName}`}</Text>
                    </Left>
                    <Right style={styles.right}>
                        <Text>{`专业:${majorName}`}</Text>
                    </Right>
                </CardItem>

                <CardItem>
                    <Left style={styles.left} >
                        <Text>{`分科:${subjectName}`}</Text>
                    </Left>
                    <Right style={styles.right}>
                        <Text>已报考人数:
                                <Text style={{ color: 'blue', fontWeight: 'bold' }}>{personNum}</Text>
                        </Text>
                    </Right>
                </CardItem>

                <CardItem bordered>
                    <Left style={styles.left} >
                        <Text>文化最低分:
                                <Text style={{ color: 'blue', fontWeight: 'bold' }}>{lowwestScore}</Text>
                        </Text>
                    </Left>
                    <Right style={styles.right}>
                        <Text>专业最低分:
                                <Text style={{ color: 'blue', fontWeight: 'bold' }}>{proLowwestScore}</Text>
                        </Text>
                    </Right>
                </CardItem>
                {
                    twoBtn
                        ? (
                            <CardItem
                                footer
                            >
                                <Left style={styles.left}>
                                    <Button
                                        onPress={this.props.handleToApplicants}
                                    >
                                        <Text  >报名详情</Text>
                                    </Button>
                                </Left>
                                <Body style={styles.body}>
                                    <Button
                                        onPress={this.props.handleToChat}
                                    >
                                        <Text  >进入群聊</Text>
                                    </Button>
                                </Body>
                                <Right style={styles.right}>
                                    <Mutation 
                                    mutation={CANCEL_REGSTATUS}
                                    onError={()=>Alert.alert(errorMessage(error))}
                                    update={(cache, { data: { cancelRegStatus } }) => {
                                        const { me } = cache.readQuery({ query: GET_ME });
                                        cache.writeQuery({
                                          query: GET_ME,
                                          data: { me: {...me,regStatus:null} }
                                        });
                                      }}
                                    >
                                        {
                                            (cancelRegStatus, { loading, error }) => {
                                                return (
                                                    <Button
                                                        onPress={() => this.handleCancel(cancelRegStatus)}
                                                    >
                                                        <Text>{`取消报名${loading ? "...":""}`} </Text>
                                                    </Button>

                                                )
                                            }
                                        }
                                    </Mutation>
                                </Right>
                            </CardItem>
                        )
                        : (
                            <CardItem
                                footer
                                button
                                onPress={this.props.handlePress}>
                                <Left />
                                <Body>
                                    <Text style={styles.text}>报 名</Text>
                                </Body>
                                <Right />
                            </CardItem>
                        )
                }


            </Card>

        );
    }
}

const styles = StyleSheet.create({
    left: {
        flex: 0.5,
        alignItems: 'flex-start'
    },
    right: {
        flex: 0.5,
        alignItems: 'flex-end'
    },
    body:{
        flex: 0.5,
    },
    text: {
        fontWeight: 'bold',
        color: 'red'
    }

})