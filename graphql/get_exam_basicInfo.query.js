import gql from 'graphql-tag'

import EXAMBASICINFO_FRAGMENT from './exam_basicInfo.fragment'

const GET_EXAMBASICINFO = gql`
  {
    getExamBasicInfo {
      ...ExamBasicInfoFragment
    }
  }
  ${EXAMBASICINFO_FRAGMENT}
`;

export default GET_EXAMBASICINFO;