import React, { Component } from 'react';

import {Mutation} from 'react-apollo'
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
     Spinner ,
     FooterTab,
     Footer,
     CheckBox,
     Thumbnail
} from 'native-base';

import Alipay from '../../utils/Alipay'

export default class Trade extends Component {

    render() {
        const data = this.props.navigation.getParam('data')
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
                        <Title>支付订单</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                 
                    <List>
                    <ListItem style={{marginVertical:20}}>
                        <Left/>
                        <Body>
                            <Text>￥<Text style={{fontSize:30}}>{data.newTrade.amount}</Text></Text>
                        </Body>
                        <Right/>
                    </ListItem>
                    <ListItem thumbnail style={{marginTop:20}}>
                        <Left>
                            <Thumbnail square source={require('../../assets/alipay.png')} />
                        </Left>
                        <Body>
                            <Text>支付宝支付</Text>
                        </Body>
                        <Right>
                            <CheckBox checked={true} color="green"/>
                        </Right>
                    </ListItem>
                    </List>
                </Content>
                <Footer>
                <FooterTab style={{backgroundColor:'orange'}}>
                        <Button
                            full
                            onPress={async()=>{
                                // Alipay.setAlipaySandbox(true)
                                let ret = await Alipay.pay(data.newTrade.signedStr)
                                if (ret.resultStatus === '9000') {
                                    console.log('支付宝支付成功了', ret);
                                    // 支付成功回调
                                  } else {
                                    console.log('支付宝支付失败了.', ret);
                                    // 支付失败回调
                                  }
                            }}
                        >
                            <Text style={{fontSize:15,color:'white'}}>确认支付</Text>
                    </Button>
                </FooterTab>
                </Footer>
            </Container>
        );
    }
}