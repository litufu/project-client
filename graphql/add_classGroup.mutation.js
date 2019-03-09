import gql from "graphql-tag";

import CLASSGROUP_FRAGMENT from './classGroup.fragment'

const ADD_CLASSGROUP = gql`
mutation AddClassGroup(
  $name: String!,
  $schoolEduId: String!,
  $studentId:String!,
){
addClassGroup(
    name:$name,
    schoolEduId:$schoolEduId,
    studentId:$studentId,
  ){
    ...ClassGroupFragment
  }
}
  ${CLASSGROUP_FRAGMENT}
`;


export default ADD_CLASSGROUP;

