import gql from "graphql-tag";

import USER_FRAGMENT from './user.fragment'

const GET_COLLEAGUES = gql`
query Colleagues(
    $companyId: String!,
) {
colleagues(
    companyId: $companyId,
        ) {
      ... UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

export default GET_COLLEAGUES;