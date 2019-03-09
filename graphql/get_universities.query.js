import gql from "graphql-tag";

import UNIVERSITY_FRAGMENT from './university.fragment'

const GET_UNIVERSITIES = gql`
query getMajors($universityName: String!) {
    getUniversities(universityName: $universityName) {
      ... UniversityFragment
    }
  }
  ${UNIVERSITY_FRAGMENT}
`;

export default GET_UNIVERSITIES;