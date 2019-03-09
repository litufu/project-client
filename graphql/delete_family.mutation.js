import gql from "graphql-tag";

const DELETE_FAMILY = gql`
mutation($familyId:ID!,$toId:ID!){
  deleteFamily(
    familyId:$familyId,toId:$toId
    )
  {
    id
  }
}
`

export default DELETE_FAMILY;
