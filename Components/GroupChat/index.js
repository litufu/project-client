import React, { Component } from 'react';
import { Query } from 'react-apollo'
import { Spinner, Text } from 'native-base'

import UnReadMessage from './UnReadMessage'
import GET_ME from '../../graphql/get_me.query'
import { errorMessage } from '../../utils/tools';

export default class Chat extends Component {

    render() {
        const group = this.props.navigation.getParam('group', "")
        const type = this.props.navigation.getParam('type', "")
        const groupName = this.props.navigation.getParam('groupName', "")

        return (
            <Query query={GET_ME}>
                {
                    ({ loading, error, data }) => {
                        let newGroup
                        if (type === 'Family') {
                            newGroup = data.me.relativefamilyGroups.filter(g => g.id === group.id)[0]
                        } else if (type === "ClassMate") {
                            newGroup = data.me.classGroups.filter(g => g.id === group.id)[0]
                        } else if (type === "Colleague") {
                            newGroup = data.me.workGroups.filter(g => g.id === group.id)[0]
                        } else if (type === "FellowTownsman") {
                            newGroup = data.me.locationGroups.filter(g => g.id === group.id)[0]
                        } else if (type === "RegStatus") {
                            newGroup = data.me.regStatus
                        }
                        if (loading) return <Spinner />
                        if (error) return <Text>{errorMessage(error)}</Text>
                        return (
                            <UnReadMessage
                                me={data.me}
                                groupName={groupName}
                                type={type}
                                group={newGroup}
                                navigation={this.props.navigation}
                            />
                        )
                    }
                }
            </Query>
        )
      
    }
}