import gql from "graphql-tag";

import PARTNERCONDITION_FRAGMENT from './partnerCondition.fragment'


const ADD_PARTNERCONDITION = gql`
mutation AddPartnerCondition(
  $skillName: String!,
  $number:Int!,
  $place:String!
  $projectId:String!

){
addPartnerCondition(
    skillName:$skillName,
    number:$number,
    place:$place,
    projectId:$projectId,
  )   {
    ...PartnerConditionFragment
  }
}
${PARTNERCONDITION_FRAGMENT}
`;

export default ADD_PARTNERCONDITION;