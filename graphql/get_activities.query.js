import gql from 'graphql-tag'
import ACTIVITY_FRAGMENT from './activity.fragment'

const GET_ACTIVITIES = gql`
query ACTIVITIES(
    $typeId: String,
) {
activities(
    typeId:$typeId,
        ) {
      ... ActivityFragment
    }
  }
  ${ACTIVITY_FRAGMENT}
`;

export default GET_ACTIVITIES;
