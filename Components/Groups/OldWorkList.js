import React, { Component } from 'react';
import { Alert } from 'react-native'
import { Mutation} from 'react-apollo'
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Icon, Title, Spinner } from 'native-base';

import { errorMessage } from '../../utils/tools'
import { headerBackgroundColor, headerFontColor, statusBarHeight, headerButtonColor } from '../../utils/settings'

import GET_MYOLDCOLLEAGUES from '../../graphql/get_myOldColleagues.query'
import ADD_OLDCOLLEAGUE from '../../graphql/add_oldColleague.mutation'
import CONFIRM_OLDCOLLEAGUE from '../../graphql/confirm_oldColleague.mutation'
import QueryMyOldColleagues from './QueryMyOldColleagues'

export default class WorkList extends Component {

  _renderAddBtn = (companyId, workerId) => (
    <Mutation 
    mutation={ADD_OLDCOLLEAGUE}
    update={(cache, { data: { addOldColleague } }) => {
      const { myOldColleagues } = cache.readQuery({ query: GET_MYOLDCOLLEAGUES,variables:{companyId} });
      cache.writeQuery({
        query: GET_MYOLDCOLLEAGUES,
        variables:{companyId},
        data: { myOldColleagues: myOldColleagues.concat([addOldColleague]) }
      });
    }}
    >
      {
        (addOldColleague, { loading, error }) => {
          if (loading) return <Spinner />
          return (
            <Button
              transparent
              onPress={() => addOldColleague({ 
                variables: {companyId, workerId },
  
               })}
            >
              <Text>申请认证</Text>
              {error && Alert.alert(errorMessage(error))}
            </Button>
          )
        }
      }
    </Mutation>
  )

  _renderConfirmBtn = (companyId, workerId) => (
    <Mutation 
    mutation={CONFIRM_OLDCOLLEAGUE}
    >
      {
        (confirmOldColleague, { loading, error }) => {
          if (loading) return <Spinner />
          return (
            <Button
              transparent
              onPress={() =>{
                confirmOldColleague({ 
                  variables: { companyId, workerId },
                 })
              } }
            >
              <Text>确认</Text>
              {error && Alert.alert(errorMessage(error))}
            </Button>
          )
        }
      }
    </Mutation>
  )


  renderButton = (myOldColleagues, workerId, myId, companyId ) => {
    let oldcolleagueStatus
    const workerColleagues = myOldColleagues.filter(myOldColleague=>myOldColleague.to.id===workerId)
    if(workerColleagues.length===0){
      oldcolleagueStatus = '0'
    }else{
      oldcolleagueStatus = workerColleagues[0].status
    }

    if (oldcolleagueStatus === '0') {
      return (
        this._renderAddBtn(companyId, workerId)
      )
    } else if (oldcolleagueStatus === '3') {
      return (
        <Button transparent disabled>
          <Text>已认证</Text>
        </Button>
      )
    } else if (oldcolleagueStatus === '1') {
      return (
        <Button transparent disabled>
          <Text>等待确认</Text>
        </Button>
      )
    }
    return (this._renderConfirmBtn(companyId, workerId))
  }

  render() {
    const work = this.props.navigation.getParam('work')
    const me = this.props.navigation.getParam('me', '')
    return (
      <Container>
        <Header style={{ marginTop: statusBarHeight, backgroundColor: headerBackgroundColor }}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.goBack()}
            >
              <Icon name='arrow-back' style={{ color: headerButtonColor }} />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: headerFontColor }}>{work.company.name}</Title>
          </Body>
          <Right >
          </Right>
        </Header>
        <Content>
          <QueryMyOldColleagues 
          work={work}
          me={me}
          renderButton={this.renderButton}
          />
        </Content>
      </Container>
    );
  }
}

