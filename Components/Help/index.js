import React, { Component } from 'react';
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
     ListItem, 
     List,
     

} from 'native-base';

export default class Help extends Component {
    render(){
        return(
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
                    <Title>帮助与反馈</Title>
                </Body>
                <Right />
            </Header>
            <Content>
                <List>
                    <ListItem>
                        <Left>
                            <Text>客服邮箱:</Text>
                        </Left>
                        <Text>kefu@gewu.org.cn</Text>
                    </ListItem>
                </List>
                </Content>
                </Container>
        )
    }
}