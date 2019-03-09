import gql from "graphql-tag";

const GET_USERINFO = gql`
query UserInfo($id: String!) {
    userInfo(id: $id) {
        id
        name
        username
        birthday
        gender
        avatar{
            id
            name
            url
        }
        birthplace{
            id
            name
        }
        residence{
            id
            name
        }
        studies{
            id
            school{
                id
                kind
                name
            }
        }
        works{
            id
            company{
                id
                name
            }
        }
    }
  }
`;

export default GET_USERINFO;

