import gql from "graphql-tag";

import ACTIVITY_FRAGMENT from './activity.fragment'

const GET_NOWCREATEACTIVITIES = gql`
query NowCreateActivities {
nowCreateActivities {
      ... ActivityFragment
    }
  }
  ${ACTIVITY_FRAGMENT}
`;

export default GET_NOWCREATEACTIVITIES;