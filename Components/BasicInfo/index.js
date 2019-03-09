import React, { Component } from 'react'
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
  Switch,
  Thumbnail,
  Button,
  Title,
  Spinner
} from 'native-base';
import {
  Alert,
} from "react-native"
import { Mutation, Query } from 'react-apollo'

import Info from './Info'
import GET_ME from '../../graphql/get_me.query'
import { headerBackgroundColor, headerFontColor, statusBarHeight, headerButtonColor } from '../../utils/settings'

export default class BasicInfo extends React.Component {

  render() {
    return (
      <Query query={GET_ME} >
        {({ loading, error, data }) => {
          if (loading) return (
            <Container>
              <Spinner />
            </Container>
          );
          if (error) {
            Alert.alert(error.message)
            return <Info />
          }


          return (
            <Container>
              <Header style={{ marginTop: statusBarHeight }}>
                <Left >
                  <Button
                    onPress={() => this.props.navigation.goBack()}
                    transparent
                  >
                    <Icon name='md-arrow-back' type='Ionicons' />
                  </Button>
                </Left>
                <Body style={{ alignItems: 'flex-end', justifyContent: "center", }}>
                  <Title>我的信息</Title>
                </Body>
                <Right >
                  </Right>
              </Header>
              <Info
              navigation={this.props.navigation}
                name={data.me.name ? data.me.name : ""}
                gender={data.me.gender ? data.me.gender : ""}
                birthday={{
                  calendar: data.me.birthdaycalendar,
                  date: data.me.birthday
                }}
                birthplace={{
                  province: data.me.birthplace && data.me.birthplace.province ? { code: data.me.birthplace.province.code, name: data.me.birthplace.province.name } : '',
                  city: data.me.birthplace && data.me.birthplace.city ? { code: data.me.birthplace.city.code, name: data.me.birthplace.city.name } : '',
                  area: data.me.birthplace && data.me.birthplace.area ? { code: data.me.birthplace.area.code, name: data.me.birthplace.area.name } : '',
                  street: data.me.birthplace && data.me.birthplace.street ? { code: data.me.birthplace.street.code, name: data.me.birthplace.street.name } : '',
                  village: data.me.birthplace && data.me.birthplace.village ? { code: data.me.birthplace.village.code, name: data.me.birthplace.village.name } : '',
                }}
                residence={{
                  province: data.me.residence && data.me.residence.province ? { code: data.me.residence.province.code, name: data.me.residence.province.name } : '',
                  city: data.me.residence && data.me.residence.city ? { code: data.me.residence.city.code, name: data.me.residence.city.name } : '',
                  area: data.me.residence && data.me.residence.area ? { code: data.me.residence.area.code, name: data.me.residence.area.name } : '',
                  street: data.me.residence && data.me.residence.street ? { code: data.me.residence.street.code, name: data.me.residence.street.name } : '',
                  village: data.me.residence && data.me.residence.village ? { code: data.me.residence.village.code, name: data.me.residence.village.name } : '',
                }}
                me={data.me}
              />
            </Container>

          );
        }}
      </Query>
    )
  }
}
