import gql from "graphql-tag";

import FAMILYGROUP_FRAGMENT from './familyGroup.fragment'

const GET_FAMILYGROUPS = gql`
{
  getFamilyGroups {
    ...FamilyGroupFragment
  }
}
${FAMILYGROUP_FRAGMENT}
`;

export default GET_FAMILYGROUPS;