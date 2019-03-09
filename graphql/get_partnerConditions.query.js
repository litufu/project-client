import gql from "graphql-tag";

import PARTNERCONDITION_FRAGMENT from './partnerCondition.fragment'

const GET_PARTNERCONDITIONS = gql`
query PartnerConditions(
    $projectId: String,
) {
partnerConditions(
    projectId: $projectId,
        ) {
      ... PartnerConditionFragment
    }
  }
  ${PARTNERCONDITION_FRAGMENT}
`;

export default GET_PARTNERCONDITIONS;