import React, { Component } from 'react';
import { Query } from 'react-apollo'
import { Container, Header, Content, List, Icon, ListItem, Title, Text, Left, Body, Right, Button, Spinner } from 'native-base';
import { Avatar } from "react-native-elements";

import GET_PRODUCTS from '../../graphql/get_products.query'

export default class Product extends Component {

    _renderProduct = () => (
        <Query
            query={GET_PRODUCTS}
            fetchPolicy="network-only"
        >
            {
                ({ loading, error, data }) => {
                    if (loading) return <Spinner />
                    if (error) return (
                        <Text>查询商品列表失败</Text>
                    )

                    return (
                        <List>
                            {
                                data.products.map((product, index) => (
                                    <ListItem 
                                    thumbnail 
                                    key={index}
                                    onPress={()=>this.props.navigation.navigate('Trade',{product})}
                                    >
                                        <Left>
                                            <Avatar
                                                size="medium"
                                                title={`${product.price}元`}
                                                activeOpacity={0.7}
                                            />
                                        </Left>
                                        <Body>
                                            <Text>{product.subject}</Text>
                                            <Text note numberOfLines={1}>{product.info}</Text>
                                        </Body>
                                        <Right>
                                            <Button 
                                            transparent
                                            onPress={()=>this.props.navigation.navigate('Trade',{product})}
                                            >
                                                <Text>购买</Text>
                                            </Button>
                                        </Right>
                                    </ListItem>
                                ))
                            }
                        </List>
                    )
                }
            }
        </Query>
    )
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
                        <Title>产品列表</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    {this._renderProduct()}
                </Content>
            </Container>
        );
    }
}