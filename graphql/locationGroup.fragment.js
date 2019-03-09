import gql from 'graphql-tag';
import GROUP_MESSAGE_FRAGMENT from './groupMessage.fragment'

const LOCATIONGROUP_FRAGMENT = gql`
  fragment LocationGroupFragment on LocationGroup {
    id
    code
    name
    users{
        id
        name
        avatar{
          id
          name
          url
        }
    }
    messages{
        ...GroupMessageFragment
    }
  }
  ${GROUP_MESSAGE_FRAGMENT}
`
export default LOCATIONGROUP_FRAGMENT;