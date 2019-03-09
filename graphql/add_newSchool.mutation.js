import gql from "graphql-tag";

const ADD_NEWSCHOOL = gql`
mutation AddNewSchool(
  $schoolId: String!,
  $schoolName:String!

){
addNewSchool(
    schoolId:$schoolId,
    schoolName:$schoolName,
  )  @client {
    id
    name
  }
}
`;

export default ADD_NEWSCHOOL;