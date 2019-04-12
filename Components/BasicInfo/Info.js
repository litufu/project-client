import React, { Component } from 'react'
import {
  Left,
  Body,
  Button,
  Content,
  Input,
  Right,
  ListItem,
  List,
  Text,
  CheckBox,
} from 'native-base'
import { PullPicker } from 'teaset'
import {
  Alert,
  View,
  StyleSheet,
} from "react-native"
import { Mutation } from "react-apollo";

import Region from '../Region'
import MyDatetime from '../MyDatetime'
import { trim, errorMessage, display } from '../../utils/tools'
import ADD_BASICKINFO from '../../graphql/add_basicinfo.mutation'
import GET_ME from '../../graphql/get_me.query';

const sexMap = { 'male': "男", 'female': "女" }
const sexNumMap = { 0: 'male', 1: 'female' }

export default class Info extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: props.name || '',
      gender: props.gender || 'male',
      birthday: props.birthday.calendar ? props.birthday : { calendar: "gregorian", date: '' },
      place: props.birthplace.province ? props.birthplace : { province: '', city: '', area: '', street: '', village: '' },
      residence: props.residence.province ? props.residence : { province: '', city: '', area: '', street: '', village: '' },
      editable: props.editable || false,
      checked: false,
      displayName: false,
      selectedIndex: 0,
      openProvinceCityArea: false,
      openProvinceCityArea2: false,
    };
  }


  handlePlace = (place) => {
    this.setState({ place: place })
  }

  handleResidence = (place) => {
    this.setState({ residence: place })
  }

  handleDate = (date) => {
    this.setState({ birthday: Object.assign(this.state.birthday, { date: date }) })
  }

  validate = (name, gender, birthday, placeCode, residenceCode) => {
    if (name === "") {
      Alert.alert('姓名未填写')
      return false
    }
    const rxName = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/
    if (!rxName.test(name)) {
      Alert.alert('姓名格式暂不支持',"请使用中文")
      return false
    }
    if (gender !== 'male' && gender !== 'female') {
      Alert.alert('性别未选择')
      return false
    }
    if (birthday.calendar !== 'lunar' && birthday.calendar !== 'gregorian') {
      Alert.alert('未选择日历类别')
      return false
    }
    if (isNaN(Date.parse(birthday.date))) {
      Alert.alert(`未选择生日`)
      return false
    }
    if (!placeCode.province || !residenceCode.province) {
      Alert.alert(`未选择出生地或所在地省份`)
      return false
    }
    if (!placeCode.city || !residenceCode.city) {
      Alert.alert('未选择出生地或所在地城市')
      return false
    }
    if (!placeCode.area || !residenceCode.area) {
      Alert.alert('未选择出生地或所在地区')
      return false
    }
    if (!placeCode.street || !residenceCode.street) {
      Alert.alert('未选择出生地或所在地乡镇')
      return false
    }
    if (!placeCode.village || !residenceCode.village) {
      Alert.alert('未选择出生地或所在地村或居委会')
      return false
    }
    return true
  }

  handleSubmit = (addBasicInfo) => {
    const { name, gender, birthday, place, residence } = this.state
    const placeCode = {
      province: place.province.code,
      city: place.city.code,
      area: place.area.code,
      street: place.street.code,
      village: place.village.code,
    }
    const residenceCode = {
      province: residence.province.code,
      city: residence.city.code,
      area: residence.area.code,
      street: residence.street.code,
      village: residence.village.code,
    }
    const pass = this.validate(name, gender, birthday, placeCode, residenceCode)
    if (!pass) {
      return null
    }
    this.setState({ editable: false })
    addBasicInfo({
      variables: { name, gender, birthday, birthplace: placeCode, residence: residenceCode },
      update: (cache, { data: { addBasicInfo } }) => {
        const data = { me: { ...addBasicInfo } }
        cache.writeQuery({ query: GET_ME, data });
      }
    })
  }

  _handleChecked = () => {
    this.setState({ openProvinceCityArea: false, openProvinceCityArea2: false })
    const { checked, place } = this.state
    if (!checked) {
      this.setState({ residence: place })
    }
    this.setState({ checked: !checked })
  }

  render() {

    const { name, gender, birthday, editable, place, residence, checked,
      displayName, selectedIndex, openProvinceCityArea, openProvinceCityArea2 } = this.state
    const items = [
      '男',
      '女',
    ];
    const displayPlace = display(place)
    const displayResidence = display(residence)

    return (
      <Content>
        {
          displayName && (
            <Content>
              <ListItem>
                <Input
                  onChangeText={(name) => this.setState({ name: trim(name) })}
                  value={name}
                  placeholder={name === "" ? "请输入你的姓名" : name}
                  style={{ color: editable ? 'blue' : 'black' }}
                />
              </ListItem>
              {
                !!name &&
                (<Button
                  onPress={() => this.setState({ displayName: false })}
                  style={{ marginHorizontal: 15 }}
                  block>
                  <Text>
                    确认
                </Text>
                </Button>)
              }
            </Content>

          )
        }
        {
          !displayName && (
            <Content>
              <List>
                <ListItem
                  onPress={() => this.setState({ displayName: true, openProvinceCityArea: false, openProvinceCityArea2: false })}
                >
                  <Left>
                    <Text>姓名</Text>
                  </Left>
                  <Right>
                    <Text>
                      {name || "未填写"}
                    </Text>
                  </Right>
                </ListItem>

                <ListItem
                  onPress={() => {
                    this.setState({ openProvinceCityArea: false, openProvinceCityArea2: false })
                    PullPicker.show(
                      '选择性别',
                      items,
                      selectedIndex,
                      (item, index) => this.setState({ selectedIndex: index, gender: sexNumMap[index] }))
                  }}
                >
                  <Left>
                    <Text>性别</Text>
                  </Left>
                  <Right>
                    <Text>{gender === "male" ? "男" : "女"}</Text>
                  </Right>
                </ListItem>

                <ListItem>
                  <Left style={{ flex: 0.4 }}>
                    <Text>出生日期</Text>
                  </Left>
                  <Right style={{ flex: 0.6 }}>
                    <MyDatetime
                      mode={"date"}
                      showtime={false}
                      handleDate={this.handleDate}
                      chosenDate={birthday.date}
                    />
                  </Right>
                </ListItem>

                <ListItem onPress={() => this.setState({ openProvinceCityArea: !openProvinceCityArea })}>
                  <Left>
                    <Text>出生地</Text>
                  </Left>
                  <View style={styles.birthplace}>
                    <Text>{displayPlace}</Text>
                  </View>
                  <Region
                    openProvinceCityArea={openProvinceCityArea}
                    handlePlace={this.handlePlace}
                    place={place}
                  />
                </ListItem>

                <ListItem>
                  <CheckBox
                    checked={checked}
                    onPress={this._handleChecked}
                  />
                  <Body style={{ paddingHorizontal: 10 }}>
                    <Text >居住地同出生地</Text>
                  </Body>
                </ListItem>


                <ListItem onPress={() => this.setState({ openProvinceCityArea2: !openProvinceCityArea2 })}>
                  <Left >
                    <Text>居住地</Text>
                  </Left>
                  <View style={styles.birthplace}>
                    <Text>{displayResidence}</Text>
                  </View>
                  <Region
                    openProvinceCityArea={openProvinceCityArea2}
                    handlePlace={this.handleResidence}
                    place={residence}
                  />
                </ListItem>
              </List>
              <Mutation
                onError={(error) => Alert.alert(errorMessage(error))}
                onCompleted={() => this.props.navigation.goBack()}
                mutation={ADD_BASICKINFO}>
                {(addBasicInfo, { loading }) => (
                  <Button
                    block
                    style={styles.button}
                    onPress={() => this.handleSubmit(addBasicInfo)}
                  >
                    <Text >{loading ? '保存中...' : '保存'}</Text>
                  </Button>
                )}
              </Mutation>
            </Content>
          )
        }
      </Content>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  countContainer: {
    alignItems: 'center',
    padding: 10
  },
  countText: {
    color: '#FF00FF'
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
    paddingHorizontal: 10,
  },
  button: {
    marginHorizontal: 15,
    marginTop: 10,
    alignItems: 'center',
    backgroundColor: 'blue',
    padding: 10,
  },
  whiteText: {
    color: "white"
  },
  birthday: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  birthplace: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  }
})
