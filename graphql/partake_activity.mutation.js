import gql from "graphql-tag";

import ACTIVITY_FRAGMENT from './activity.fragment'

const PARTAKE_ACTIVITY = gql`
mutation PartakeActivity(
  $activityId: String!,
){
partakeActivity(
    activityId:$activityId,
  ){
    ...ActivityFragment
  }
}
  ${ACTIVITY_FRAGMENT}
`;


export default PARTAKE_ACTIVITY;
