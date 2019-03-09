import gql from "graphql-tag";
import FAMILY_FRAGMENT from './family.fragment'

const CONNECT_FAMILY =  gql`
mutation connectFamily($relativeId:ID!,$familyId:ID!,$name: String!, $relationship: String!){
    connectFamily(relativeId:$relativeId,familyId:$familyId,name:$name,relationship:$relationship){
        ...FamilyFragment
  }
}
${FAMILY_FRAGMENT}
`
export default CONNECT_FAMILY;