import gql from "graphql-tag";

import ACTIVITY_FRAGMENT from './activity.fragment'

const GET_PASTEDCREATEACTIVITIES = gql`
query PastedCreateActivities {
pastedCreateActivities {
      ... ActivityFragment
    }
  }
  ${ACTIVITY_FRAGMENT}
`;

export default GET_PASTEDCREATEACTIVITIES;