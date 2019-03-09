import gql from 'graphql-tag'
// import ADVERTISEMENT_FRAGMENT from './advertisement.fragment'

const ADVERTISEMENTS = gql`
  {
    advertisements{
        id
        image1
        image2
        image3
        image4
        image5
        startTime
        endTime
  }
  }
`;

export default ADVERTISEMENTS;


