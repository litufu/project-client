import gql from 'graphql-tag';
import GROUP_MESSAGE_FRAGMENT from './groupMessage.fragment'

const REGSTATUS_FRAGMENT = gql`
  fragment RegStatusFragment on RegStatus {
    id
    education
    university{
        id
        name
    }
    major{
        id
        name
    }
    messages{
      ...GroupMessageFragment
    }
  }
  ${GROUP_MESSAGE_FRAGMENT}
`
export default REGSTATUS_FRAGMENT;
