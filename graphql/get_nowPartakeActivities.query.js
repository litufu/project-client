import gql from "graphql-tag";

import ACTIVITY_FRAGMENT from './activity.fragment'

const GET_NOWPARTAKEACTIVITIES = gql`
query NowPartakeActivities {
nowPartakeActivities {
      ... ActivityFragment
    }
  }
  ${ACTIVITY_FRAGMENT}
`;

export default GET_NOWPARTAKEACTIVITIES;