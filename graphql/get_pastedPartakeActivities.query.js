import gql from "graphql-tag";

import ACTIVITY_FRAGMENT from './activity.fragment'

const GET_PASTEDPARTAKEACTIVITIES = gql`
query PastedPartakeActivities {
pastedPartakeActivities {
      ... ActivityFragment
    }
  }
  ${ACTIVITY_FRAGMENT}
`;

export default GET_PASTEDPARTAKEACTIVITIES;