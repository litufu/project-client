import gql from 'graphql-tag';

const SCHOOL_FRAGMENT = gql`
  fragment SchoolFragment on School {
    id
    name
    kind
    location{
      id
      name
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
    }
  }
`
export default SCHOOL_FRAGMENT;
