import { graphql } from 'react-apollo';
import React, { Component } from 'react';
import {TouchableWithoutFeedback} from 'react-native'
import { List, ListItem, Thumbnail, Text, Left, Body, Right, Spinner } from 'native-base';

import { errorMessage } from '../../utils/tools'
import GET_OLDCOLLEAGUES from '../../graphql/get_oldColleagues.query'
import COLLEAGUES_ADDED_SUBSCRIPTION from '../../graphql/colleagues_added.subscription'
import { defaultAvatar } from '../../utils/settings';

class QureyOldColleagues extends Component {
    componentDidMount() {
        const { data: { refetch, subscribeToMore } } = this.props;

        this.unsubscribe = subscribeToMore({
            document: COLLEAGUES_ADDED_SUBSCRIPTION,
            updateQuery: (prev) => {
                refetch();
                return prev;
            },
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const { data: { oldColleagues, loading, error } } = this.props;
        const {work,me,renderButton,myOldColleagues} = this.props

        

        if (loading) return <Spinner />
        if (error) return <Text>{errorMessage(error)}</Text>

        return (
            <List>
                {
                    oldColleagues.map(colleague=>(
                        <ListItem 
                        onPress={()=>{
                            let oldcolleagueStatus
                            const workerColleagues = myOldColleagues.filter(myOldColleague=>myOldColleague.to.id===colleague.id)
                            if(workerColleagues.length===0){
                                oldcolleagueStatus = '0'
                            }else{
                                oldcolleagueStatus = workerColleagues[0].status
                            }
                            if (oldcolleagueStatus === "3") {
                                this.props.navigation.navigate('UserProfile', { id: colleague.id })
                            }
                        }}
                        thumbnail 
                        key={colleague.id}>
                        <Left>
                        <TouchableWithoutFeedback
                        >
                            <Thumbnail source={{ uri: colleague.avatar ? colleague.avatar.url : defaultAvatar }} />
                        </TouchableWithoutFeedback>
                        </Left>
                        <Body>
                            <Text>{colleague.name}</Text>
                            <Text note numberOfLines={1}>{colleague.username}</Text>
                        </Body>
                        <Right>
                              {
                                  colleague.id !== me.id &&(
                                      renderButton(myOldColleagues, colleague.id, me.id, work.company.id)
                                  )
                              }
                        </Right>
                        </ListItem>
                    ))
                }
            </List>
        )
    }
}


export default graphql(GET_OLDCOLLEAGUES, {
    options: (props) => ({
        variables: {
            startTime:props.work.startTime,
            endTime:props.work.endTime,
            companyId: props.work.company.id,
        },
        fetchPolicy:"cache-and-network",
    }),
})(QureyOldColleagues)
