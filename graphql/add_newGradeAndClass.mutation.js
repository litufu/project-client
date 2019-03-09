import gql from "graphql-tag";

const ADD_NEWGRADEANDCLASS = gql`
mutation AddNewMajor(
  $grade: Int,
  $className:String

){
addNewGradeAndClass(
    grade:$grade,
    className:$className,
  )  @client {
    id
    grade
    className
  }
}
`;

export default ADD_NEWGRADEANDCLASS;