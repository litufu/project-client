import React, { Component } from 'react';
import { View, TouchableHighlight, Alert } from 'react-native'
import { Query, Mutation, ApolloConsumer } from 'react-apollo'
import { Container, Header, Item, Input, Icon, Button, Text, Content, List, ListItem, Left, Body, Right, Title, Spinner, Radio } from 'native-base';

import { trim, errorMessage } from '../../utils/tools'
import GET_MAJORS from '../../graphql/get_majors.query'
import ADD_NEWMAJOR from '../../graphql/add_newMajor.mutation'
import { headerBackgroundColor, headerFontColor, statusBarHeight, headerButtonColor } from '../../utils/settings'

export default class SelectSchool extends Component {

  state = {
    selectedId: '',
    majorName: "",
    majors: [],
    loading: false
  }

  _handlePress = (id, name) => {
    this.setState({ selectedId: id, majorName: name })
  }

  validate = (majorName) => {
    if (majorName === "") {
      Alert.alert('请输入专业名称')
      return false
    }
    const rxName = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/
    if (!rxName.test(majorName)) {
      Alert.alert('请检查输入的名称是否正确')
      return false
    }

    return true
  }

  onMajorsFetched = majors => {
    const { navigation } = this.props;
    const education = navigation.getParam('education', '');
    let newMajors
    const Undergraduate_Major = majors.filter(major => major.education === "Undergraduate")
    const JuniorCollege_Major = majors.filter(major => major.education === "JuniorCollege")
    const SecondarySpecializedSchool_Major = majors.filter(major => major.education === "SecondarySpecializedSchool")
    const Master_Major = majors.filter(major => major.education === "Master")
    switch (education) {
      case 'VocationalHighSchool':
        newMajors = SecondarySpecializedSchool_Major
        break;
      case 'TechnicalSchool':
        newMajors = SecondarySpecializedSchool_Major
        break;
      case 'SecondarySpecializedSchool':
        newMajors = SecondarySpecializedSchool_Major
        break;
      case 'JuniorCollege':
        newMajors = JuniorCollege_Major
        break;
      case 'Undergraduate':
        newMajors = Undergraduate_Major
        break;
      case 'Master':
        newMajors = Master_Major
        break;
      case 'Doctor':
        newMajors = Master_Major
        break;
      case 'JuniorToCollege':
        newMajors = Undergraduate_Major
        break;
      case 'HighToCollege':
        newMajors = Undergraduate_Major
        break;
      case 'HighToJunior':
        newMajors = JuniorCollege_Major
        break;
      default:
        newMajors = []
        break;
    }
    if (newMajors.length == 0) Alert.alert('未找到相关专业')
    this.setState(() => ({ majors: newMajors }));
  }


  submitMajor = (addNewMajor) => {
    const { selectedId, majorName } = this.state
    if (!selectedId) {
      Alert.alert('尚未选择专业')
      return
    }
    addNewMajor({ variables: { majorId: selectedId, majorName: majorName } })
    this.props.navigation.goBack()
  }


  render() {
    const { selectedId, majorName, majors, loading } = this.state
    return (
      <Container>
        <Header style={{ backgroundColor: headerBackgroundColor, marginTop: statusBarHeight }} >
          <Left style={{ justifyContent: 'flex-end' }}>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" style={{ color: headerButtonColor }} />
            </Button>
          </Left>
          <Body style={{ alignItems: 'center' }}>
            <Title style={{ color: headerFontColor }}>学习经历</Title>
          </Body>
          <Right>
            {
            !!this.state.selectedId && (
                <Mutation
                  mutation={ADD_NEWMAJOR}
                >
                  {addNewMajor => (
                    <Button
                      onPress={() => this.submitMajor(addNewMajor)}
                    >
                      <Text>确认</Text>
                    </Button>
                  )}
                </Mutation>
              )
            }

          </Right>
        </Header>
        <Content style={{ marginTop: 5 }}>
          <List>
            <ApolloConsumer >
              {client => (
                <ListItem>
                  <Body style={{ flexDirection: 'row' }}>
                    <Input
                      value={this.state.majorName}
                      onChangeText={(value) => this.setState({ majorName: trim(value) })}
                      placeholder="请输入专业名称"
                    />
                    <Button
                      transparent
                      onPress={
                        async () => {
                          const pass = this.validate(majorName)
                          if (!pass) return
                          this.setState({ loading: true })
                          const { data } = await client.query({
                            query: GET_MAJORS,
                            variables: { majorName }
                          });
                          this.onMajorsFetched(data.getMajors);
                          this.setState({ loading: false })
                        }}
                    >
                      <Text>搜索</Text>
                    </Button>
                  </Body>
                </ListItem>
              )}
            </ApolloConsumer >
            <ListItem>
              <Text>
                已存在的专业:
          </Text>
            </ListItem>
            {loading && <Spinner />}
            {majors.map(major => (
              <ListItem key={major.id}>
                <Left>
                  <Text>{major.name}</Text>
                </Left>
                <Right>
                  <Radio
                    onPress={() => this._handlePress(major.id, major.name)}
                    selected={selectedId === major.id}
                  />
                </Right>
              </ListItem>
            ))
            }
          </List>
        </Content>
      </Container>
    );
  }
}

