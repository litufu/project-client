import gql from "graphql-tag";
import FAMILY_FRAGMENT from './family.fragment'

const CONFIRM_FAMILY =  gql`
mutation confirmFamily($familyId:ID!){
    confirmFamily(familyId:$familyId){
        ...FamilyFragment
  }
}
${FAMILY_FRAGMENT}
`
export default CONFIRM_FAMILY;