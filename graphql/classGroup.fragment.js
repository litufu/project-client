import gql from 'graphql-tag';

import GROUP_MESSAGE_FRAGMENT from './groupMessage.fragment'

const CLASSGROUP_FRAGMENT = gql`
  fragment ClassGroupFragment on ClassGroup {
    id
    study{
        id
    }
    name
    members{
        id
        student{
            id
            name
            avatar{
                id
                url
            }

        }
        status
    }
    messages{
        ...GroupMessageFragment
    }
  }
  ${GROUP_MESSAGE_FRAGMENT}
`
export default CLASSGROUP_FRAGMENT;


