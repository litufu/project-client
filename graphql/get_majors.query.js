import gql from "graphql-tag";

import MAJOR_FRAGMENT from './major.fragment'

const GET_MAJORS = gql`
query getMajors($majorName: String!) {
    getMajors(majorName: $majorName) {
      ... MajorFragment
    }
  }
  ${MAJOR_FRAGMENT}
`;

export default GET_MAJORS;