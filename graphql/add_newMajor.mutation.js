import gql from "graphql-tag";

const ADD_NEWMAJOR = gql`
mutation AddNewMajor(
  $majorId: String!,
  $majorName:String!

){
addNewMajor(
    majorId:$majorId,
    majorName:$majorName,
  )  @client {
    id
    name
  }
}
`;

export default ADD_NEWMAJOR;