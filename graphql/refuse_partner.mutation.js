import gql from "graphql-tag";
import PARTNERCONDITION_FRAGMENT from './partnerCondition.fragment'

const REFUSE_PARTNERCONDITION = gql`
mutation RefusePartner(
    $conditionId:String!
) {
    refusePartner(
        conditionId: $conditionId
    ) {
        ...PartnerConditionFragment
    }
}
${PARTNERCONDITION_FRAGMENT}
`

export default REFUSE_PARTNERCONDITION;