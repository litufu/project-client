import gql from "graphql-tag";

const GET_COLLEAGUES = gql`
query Colleagues(
    $companyId: String!,
) {
colleagues(
    companyId: $companyId,
        ) {
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

export default GET_COLLEAGUES;