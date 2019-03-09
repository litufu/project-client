import gql from "graphql-tag";
import SCHOOLEDU_FRAGMENT from './schooledu.fragment'

const ADD_STUDY = gql`
mutation AddStudy(
  $year: String!,
  $schoolId:String,
  $majorId:String,
  $grade:Int,
  $className:String
){
addStudy(
    year:$year,
    schoolId:$schoolId,
    majorId:$majorId,
    grade:$grade,
    className:$className
  ){
    ...SchoolEduFragment
  }
}
${SCHOOLEDU_FRAGMENT}
`;


export default ADD_STUDY;