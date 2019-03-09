import gql from "graphql-tag";


const GET_LOCATIONGROUPUSERS = gql`
query LocationGroupUsers(
    $locationGroupId: String!,
) {
locationGroupUsers(
    locationGroupId: $locationGroupId,
        ) {
      id
      name
      avatar{
        id
        name
        url
      }
    }
  }
`;

export default GET_LOCATIONGROUPUSERS;