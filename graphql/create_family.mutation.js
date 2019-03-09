import gql from "graphql-tag";

import FAMILY_FRAGMENT from './family.fragment'

const CREATE_FAMILY = gql`
mutation CreateFamily($name: String!, $relationship: String!,$spouseId:String){
  createFamily(name:$name,relationship:$relationship,spouseId:$spouseId){
    ...FamilyFragment
  }
}
${FAMILY_FRAGMENT}
`

export default CREATE_FAMILY;