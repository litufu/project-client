import gql from 'graphql-tag'
import UNREADMESSAGE_FRAGMENT from './unReadMessage.fragment'

const GET_NEWUNREADMESSAGES = gql`
  {
    newUnreadMessages @client{
      ...UnReadMessageFragment
    }
  }
  ${UNREADMESSAGE_FRAGMENT}
`;

export default GET_NEWUNREADMESSAGES;