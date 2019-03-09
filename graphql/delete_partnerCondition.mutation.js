import gql from "graphql-tag";

const DELETE_PARTNERCONDITION = gql`
mutation DeletePartnerCondition($id:String!){
    deletePartnerCondition(
    id:$id
    )
  {
    id
  }
}
`

export default DELETE_PARTNERCONDITION;
