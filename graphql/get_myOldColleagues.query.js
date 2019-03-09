import gql from "graphql-tag";

import OLDCOLLEAGUE_FRAGMENT from './oldColleague.fragment'

const GET_MYOLDCOLLEAGUES = gql`
query MyOldColleagues(
    $companyId: String,
) {
myOldColleagues(
  companyId:$companyId,
        ) {
      ... OldColleagueFragment
    }
  }
  ${OLDCOLLEAGUE_FRAGMENT}
`;

export default GET_MYOLDCOLLEAGUES;