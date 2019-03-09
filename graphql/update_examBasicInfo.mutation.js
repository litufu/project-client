import gql from "graphql-tag";

import EXAMBASICINFO_FRAGMENT from './exam_basicInfo.fragment'

const UPDATE_EXAMBASICINFO = gql`
mutation UpdateExamBasicInfo(
  $province: String!,
  $section: String!,
  $score:String!,
  $specialScore:String!
  $examineeCardNumber:String!
){
updateExamBasicInfo(
    province:$province,
    section:$section,
    score:$score,
    specialScore:$specialScore
    examineeCardNumber:$examineeCardNumber
  ){
    ...ExamBasicInfoFragment
  }
}
  ${EXAMBASICINFO_FRAGMENT}
`;


export default UPDATE_EXAMBASICINFO;
