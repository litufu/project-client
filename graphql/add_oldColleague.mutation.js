import gql from "graphql-tag";

import OLDCOLLEAGUE_FRAGMENT from './oldColleague.fragment'


const ADD_OLDCOLLEAGUE = gql`
mutation AddOldColleague(
  $companyId: String!,
  $workerId:String!

){
addOldColleague(
    companyId:$companyId,
    workerId:$workerId,
  )   {
    ...OldColleagueFragment
  }
}
${OLDCOLLEAGUE_FRAGMENT}
`;

export default ADD_OLDCOLLEAGUE;