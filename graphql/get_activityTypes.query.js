import gql from 'graphql-tag'
import ACTIVITYTYPE_FRAGMENT from './activityType.fragment'

const ACTIVITYTYPES = gql`
  {
    activityTypes{
        ...ActivityTypeFragment
  }
  }
  ${ACTIVITYTYPE_FRAGMENT}
`;

export default ACTIVITYTYPES;
