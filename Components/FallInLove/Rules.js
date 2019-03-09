import React, { Component } from 'react';

import { Mutation } from 'react-apollo'
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


export default class Rules extends Component {

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
                        <Title>同城热恋-规则和建议</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <List>
                        <ListItem itemDivider>
                            <Text>规则</Text>
                        </ListItem>
                        <ListItem>
                            <Text>1、年满18周岁可以报名参加见面相亲</Text>
                        </ListItem>
                        <ListItem>
                            <Text>2、周一到周四为报名时间，周五为报名匹配结果公布时间,周六和周日为线下见面时间。
                                一周为一个报名相亲周期。
                            </Text>
                        </ListItem>
                        <ListItem>
                            <Text>
                                3、报名者在报名前需要:(1)填写个人基本信息；(2)与一名家人建立关系连接；(3)填写个人学习经历；
                                 (4)填写个人的身高、体重以及希望对方的身高、体重、年龄区间信息。
                                 (5)女士在报名前还应该填写见面的具体时间和地点。
                                 约会时间可以在早8点到晚6点之间进行选择。
                                 见面地点应选择公园、免费景区、广场、公共体育馆等公共场所。
                           </Text>
                        </ListItem>
                        <ListItem>
                            <Text>
                                4、系统将根据报名者要求的身高、体重和年龄信息进行匹配。
                                如果有人符合报名者的要求，并且报名者的信息也符合该人的要求，则匹配成功。
                                会员具有优先匹配权，会员等级越高，匹配权越高。
                           </Text>
                        </ListItem>
                        <ListItem itemDivider>
                            <Text>建议</Text>
                        </ListItem>
                        <ListItem>
                            <Text>1、对于尚未见面、不了解对方真实情况，对方索要微信、手机号等真实的隐私信息的，
                               对方可能为网络诈骗、传销、微商做广告，建议直接拒绝。</Text>
                               </ListItem>
                            <ListItem>
                                <Text>2、对于见面选择酒店、饭店、酒吧、商场等消费场所的，
                                    对方可能为酒托、饭托，建议直接拒绝。</Text>
                            </ListItem>
                            <ListItem>
                                <Text>3、对于见面后不久以各种理由(包括结婚、生日、生病、投资理财、生意周转等)让你转账或为其消费的，
                               对方可能是有组织的诈骗团伙，建议直接拒绝。</Text>
                            </ListItem>
                            <ListItem>
                                <Text>
                                    4、建议告知家人自己的去向。要严格控制首次约会时间，不宜过长，同时也应坚持自己回家，以免暴露家庭住址。
                            </Text>
                            </ListItem>
                            <ListItem>
                                <Text>5、建议见面先核实对方身份证，检查其姓名、年龄是否与网上信息一致</Text>
                            </ListItem>
                    </List>
                </Content>
            </Container>
        );
    }
}