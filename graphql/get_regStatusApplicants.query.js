import gql from "graphql-tag";

import USER_FRAGMENT from './user.fragment'

const GET_REGSTATUSAPPLICANTS = gql`
query GetRegStatusApplicants(
    $education: String!,
    $universityId:String!
    $majorId:String!
) {
    getRegStatusApplicants(
        education: $education,
        universityId:$universityId,
        majorId:$majorId
        ) {
      ... UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

export default GET_REGSTATUSAPPLICANTS;