import gql from "graphql-tag";

import USER_FRAGMENT from './user.fragment'

const GET_OLDCOLLEAGUES = gql`
query OldColleagues(
    $startTime: String!,
    $endTime: String!,
    $companyId: String!,
) {
oldColleagues(
    startTime: $startTime,
    endTime: $endTime,
    companyId: $companyId,
        ) {
      ... UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

export default GET_OLDCOLLEAGUES;