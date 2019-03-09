import gql from "graphql-tag";

const SIGNUP = gql`
mutation signup(
    $username: String!
    $password: String!
    $deviceId:String!
) {
    signup(
        username: $username
        password: $password
        deviceId:$deviceId
    ) {
        token
    }
}
`

export default SIGNUP;