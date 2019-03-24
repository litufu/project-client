import gql from "graphql-tag";

const GET_OLDCOLLEAGUES = gql`
query OldColleagues(
    $startTime: String!,
    $endTime: String!,
    $companyId: String!,
) {
oldColleagues(
    startTime: $startTime,
    endTime: $endTime,
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

export default GET_OLDCOLLEAGUES;