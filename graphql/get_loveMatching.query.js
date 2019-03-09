import gql from "graphql-tag";
import LOVEMATCHING_FRAGMENT from './loveMatching.fragment'

const GET_LOVEMATCH = gql`
query LoveMatch {
loveMatch {
      ...LoveMatchingFragment
    }
  }
  ${LOVEMATCHING_FRAGMENT}
`;

export default GET_LOVEMATCH;