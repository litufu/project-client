import gql from 'graphql-tag';
import Message_FRAGMENT from './message.fragment'

const MESSAGE_ADDED_SUBSCRIPTION = gql`
    subscription onMessageAdded($userId: String){
        messageAdded(userId: $userId){
            ...MessageFragment
        }
    }
    ${Message_FRAGMENT}
`   

export default MESSAGE_ADDED_SUBSCRIPTION;