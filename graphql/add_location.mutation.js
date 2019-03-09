import gql from "graphql-tag";

const ADD_LOCATION = gql`
mutation AddLocation(
  $locationName: String!,
  $location:PlaceInput!

){
  addLocation(
    locationName:$locationName,
    location:$location,
  ){
    id
    name
  }
}
`;


export default ADD_LOCATION;
