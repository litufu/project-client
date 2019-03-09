import React, { Component } from 'react';
import { View, TouchableHighlight, Alert } from 'react-native'
import { Query, Mutation, ApolloConsumer } from 'react-apollo'
import { Container, Header, Item, Input, Icon, Button, Text, Content, List, ListItem, Left, Body, Right, Title, Spinner, Radio } from 'native-base';

import { trim, errorMessage } from '../../utils/tools'
import GET_SCHOOLS from '../../graphql/get_schools.query'
import ADD_SCHOOL from '../../graphql/add_school.mutation'
import ADD_NEWSCHOOL from '../../graphql/add_newSchool.mutation'
import { headerBackgroundColor, headerFontColor, statusBarHeight, headerButtonColor } from '../../utils/settings'

export default class SelectSchool extends Component {

  state = {
    selectedId: '',
    hideNew: true,
    schoolName: "",
  }

  validate = (name) => {
    let pass
    const rxName = /^[a-zA-Z0-9\u4E00-\u9FA5\uf900-\ufa2d·s]+$/
    if (!rxName.test(name)) {
      Alert.alert('学校名称格式暂不支持')
      return false
    }

    if (!~name.indexOf('小') && !~name.indexOf('中') && !~name.indexOf('学')) {
      Alert.alert('请检查学校名称是否为全称')
      return false
    }
    return true
  }

  _handlePress = (id, name) => {
    this.setState({ selectedId: id, schoolName: name, hideNew: true })
  }

  handleNewSchool = (addSchool) => {
    const { schoolName } = this.state

    const { navigation } = this.props;
    const locationName = navigation.getParam('locationName', '');
    const kind = navigation.getParam('kind', '');
    if (this.validate(schoolName)) {
      addSchool({
        variables: { name: this.state.schoolName, kind, locationName },
        optimisticResponse: {
          __typename: "Mutation",
          addSchool: {
            id: '123',
            __typename: "School",
            name: this.state.schoolName,
            kind: kind,
            location: {
              __typename: 'Location',
              id: '456',
              name: locationName,
              province: null,
              city: null,
              area: null
            }
          }
        }
      })
      this.setState({ schoolName: "" })
    }
  }

  submitSchool = (addNewSchool) => {
    const { selectedId, schoolName } = this.state
    if (!selectedId) {
      Alert.alert('尚未选择或创建学校')
      return
    }

    addNewSchool({
      variables: { schoolId: selectedId, schoolName }
    })
    this.props.navigation.goBack()
  }


  render() {
    const { navigation } = this.props;
    const { selectedId, hideNew } = this.state
    const locationName = navigation.getParam('locationName', '');
    const kind = navigation.getParam('kind', '');
    return (
      <Container>
        <Header style={{ backgroundColor: headerBackgroundColor, marginTop: statusBarHeight }}>
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
                  mutation={ADD_NEWSCHOOL}
                >
                  {addNewSchool => (
                    <Button
                      onPress={() => this.submitSchool(addNewSchool)}
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
            {
              hideNew && (
                <ListItem>
                  <Body>
                    <Button
                      block
                      warning
                      onPress={() => this.setState({ hideNew: false })}
                    >
                      <Text>创建学校</Text>
                    </Button>
                  </Body>
                </ListItem>
              )
            }
            {
              !hideNew && (
                <Mutation
                  mutation={ADD_SCHOOL}
                  update={(cache, { data: { addSchool } }) => {
                    const { getSchools } = cache.readQuery({ query: GET_SCHOOLS, variables: { locationName, kind } });
                    cache.writeQuery({
                      query: GET_SCHOOLS,
                      variables: { locationName, kind },
                      data: { getSchools: getSchools.concat([addSchool]) }
                    });
                  }}
                >


                  {(addSchool, { data, error }) => {
                    return (
                      <View>
                        <ListItem>
                          <Body style={{ flexDirection: 'row' }}>
                            <Input
                              value={this.state.schoolName}
                              onChangeText={(value) => this.setState({ schoolName: trim(value) })}
                              placeholder="请输入新建学校名称"
                            />
                            <Button
                              transparent
                              onPress={() => this.handleNewSchool(addSchool, data)}
                            >
                              <Text>创建</Text>
                            </Button>
                          </Body>

                        </ListItem>
                        {error && <Text style={{ color: 'red' }}>{errorMessage(error)}</Text>}
                      </View>
                    )
                  }}

                </Mutation>
              )
            }

            <ListItem>
              <Text>
                已存在的学校:
          </Text>
            </ListItem>

            <Query
              query={GET_SCHOOLS}
              variables={{ locationName, kind }}
            >
              {({ loading, error, data }) => {
                if (loading) return <Spinner />;
                if (error) return <Text>{errorMessage(error)}</Text>;

                return (
                  data.getSchools.map(school => (
                    <ListItem key={school.id}>
                      <Left>
                        <Text>{school.name}</Text>
                      </Left>
                      <Right>
                        <Radio
                          onPress={() => this._handlePress(school.id, school.name)}
                          selected={selectedId === school.id}
                        />
                      </Right>
                    </ListItem>
                  ))
                );
              }}
            </Query>
          </List>
        </Content>
      </Container>
    );
  }
}

