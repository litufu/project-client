import gql from "graphql-tag";

import FAMILY_FRAGMENT from './family.fragment'

const GET_FAMILIESBYID = gql`
query GetFamiliesById(
    $id: String!,
) {
  getFamiliesById(
        id: $id,
        ) {
      ... FamilyFragment
    }
  }
  ${FAMILY_FRAGMENT}
`;

export default GET_FAMILIESBYID;