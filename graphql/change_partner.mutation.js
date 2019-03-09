import gql from "graphql-tag";

import PARTNERCONDITION_FRAGMENT from './partnerCondition.fragment'

const CHANGE_PARTNER = gql`
mutation ChangePartner(
  $conditionId: String!,
  $uid:String!,
){
changePartner(
    conditionId:$conditionId,
    uid:$uid,
  ){
    ...PartnerConditionFragment
  }
}
  ${PARTNERCONDITION_FRAGMENT}
`;


export default CHANGE_PARTNER;
