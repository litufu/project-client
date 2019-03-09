import GET_NEWGRADEANDCLASSES from '../graphql/get_newGradeAndClasses.query'
import  GET_NEWUNREADMESSAGES from '../graphql/get_newUnReadMessages.query'

let nextGradeAndClassId = 0;

export const resolvers = {
  
    Mutation: {
      addNewSchool:(_, { schoolId,schoolName }, { cache }) => {
        const data = {
            newSchool: {
              __typename: 'NewSchool',
              id: schoolId,
              name:schoolName,
            },
          };
        cache.writeData({ data });
        return null;
      },
      addNewMajor:(_, { majorId,majorName }, { cache }) => {
        const data = {
            newMajor: {
              __typename: 'NewMajor',
              id: majorId,
              name:majorName,
            },
          };
        cache.writeData({ data });
        return null;
      },
      selectNewUniversity:(_, { universityId,universityName }, { cache }) => {
        const data = {
          searchNewUniversity: {
              __typename: 'NewSchool',
              id: universityId,
              name:universityName,
            },
          };
        cache.writeData({ data });
        return null;
      },
      selectNewMajor:(_, { majorId,majorName }, { cache }) => {
        const data = {
          searchNewMajor: {
              __typename: 'NewMajor',
              id: majorId,
              name:majorName,
            },
          };
        cache.writeData({ data });
        return null;
      },
      addNewUnReadMessages:(_, { type,id,lastMessageId }, { cache }) => {

        const previous = cache.readQuery({ query: GET_NEWUNREADMESSAGES });
        console.log(previous)
        // 检查是否存在，存在更新，不存在新增
        const isExist = previous.newUnreadMessages.filter(unReadMessage=>{
          if(unReadMessage.type===type && unReadMessage.typeId===id){
            return true
          }
        }).length>0
        let newUnreadMessages
        if(isExist){
          newUnreadMessages = previous.newUnreadMessages.map(
            unReadMessage=>{
              if(unReadMessage.type===type && unReadMessage.typeId===id){
                return {
                  ...unReadMessage,
                  lastMessageId:lastMessageId
                }
              }else{
                return unReadMessage
              }
            }
          )
        }else{
          const newUnReadMessage = {
            __typename:"UnReadMessage",
            id:`${type}${id}`,
            type,
            typeId:id,
            lastMessageId,
          }
          newUnreadMessages = [...previous.newUnreadMessages,newUnReadMessage]
        }
      
        const data = {
          newUnreadMessages: newUnreadMessages,
        };
        cache.writeData({ data });
        return newUnreadMessages;
      },
      
      addNewGradeAndClass:(_, { grade,className }, { cache }) => {

        const previous = cache.readQuery({ query: GET_NEWGRADEANDCLASSES });
        
        const newGradeAndClass = {
            __typename: 'GradeAndClass',
            id: nextGradeAndClassId++,
            grade:grade,
            className:className
          };
        console.log(newGradeAndClass)
        const data = {
          newGradeAndClasses: previous.newGradeAndClasses.concat([newGradeAndClass]),
        };
        cache.writeData({ data });
        return newGradeAndClass;
      },
    },
  };