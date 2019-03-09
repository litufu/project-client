import gql from "graphql-tag";

import WORKGROUP_FRAGMENT from './workGroup.fragment'

const CONFIRM_WORKGROUP = gql`
mutation ConfirmWorkGroup(
  $companyId: String!,
  $workerId:String!,
){
  confirmWorkGroup(
    companyId:$companyId,
    workerId:$workerId,
  ){
    ...WorkGroupFragment
  }
}
  ${WORKGROUP_FRAGMENT}
`;


export default CONFIRM_WORKGROUP;