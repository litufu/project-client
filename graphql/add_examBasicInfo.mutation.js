import gql from "graphql-tag";

import EXAMBASICINFO_FRAGMENT from './exam_basicInfo.fragment'

const ADD_EXAMBASICINFO = gql`
mutation AddExamBasicInfo(
  $province: String!,
  $section: String!,
  $score:String!,
  $specialScore:String!
  $examineeCardNumber:String!
){
addExamBasicInfo(
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


export default ADD_EXAMBASICINFO;
