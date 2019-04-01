import gql from 'graphql-tag';

const ACTIVITYTYPE_FRAGMENT = gql`
  fragment ActivityTypeFragment on ActivityType {
    id
    first
    second
  }
`
export default ACTIVITYTYPE_FRAGMENT;
