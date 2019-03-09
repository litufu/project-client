import gql from 'graphql-tag';
import GROUP_MESSAGE_FRAGMENT from './groupMessage.fragment'

const WORKGROUP_FRAGMENT = gql`
  fragment WorkGroupFragment on WorkGroup {
    id
    company{
        id
        name
    }
    colleagues{
        id
        worker{
            id
        }
        status
    }
    messages{
        ...GroupMessageFragment
    }
  }
  ${GROUP_MESSAGE_FRAGMENT}
`
export default WORKGROUP_FRAGMENT;



