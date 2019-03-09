import gql from "graphql-tag";
import REGSTATUS_FRAGMENT from './regStatus.fragment'

const ADD_REGSTATUS = gql`
mutation AddRegStatus(
  $education: String!,
  $universityId:String!
  $majorId:String!

){
    addRegStatus(
        education:$education,
        universityId:$universityId,
        majorId:$majorId,
  ){
    ...RegStatusFragment
  }
}
${REGSTATUS_FRAGMENT}
`;


export default ADD_REGSTATUS;