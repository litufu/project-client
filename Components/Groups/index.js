import React, { Component } from 'react';
import { withNavigation } from 'react-navigation'
import { Query } from 'react-apollo';
import { Container, Header, Content, List, ListItem, Text, Icon, Left, Body, Right, Switch, Button, Spinner } from 'native-base';

import GET_ME from '../../graphql/get_me.query'
import { errorMessage } from '../../utils/tools'


class Groups extends Component {
  render() {

    return (
      <Query query={GET_ME}>
        {
          ({ loading, error, data }) => {
            if (loading) return <Spinner />
            if (error) return <Text>{errorMessage(error)}</Text>
            const me = data.me
            const locationGroups = me.locationGroups.filter(locationGroup => locationGroup.users.length !== 1 && locationGroup.users.length !== 0)
            const relativefamilyGroups = me.relativefamilyGroups
            return (
              <Content>
                {
                  (me.families && me.families.length > 0 && relativefamilyGroups.length>0) &&
                  (<ListItem icon onPress={() => this.props.navigation.navigate('FamilyGroup', { me, relativefamilyGroups})}>
                    <Left>
                      <Button style={{ backgroundColor: '#FEA8A1' }}>
                        <Icon active name="link" type='FontAwesome' />
                      </Button>
                    </Left>
                    <Body>
                      <Text>家庭群</Text>
                    </Body>
                    <Right>
                    </Right>
                  </ListItem>)}
                {
                  (me.studies && me.studies.length > 0) && (
                    <ListItem icon onPress={() => this.props.navigation.navigate('ClassGroup', { me })}>
                      <Left>
                        <Button style={{ backgroundColor: '#57DCE7' }}>
                          <Icon active name="book" type='FontAwesome' />
                        </Button>
                      </Left>
                      <Body>
                        <Text>同学群</Text>
                      </Body>
                      <Right>
                      </Right>
                    </ListItem>
                  )
                }
                {
                  (me.works && me.works.length > 0) && (
                    <ListItem icon onPress={() => this.props.navigation.navigate('WorkGroup', { me })}>
                      <Left>
                        <Button style={{ backgroundColor: '#FAD291' }}>
                          <Icon active name="worker" type='MaterialCommunityIcons' />
                        </Button>
                      </Left>
                      <Body>
                        <Text>同事群</Text>
                      </Body>
                      <Right>
                      </Right>
                    </ListItem>
                  )
                }
                {
                  (me.birthplace && me.birthplace.id && locationGroups.length > 0) && (

                    <ListItem icon onPress={() => this.props.navigation.navigate('LocationGroup', { me, locationGroups })}>
                      <Left>
                        <Button style={{ backgroundColor: "#007AFF" }}>
                          <Icon active name="account-location" type='MaterialCommunityIcons' />
                        </Button>
                      </Left>
                      <Body>
                        <Text>老乡群</Text>
                      </Body>
                      <Right>
                      </Right>
                    </ListItem>
                  )
                }
              </Content>
            )
          }
        }
      </Query>

    );
  }
}


export default withNavigation(Groups)