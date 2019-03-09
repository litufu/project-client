import gql from "graphql-tag";

import CLASSGROUP_FRAGMENT from './classGroup.fragment'

const GET_CLASSGROUPS = gql`
query ClassGroups(
    $schoolEduId: String,
) {
classGroups(
    schoolEduId: $schoolEduId,
        ) {
      ... ClassGroupFragment
    }
  }
  ${CLASSGROUP_FRAGMENT}
`;

export default GET_CLASSGROUPS;