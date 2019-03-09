import gql from "graphql-tag";

import PARTNERCONDITION_FRAGMENT from './partnerCondition.fragment'

const GET_MYPARTNERCONDITION = gql`
query MypartnerConditions {
mypartnerConditions{
      ... PartnerConditionFragment
    }
  }
  ${PARTNERCONDITION_FRAGMENT}
`;

export default GET_MYPARTNERCONDITION;