import gql from 'graphql-tag'

const LOGOUT = gql`
mutation Logout{
    logout {
        id
    }
}
`

export default LOGOUT;
