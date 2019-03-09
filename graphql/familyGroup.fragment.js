import gql from 'graphql-tag';
import GROUP_MESSAGE_FRAGMENT from './groupMessage.fragment'

const FAMILYGROUP_FRAGMENT = gql`
  fragment FamilyGroupFragment on FamilyGroup {
    id
    name
    father{
        id
        name
        user{
            id
        }
    }
    mother{
        id
        name
        user{
            id
        }
    }
    creater{
        id
        name
    }
    families{
        id
        to{
        id
        name
        user{
            id
            name
            gender
            avatar{
                id
                url
            }
        }
        }
        from{
            id
            name
            gender
        }
        relationship
    }   
    users{
        id
        name
    }
    messages{
        ...GroupMessageFragment
    }
  }
  ${GROUP_MESSAGE_FRAGMENT}
`
export default FAMILYGROUP_FRAGMENT;
