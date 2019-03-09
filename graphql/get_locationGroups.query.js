import gql from "graphql-tag";

import LOCATIONGROUP_FRAGMENT from './locationGroup.fragment'

const GET_LOCATIONGROUPS = gql`
{
  locationGroups {
    ...LocationGroupFragment
  }
}
${LOCATIONGROUP_FRAGMENT}
`;

export default GET_LOCATIONGROUPS;