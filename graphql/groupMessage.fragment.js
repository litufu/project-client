import gql from 'graphql-tag';

const GROUP_MESSAGE_FRAGMENT = gql`
  fragment GroupMessageFragment on GroupMessage {
    id
    to
    type
    from{
        id
      name
      avatar{
        id
        url
      }
    }
    text
    image{
      id
      name
      url
    }
    createdAt
  }
`
export default GROUP_MESSAGE_FRAGMENT;