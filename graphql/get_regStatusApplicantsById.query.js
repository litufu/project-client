import gql from "graphql-tag";

import SCHOOLEDU_FRAGMENT from './schooledu.fragment'
import EXAMBASICINFO_FRAGMENT from './exam_basicInfo.fragment'

const GET_REGSTATUSAPPLICANTSBYID = gql`
query GetRegStatusApplicantsById(
    $regStatusId: String!,
) {
    getRegStatusApplicantsById(
        regStatusId: $regStatusId,
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

export default GET_REGSTATUSAPPLICANTSBYID;