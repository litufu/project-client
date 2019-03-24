import gql from "graphql-tag";

import SCHOOLEDU_FRAGMENT from './schooledu.fragment'
import EXAMBASICINFO_FRAGMENT from './exam_basicInfo.fragment'

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
          id
          name
          studies{
            ...SchoolEduFragment
          }
          exam{
            ...ExamBasicInfoFragment
          }
    }
  }
  ${SCHOOLEDU_FRAGMENT}
  ${EXAMBASICINFO_FRAGMENT}
`;

export default GET_REGSTATUSAPPLICANTS;