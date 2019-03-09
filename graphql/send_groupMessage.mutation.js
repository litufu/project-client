import gql from "graphql-tag";
import GROUP_MESSAGE_FRAGMENT from './groupMessage.fragment'

const SEND_GROUP_MESSAGE = gql`
mutation SendGroupMessage(
    $type:String!
    $toId: String!
    $text: String
    $image:String
) {
    sendGroupMessage(
        type: $type
        toId: $toId
        text: $text
        image:$image
    ) {
        ...GroupMessageFragment
    }
}
${GROUP_MESSAGE_FRAGMENT}
`

export default SEND_GROUP_MESSAGE;