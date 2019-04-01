import gql from 'graphql-tag';
import GROUP_MESSAGE_FRAGMENT from './groupMessage.fragment'

const ACTIVITY_FRAGMENT = gql`
  fragment ActivityFragment on Activity {
    id
    startTime
    endTime
    location
    title
    content
    number
    city{
        id
        code
        name
    }
    image{
        id
        name
        url
    }
    type{
        id
        first
        second
    }
    creater{
        id
        name
        username
        avatar{
            id
            url
            name
        }
    }
    users{
        id
        name
        username
        avatar{
            id
            url
            name
        }
    }
    messages{
        ...GroupMessageFragment
    }
  }
  ${GROUP_MESSAGE_FRAGMENT}
`
export default ACTIVITY_FRAGMENT;