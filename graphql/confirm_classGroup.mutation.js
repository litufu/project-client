import gql from "graphql-tag";

import CLASSGROUP_FRAGMENT from './classGroup.fragment'

const CONFIRM_CLASSGROUP = gql`
mutation ConfirmClassGroup(
  $schoolEduId: String!,
  $studentId:String!,
){
  confirmClassGroup(
    schoolEduId:$schoolEduId,
    studentId:$studentId,
  ){
    ...ClassGroupFragment
  }
}
  ${CLASSGROUP_FRAGMENT}
`;


export default CONFIRM_CLASSGROUP;