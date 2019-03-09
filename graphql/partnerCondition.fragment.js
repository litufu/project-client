import gql from 'graphql-tag';

const PARTNERCONDITION_FRAGMENT = gql`
  fragment PartnerConditionFragment on PartnerCondition {
    id
    skillName
    place
    number
    partners{
        id
        name
        avatar{
            id
            url
        }
    }
    passedPartners{
        id
        name
        avatar{
            id
            url
        }
    }
    project{
        id
        name
        content
        place{
            id
            code
            name
        }
        starter{
            id
            name
            avatar{
                id
                url
            }
        }
    }
    
  }
`
export default PARTNERCONDITION_FRAGMENT;
