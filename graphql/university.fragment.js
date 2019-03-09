import gql from 'graphql-tag';

const UNIVERSITY_FRAGMENT = gql`
  fragment UniversityFragment on University {
    id
    name
    department
    education
    location
    desc
  }
`
export default UNIVERSITY_FRAGMENT;