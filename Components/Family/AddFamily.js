import React, { Component } from 'react';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Picker,
  Button,
  Spinner,
  Left,
  Right,
  Body,
  Icon,
  Title,
} from 'native-base';
import { StyleSheet, TouchableOpacity, Text, View, Alert } from 'react-native'
import { Query, Mutation } from 'react-apollo'

import CREATE_FAMILY from '../../graphql/create_family.mutation'
import MODIFY_FAMILY from '../../graphql/modify_family.mutation'
import GET_ME from '../../graphql/get_me.query'
import { headerBackgroundColor, headerFontColor, statusBarHeight, headerButtonColor } from '../../utils/settings'

export default class AddFamily extends Component {
  state = {
    name: this.props.navigation.getParam('name', ''),
    relationship: this.props.navigation.getParam('relationship', 'father'),
    spouseId:this.props.navigation.getParam('spouseId', ''),
    disabled:false,
  }

  validate = (relationship, name, client,me) => {
    if (name === "") {
      Alert.alert('姓名未填写')
      return false
    }
    const rxName = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/
    if (!rxName.test(name)) {
      Alert.alert('姓名格式暂不支持')
      return false
    }
    const relationships = ['father', 'mother', 'oldbrother', 'youngbrother', 'oldsister',
      'youngsister', 'wife', 'husband', 'son', 'daughter'
    ]
    if (relationships.indexOf(relationship) === -1) {
      Alert.alert('关系未选择')
      return false
    }

    const isAdd = this.props.navigation.getParam('isAdd')
    if (isAdd) {
      if (relationship === 'father' && me.families.filter((who, index) => {
        return who.relationship === relationship
      }).length !== 0) {
        Alert.alert('只能选择一个父亲')
        return false
      }

      if (relationship === 'mother' && me.families.filter((who, index) => {
        return who.relationship === relationship
      }).length !== 0) {
        Alert.alert('只能选择一个母亲')
        return false
      }
    }

    return true
  }

  submitRelationship = (createFamily, client,me) => {
    
    
    const { relationship, name,spouseId } = this.state
    if((relationship==='son' || relationship==='daughter') && !spouseId){
      Alert.alert('未填写配偶前无法创建子女')
      return null
    }
    if(relationship!=='son' && relationship!=='daughter'){

    }
    this.setState({disabled:true})
    const pass = this.validate(relationship, name, client,me)

    if (!pass) {
      return null
    }
    createFamily({
      variables: { name, relationship,spouseId },
      optimisticResponse: {
        __typename: "Mutation",
        createFamily: {
          __typename: "Family",
          id: Math.floor(Math.random() * 200).toString(),
          relationship: relationship,
          status: '0',
          to: {
            __typename: "Person",
            id: Math.floor(Math.random() * 200).toString(),
            name: name,
            user:null,
          },
          from:{
            __typename:'User',
            id:Math.floor(Math.random() * 200).toString(),
            name:''
          },
          spouse:{
            __typename:"Family",
            id:spouseId ? spouseId :Math.floor(Math.random() * 200).toString(),
          }
        }
      }
    })
    this.props.navigation.navigate("FamilyRelationship")
  }

  updateRelationship = (updateFamily, client,me) => {
    this.setState({disabled:true})
    const { relationship, name,spouseId } = this.state
    if((relationship==='son' || relationship==='daughter') && !spouseId){
      Alert.alert('未填写配偶前无法创建子女')
      return null
    }
    const pass = this.validate(relationship, name, client,me)
    const familyId = this.props.navigation.getParam('familyId')
    const toId = this.props.navigation.getParam('toId')

    if (!pass) {
      return null
    }
    updateFamily({
      variables: { id: familyId, name, relationship,spouseId },
      optimisticResponse: {
        __typename: "Mutation",
        updateFamily: {
          __typename: "Family",
          id: familyId,
          relationship: relationship,
          status: '0',
          to: {
            __typename: "Person",
            id: toId,
            name: name,
            user:null
          },
          from:{
            __typename:'User',
            id:Math.floor(Math.random() * 200).toString(),
            name:''
          },
          spouse:{
            __typename:"Family",
            id:spouseId ? spouseId :Math.floor(Math.random() * 200).toString(),
          }
        }
      }
    })
    this.props.navigation.navigate("FamilyRelationship")
  }

  renderAddFamily = (me) => (
    <Mutation
      mutation={CREATE_FAMILY}
      update={(cache, { data: { createFamily } }) => {
        const { me } = cache.readQuery({ query: GET_ME });
        const families = me.families.concat([createFamily])
        cache.writeQuery({
          query: GET_ME,
          data: { me: {...me,families} }
        });
      }}
    >
      {(createFamily, { loading, error, client }) => (
        <View>
          <Button block
            disabled={this.state.disabled}
            style={styles.saveButton}
            onPress={() => this.submitRelationship(createFamily, client,me)}
          >
            <Text>{loading ? "保存中..." : "保存"}</Text>
          </Button>
          {error && <Text>Error :( Please try again</Text>}
        </View>
      )}
    </Mutation>
  )

  renderModifyFamily = (me) => (
    <Mutation
      mutation={MODIFY_FAMILY}
    >
      {(updateFamily, { loading, error, client }) => (
        <View>
          <Button block
            disabled={this.state.disabled}
            style={styles.saveButton}
            onPress={() => this.updateRelationship(updateFamily, client,me)}
          >
            <Text>{loading ? "保存中..." : "保存"}</Text>
          </Button>
          {error && <Text>Error :( Please try again</Text>}
        </View>
      )}
    </Mutation>
  )

  renderSpouse=(relationship,gender,spouses)=>{
    const addSonOrDaughter = relationship==="son" || relationship==="daughter"
    const hasSpouse = spouses.length>0

    if(addSonOrDaughter ){
      if(hasSpouse){
        
        return (
        <Item style={styles.left}>
          <Label>配偶</Label>
          <Picker
            mode="dropdown"
            style={{ width: 100, alignItems: "center", justifyContent: "center", }}
            placeholder="配偶"
            placeholderStyle={{ color: "#bfc6ea" }}
            placeholderIconColor="#007aff"
            selectedValue={this.state.spouseId}
            onValueChange={(spouseId) => this.setState({ spouseId })}
          >
           {
             spouses.map(spouse=><Picker.Item label={spouse.to.name} value={spouse.id} key={spouse.id}/>)
           }
          </Picker>
        </Item>
        )
      }else{
        Alert.alert("请先添加配偶后，再添加子女")
        return null
      }
    }
  }

  render() {
    const { relationship, name } = this.state
    const isAdd = this.props.navigation.getParam('isAdd', true);

    return (
      <Query query={GET_ME}>
        {({ loading, error, data,client }) => {
          const me = data.me
          if (loading) return <Spinner />;
          if (error) return <Text>{error.message}</Text>
          if (data.me.name === '' || data.me.gender === "") {
            Alert.alert('需要先完善个人信息')
            return null
          }
          
          const spouses = data.me.families.filter(f=>f.relationship==="wife"||f.relationship==="husband")

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
                  <Title>{this.props.navigation.getParam("isAdd", true) ? "添加成员" : "修改成员"}</Title>
                </Body>
                <Right />
              </Header>
              <Content>
                <Form>
                  <Item style={styles.left}>
                    <Label>关系</Label>
                    <Picker
                      mode="dropdown"
                      style={{ width: 100, alignItems: "center", justifyContent: "center", }}
                      placeholder="关系"
                      placeholderStyle={{ color: "#bfc6ea" }}
                      placeholderIconColor="#007aff"
                      selectedValue={relationship}
                      onValueChange={(relationship) => this.setState({ relationship,disabled:false })}
                    >
                      <Picker.Item label="父亲" value="father" />
                      <Picker.Item label="母亲" value="mother" />
                      <Picker.Item label="哥哥" value="oldbrother" />
                      <Picker.Item label="弟弟" value="youngbrother" />
                      <Picker.Item label="姐姐" value="oldsister" />
                      <Picker.Item label="妹妹" value="youngsister" />

                      {
                        data.me.gender === "male"
                          ? <Picker.Item label="妻子" value="wife" />
                          : <Picker.Item label="丈夫" value="husband" />
                      }
                      <Picker.Item label="儿子" value="son" />
                      <Picker.Item label="女儿" value="daughter" />
                    </Picker>
                  </Item>
                    {this.renderSpouse(relationship,data.me.gender,spouses)}
                  <Item style={styles.right}>
                    <Label>姓名</Label>
                    <Input
                      onChangeText={(name) => this.setState({ name,disabled:false })}
                      value={this.state.name}
                    />
                  </Item>
                  {isAdd ? this.renderAddFamily(me) : this.renderModifyFamily(me)}
                </Form>
              </Content>
            </Container>
          );
        }}
      </Query>

    );
  }
}

const styles = StyleSheet.create({
  relationship: {
    fontSize: 15,
  },
  name: {
    fontSize: 20,
  },
  left: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center",
    padding: 10
  },
  right: {
    flex: 0.8,
    alignItems: "center",
    justifyContent: "center",
    padding: 10
  },
  button: {
    width: 80,
    alignItems: "center",
    justifyContent: "center"
  },
  saveButton: {
    margin: 10,
  }

})
