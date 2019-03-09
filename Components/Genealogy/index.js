import React from 'react'
import { View, Text, Alert } from 'react-native'
import { Spinner, Button } from 'native-base'
import { Query } from "react-apollo";

import { errorMessage } from '../../utils/tools'
import GET_FAMILIESBYID from '../../graphql/get_familiesById.query'
import Example from './Example'

export default class Genealogy extends React.Component {

  state = {
    id: ''
  }

  handlePress = (id) => {
    this.setState({ id })
  }

  render() {

    return (
      <View style={{ flex: 1 }}>
        {
          !!this.state.id && <Button
            onPress={() => this.setState({ id: '' })}
            bordered>
            <Text>找回自己</Text>
          </Button>
        }


        <Query
          query={GET_FAMILIESBYID}
          variables={{ id: this.state.id }}
          fetchPolicy="cache-and-network"
        >
          {({ loading, error, data }) => {
            if (loading) return <Spinner />
            if (error) return <Text>{errorMessage(error)}</Text>

            return (
              <Example
                families={data.getFamiliesById}
                handlePress={this.handlePress}
              />
            );
          }}
        </Query>
      </View>


    )
  }
}