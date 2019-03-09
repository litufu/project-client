import gql from 'graphql-tag';

const Message_FRAGMENT = gql`
  fragment MessageFragment on Message {
    id
    to{
      id
      name
      avatar{
        id
        url
      }
    }
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
export default Message_FRAGMENT;