import gql from "graphql-tag";

const SELECT_NEWUNIVERSITY = gql`
mutation SelectNewUniversity(
  $universityId: String!,
  $universityName:String!

){
selectNewUniversity(
    universityId:$universityId,
    universityName:$universityName,
  )  @client {
    id
    name
  }
}
`;

export default SELECT_NEWUNIVERSITY;