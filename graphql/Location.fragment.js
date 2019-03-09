import gql from 'graphql-tag';

const LOCATION_FRAGMENT = gql`
  fragment LocationFragment on Location {
    id
    province{
        id
        code
        name
    }
    city{
        id
        code
        name
    }
    area{
        id
        code
        name
    }
    street{
        id
        code
        name
    }
    village{
        id
        code
        name
    }
  }
`
export default LOCATION_FRAGMENT;