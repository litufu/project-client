import { graphql, compose, withApollo } from 'react-apollo';
import React, { Component } from 'react';
import { createSwitchNavigator} from 'react-navigation'

import Loading from '../Components/Loading'
import LoginNavigator from './LoginNavigator'
import AppNavigator from './AppNavigator'

import { wsClient } from '../apollo'

import GET_ME from '../graphql/get_me.query'
import MESSAGE_ADDED_SUBSCRIPTION from '../graphql/message_added.subscription'
import FAMILYGROUP_CHANGED_SUBSCRIPTION from '../graphql/familyGroup_changed.subscription'

import GET_FAMILYGROUPS from '../graphql/get_familyGroups.query'


import { Spinner } from 'native-base';


const SwitchNavigator = createSwitchNavigator(
  {
    Loading,
    Login: LoginNavigator,
    App: AppNavigator
  },
  {
    initialRouteName: 'Loading'
  }
)

// const  AppContainer = createAppContainer(SwitchNavigator);
export default SwitchNavigator

// class AppWithNavigationState extends Component {
//   componentWillReceiveProps(nextProps) {
//     if (!nextProps.me) {
//       //   如果新的props当中没有me，则取消订阅
//       if (this.messagesSubscription) {
//         this.messagesSubscription();
//       }

//       if (this.familyGroupSubscription) {
//         this.familyGroupSubscription();
//       }

//       // clear the event subscription
//       // 关闭连接
//       if (this.reconnected) {
//         console.log('关闭连接')
//         this.reconnected();
//       }
//     } else if (!this.reconnected) {
//       //   重新连接，检查数据完整性。
//       console.log('重新连接')
//       this.reconnected = wsClient.onReconnected(() => {
//         this.props.refetch(); // check for any data lost during disconnect
//       }, this);
//     }

//     if (!this.familyGroupSubscription && nextProps.me) {
//       this.familyGroupSubscription = nextProps.subscribeToMessages();
//     }

//     if (!this.messagesSubscription && nextProps.me) {
//       this.messagesSubscription = nextProps.subscribeFamilyGroups(this.props.client);
//     }
//   }

//   render() {
//     if (this.props.loading) return <Spinner />
//     return (
//       <SwitchNavigator />
//     );
//   }
// }


// const userQuery = graphql(GET_ME, {
//   props: ({ data: { loading, me, refetch, subscribeToMore } }) => ({
//     loading,
//     me,
//     refetch,
//     subscribeToMessages() {
//       return subscribeToMore({
//         document: MESSAGE_ADDED_SUBSCRIPTION,
//         variables: { userId: me.id },
//         updateQuery: (prev, { subscriptionData }) => {
//           const newMessage = subscriptionData.data.messageAdded;
//           prev.me.messages.push(newMessage)
//           return prev
//         },
//       });
//     },
//     subscribeFamilyGroups(client) {
//       return subscribeToMore({
//         document: FAMILYGROUP_CHANGED_SUBSCRIPTION,
//         updateQuery: async (prev, { subscriptionData }) => {
//           console.log('subscriptionData-1', subscriptionData)
//           const { data } = await client.query({
//             query: GET_FAMILYGROUPS,
//           });
//           const newMe = {
//             ...prev.me,
//             relativefamilyGroups: data.getFamilyGroups
//           }
//           // refetch();
//           return { me: newMe }
//         }
//       });
//     },
//   }),
// });



// export default compose(
//   withApollo,
//   userQuery,
// )(AppWithNavigationState);