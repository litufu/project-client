import gql from "graphql-tag";
import UNREADMESSAGE_FRAGMENT from  './unReadMessage.fragment'

const ADD_NEWUNREADMESSAGE = gql`
mutation AddNewUnReadMessages(
  $type: String,
  $id:String,
  $lastMessageId:String
){
    addNewUnReadMessages(
        type:$type,
        id:$id,
        lastMessageId:$lastMessageId,
  )  @client {
   ...UnReadMessageFragment
  }
}
${UNREADMESSAGE_FRAGMENT}
`;

export default ADD_NEWUNREADMESSAGE;