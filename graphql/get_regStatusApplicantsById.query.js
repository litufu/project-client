import gql from "graphql-tag";

import USER_FRAGMENT from './user.fragment'

const GET_REGSTATUSAPPLICANTSBYID = gql`
query GetRegStatusApplicantsById(
    $regStatusId: String!,
) {
    getRegStatusApplicantsById(
        regStatusId: $regStatusId,
        ) {
      ... UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

export default GET_REGSTATUSAPPLICANTSBYID;