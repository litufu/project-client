import gql from "graphql-tag";
import Message_FRAGMENT from './message.fragment'

const SEND_MESSAGE = gql`
mutation SendMessage(
    $toId: String!
    $text: String
    $image:String
) {
    sendMessage(
        toId: $toId
        text: $text
        image:$image
    ) {
        ...MessageFragment
    }
}
${Message_FRAGMENT}
`

export default SEND_MESSAGE;