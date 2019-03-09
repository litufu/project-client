import gql from "graphql-tag";

import FAMILY_FRAGMENT from './family.fragment'

const GET_FAMILIES = gql`
{
  families {
    ...FamilyFragment
  }
}
${FAMILY_FRAGMENT}
`;

export default GET_FAMILIES;