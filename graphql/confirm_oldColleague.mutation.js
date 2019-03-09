import gql from "graphql-tag";

import OLDCOLLEAGUE_FRAGMENT from './oldColleague.fragment'

const CONFIRM_OLDCOLLEAGUE = gql`
mutation ConfirmOldColleague(
  $companyId: String!,
  $workerId:String!

){
confirmOldColleague(
    companyId:$companyId,
    workerId:$workerId,
  )   {
    ...OldColleagueFragment
  }
}
${OLDCOLLEAGUE_FRAGMENT}
`;

export default CONFIRM_OLDCOLLEAGUE;