import gql from 'graphql-tag';

const UNREADMESSAGE_FRAGMENT = gql`
  fragment UnReadMessageFragment on UnReadMessage {
    id
    type
    typeId
    lastMessageId
  }
`
export default UNREADMESSAGE_FRAGMENT;