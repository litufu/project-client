import gql from 'graphql-tag';

const LOVESETTING_FRAGMENT = gql`
  fragment LoveSettingFragment on LoveSetting {
    id
    myHeight
    myWeight
    otherHeightMin
    otherHeightMax
    otherWeightMin
    otherWeightMax
    otherAgeMin
    otherAgeMax
    dateTime
    datePlace
    memeberGrade
    memeberGradeEndTime
    user{
        id
    }
  }
`
export default LOVESETTING_FRAGMENT;