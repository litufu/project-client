import gql from 'graphql-tag';

const STATION_FRAGMENT = gql`
  fragment StationFragment on Station {
    id
    code
    name
    
  }
`
export default STATION_FRAGMENT;