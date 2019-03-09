import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import {Spinner,Text} from 'native-base'
import {Alert,View} from 'react-native'
import { withNavigation } from 'react-navigation';
import UserList from './UserList'


const USER_SEARCH = gql`
  query searchUser($username: String!) {
    searchUser(username: $username) {
      id
      username
      name
    }
  }
`;

class UserListConainer extends React.Component{

    render(){
        const {navigation,username,who,me} = this.props
        return(
            <Query query={USER_SEARCH} variables={{ username }}>
                {({ loading, error, data }) => {
                if (loading) return  <Spinner />;
                if (error) {
                    Alert.alert(error.message)
                    return null
                }
                if(!data.searchUser || !data.searchUser.id){
                    return <View style={{margin:10}}><Text>没有找到对应的用户名</Text></View>
                }

                return (
                        <UserList users={[data.searchUser]} who={who} navigation={navigation} me={me} />
                    );
                }}
            </Query>
        )
    }
}



export default withNavigation(UserListConainer);
