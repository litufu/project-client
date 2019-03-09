import gql from "graphql-tag";
import REGSTATUS_FRAGMENT from './regStatus.fragment'

const CANCEL_REGSTATUS = gql`
mutation CancelRegStatus(
  $id: String!,
){
cancelRegStatus(
    id:$id,
  ){
    ...RegStatusFragment
  }
}
${REGSTATUS_FRAGMENT}
`;


export default CANCEL_REGSTATUS;