import gql from "graphql-tag";


const FINDPASSWORD = gql`
mutation FindPassword($forgetterId: String!){
    findPassword(forgetterId:$forgetterId){
        id
        times
        forgetter{
            id
        }
        remmember{
            id
        }
  }
}
`

export default FINDPASSWORD;