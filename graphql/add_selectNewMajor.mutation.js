import gql from "graphql-tag";

const SELECT_NEWMAJOR = gql`
mutation SelectNewMajor(
  $majorId: String!,
  $majorName:String!

){
selectNewMajor(
    majorId:$majorId,
    majorName:$majorName,
  )  @client {
    id
    name
  }
}
`;

export default SELECT_NEWMAJOR;