import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Text,  Spinner } from 'native-base';

import { errorMessage } from '../../utils/tools'
import UnReadMessage from './UnReadMessage'
import GET_ME from '../../graphql/get_me.query'

export default class Chat extends Component{

    render(){
        const userInfo = this.props.navigation.getParam('user')
        return(
            <Query query={GET_ME}>
            {
                ({ loading, error, data }) => {
                    if (loading) return <Spinner />
                    if (error) return <Text>{errorMessage(error)}</Text>
                    return( 
                         <UnReadMessage
                            me = {data.me}
                            userInfo={userInfo}
                            navigation={this.props.navigation}
                        />)  
                }
            }
            </Query>
        )
    }
}