import gql from 'graphql-tag';
import GROUP_MESSAGE_FRAGMENT from './groupMessage.fragment'

const GROUPMESSAGE_ADDED_SUBSCRIPTION = gql`
    subscription onGMessageAdded($userId: String,$groupIds:[String]){
        gMessageAdded(userId: $userId,groupIds:$groupIds){
            ...GroupMessageFragment
        }
    }
    ${GROUP_MESSAGE_FRAGMENT}
`   

export default GROUPMESSAGE_ADDED_SUBSCRIPTION;