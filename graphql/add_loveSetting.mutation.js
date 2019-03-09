import gql from "graphql-tag";

import LOVESETTING_FRAGMENT from './loveSetting.fragment'

const ADD_UPDATE_LOVESETTING = gql`
mutation AddOrUpdateLoveSetting(
    $myHeight:Int,
    $myWeight:Int,
    $otherHeightMin:Int,
    $otherHeightMax:Int,
    $otherWeightMin:Int,
    $otherWeightMax:Int,
    $otherAgeMin:Int,
    $otherAgeMax:Int,
    $dateTime:String,
    $datePlace:String,
){
addOrUpdateLoveSetting(
    myHeight:$myHeight,
    myWeight:$myWeight,
    otherHeightMin:$otherHeightMin,
    otherHeightMax:$otherHeightMax,
    otherWeightMin:$otherWeightMin,
    otherWeightMax:$otherWeightMax,
    otherAgeMin:$otherAgeMin,
    otherAgeMax:$otherAgeMax,
    dateTime:$dateTime,
    datePlace:$datePlace
  ){
    ...LoveSettingFragment
  }
}
  ${LOVESETTING_FRAGMENT}
`;


export default ADD_UPDATE_LOVESETTING;
