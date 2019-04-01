import React, { Component } from 'react';
import { StyleSheet } from 'react-native'
import {
    Container,
    Header,
    Content,
    Icon,
    Title,
    Text,
    Left,
    Body,
    Right,
    Button,
} from 'native-base';


export default class ActivityRules extends Component {

    render() {
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
                        <Title>活动规则</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <Text style={styles.first}>禁止发布的内容</Text>
                    <Text style={styles.normal}>  1)反对宪法所确定的基本原则的；</Text>
                    <Text style={styles.normal}>  2)危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；</Text>
                    <Text style={styles.normal}>  3)损害国家荣誉和利益的；</Text>
                    <Text style={styles.normal}>  4)煽动民族仇恨、民族歧视，破坏民族团结的；</Text>
                    <Text style={styles.normal}>  5)破坏国家宗教政策，宣扬邪教和封建迷信的；</Text>
                    <Text style={styles.normal}>  6)散布谣言，扰乱社会秩序，破坏社会稳定的；</Text>
                    <Text style={styles.normal}>  7)散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；</Text>
                    <Text style={styles.normal}>  8)侮辱或者诽谤他人，侵害他人合法权益的；</Text>
                    <Text style={styles.normal}>  9)含有法律、行政法规禁止的其他内容的信息。</Text>
                    <Text style={styles.normal}> 如果用户知道任何人违反上述规定，请直接联系客服。本公司有随时终止删除不当活动的权利。本公司不对任何用户提供的资料承担责任。</Text>
                </Content>
            </Container>
        );
    }
}


const styles = StyleSheet.create({
    first: {
        fontSize: 15,
        fontWeight: "bold",
        marginVertical: 5,
    },
    normal: {
        marginVertical: 5,
    }
})