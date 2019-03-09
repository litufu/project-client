import gql from "graphql-tag";

import WORKGROUP_FRAGMENT from './workGroup.fragment'

const ADD_WORKGROUP = gql`
mutation AddWorkGroup(
  $companyId: String!,
  $workerId:String!,
){
addWorkGroup(
    companyId:$companyId,
    workerId:$workerId,
  ){
    ...WorkGroupFragment
  }
}
  ${WORKGROUP_FRAGMENT}
`;


export default ADD_WORKGROUP;
