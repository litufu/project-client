import gql from 'graphql-tag';

const ADVERTISEMENT_FRAGMENT = gql`
  fragment AdvertisementFragment on Advertisement {
    id
    image1
    image2
    image3
    image4
    image5
    startTime
    endTime
  }
`
export default ADVERTISEMENT_FRAGMENT;