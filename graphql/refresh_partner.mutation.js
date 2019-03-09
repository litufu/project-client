import gql from "graphql-tag";
import PARTNERCONDITION_FRAGMENT from './partnerCondition.fragment'

const REFRESH_PARTNERCONDITION = gql`
mutation RefreshPartner(
    $conditionId:String!
) {
    refreshPartner(
        conditionId: $conditionId
    ) {
        ...PartnerConditionFragment
    }
}
${PARTNERCONDITION_FRAGMENT}
`

export default REFRESH_PARTNERCONDITION;