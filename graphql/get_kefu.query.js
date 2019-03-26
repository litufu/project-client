import gql from "graphql-tag";

const GET_KEFU = gql`
query KeFu {
    kefu {
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

export default GET_KEFU;

