import React, { Component } from 'react';
import { Query, Mutation } from "react-apollo";
import { Alert } from 'react-native'
import { Container, Header, Content, List, ListItem, Text, Left, Icon, Button, Right, Body, Title, Spinner, Badge } from 'native-base';

import { errorMessage, timeTodate } from '../../utils/tools'
import { headerBackgroundColor, headerFontColor, statusBarHeight, headerButtonColor } from '../../utils/settings'
import GET_ME from '../../graphql/get_me.query'

class WorkGroup extends Component {

  render() {
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
            <Title style={{ color: headerFontColor }}>同事群</Title>
          </Body>
          <Right >
          </Right>
        </Header>
        <Content>
          <Query query={GET_ME}>
          {
            ({loading,error,data})=>{
              
              if(loading) return <Spinner />
              if(error) return <Text>{errorMessage(error)}</Text>

              const newWorkGroups = data.me.workGroups.map(workGroup=>workGroup.company.id===work.company.id)
              const nowWorks = data.me.works.filter(work => new Date(work.endTime).getFullYear() === 9999)


              return(
                <List>
                {
                  data.me.works.filter(work => (new Date(work.endTime) - new Date(work.startTime)) > 24 * 60 * 60 * 180 * 1000).sort((a, b) => (new Date(a.startTime) - new Date(b.startTime))).map(work => (
                    <ListItem key={work.id} onPress={() => this.props.navigation.navigate('OldWorkList', { work, me:data.me })}>
                      <Text>{timeTodate(work.startTime, work.endTime)} {work.company.name}</Text>
                    </ListItem>
                  ))
                }
                {
                  (nowWorks.length > 0) &&
                  <ListItem onPress={() => this.props.navigation.navigate('WorkContent', { work:nowWorks[0], me:data.me ,newWorkGroups})}>
                    <Text>{nowWorks[0].company.name}</Text>
                  </ListItem>
                }
              </List>
              )
            }
          }

          </Query>
       
        </Content>
      </Container>
    );
  }
}

export default WorkGroup