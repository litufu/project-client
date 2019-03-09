import gql from "graphql-tag";

import WORKGROUP_FRAGMENT from './workGroup.fragment'

const GET_WORKGROUPS = gql`
query WorkGroups(
    $companyId: String,
) {
workGroups(
    companyId: $companyId,
        ) {
      ... WorkGroupFragment
    }
  }
  ${WORKGROUP_FRAGMENT}
`;

export default GET_WORKGROUPS;