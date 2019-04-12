import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Text,  Spinner } from 'native-base';

import { errorMessage,retrieveMessages } from '../../utils/tools'
import UnReadMessage from './UnReadMessage'
import GET_ME from '../../graphql/get_me.query'

export default class Chat extends Component{

    state={
        storageMessages:[]
    }

    async componentDidMount(){
        const userInfo = this.props.navigation.getParam('user')
        const me = this.props.navigation.getParam('me')
        const storageMessages = await retrieveMessages(`${me.id}User${userInfo.id}`)
        if(storageMessages){
            this.setState({storageMessages:JSON.parse(storageMessages)})
        }
    }

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
                            storageMessages={this.state.storageMessages}
                        />)  
                }
            }
            </Query>
        )
    }
}