import gql from "graphql-tag";

import ACTIVITY_FRAGMENT from './activity.fragment'

const ADD_ACTIVITY = gql`
mutation AddActivity(
  $startTime: String!,
  $endTime: String!,
  $title: String!,
  $content: String!,
  $imageId: String!,
  $number: Int!,
  $typeId: String!,
  $location: String!,

){
addActivity(
    startTime:$startTime,
    endTime:$endTime,
    title:$title,
    content:$content,
    imageId:$imageId,
    number:$number,
    typeId:$typeId,
    location:$location
  ){
    ...ActivityFragment
  }
}
  ${ACTIVITY_FRAGMENT}
`;


export default ADD_ACTIVITY;
