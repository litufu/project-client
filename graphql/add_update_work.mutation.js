import gql from "graphql-tag";
import WORK_FRAGMENT from './work.fragment'

const ADDORUPDATE_WORK = gql`
mutation addOrUpdateWork(
  $companyName: String!,
  $startTime:String,
  $endTime:String,
  $department:String,
  $stationId:String
  $updateId:String
){
  addOrUpdateWork(
    companyName:$companyName,
    startTime:$startTime,
    endTime:$endTime,
    department:$department,
    stationId:$stationId
    updateId:$updateId
  ){
    ...WorkFragment
  }
}
${WORK_FRAGMENT}
`;


export default ADDORUPDATE_WORK;