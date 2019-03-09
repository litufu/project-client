import gql from 'graphql-tag';

export const typeDefs = gql`
  type NewSchool {
    id: String!
    name: String!
  }

  type NewMajor {
    id: String!
    name: String!
  }

  type GradeAndClass {
    id:Int
    grade:Int
    className:String
  }

  type Mutation {
    addNewSchool(schoolId:String!,schoolName: String!): NewSchool
    addNewMajor(majorId:String!,majorName: String!): NewMajor
    selectNewMajor(majorId:String!,majorName: String!):NewMajor
    selectNewUniversity(universityId:String!,universityName: String!):NewSchool
    addNewGradeAndClass(grade:Int,className:String): GradeAndClass
    addNewUnReadMessages(type:String,id:String,lastMessageId:String):UnReadMessage
  }

  type Query {
    newSchool:NewSchool
    newMajor:NewMajor
    searchNewMajor:NewMajor
    searchNewUniversity:NewSchool
    newGradeAndClasses:[GradeAndClass]
    getMessages:[Message]
  }

  type Photo{
    id:ID!
    name:String
    url:String
  }

  type User{
    id: ID!
    username: String!
    name:String
    gender:String
    avatar:Photo
  }

  type UnReadMessage{
    id: String!
    type:String
    typeId:String
    lastMessageId:String
  }

  type Message {
  id:String!
  to: User!
  from: User! 
  text: String
  image: Photo
  createdAt: String!
}



type ClassGroupMessage{
  id:String!
  to: ClassGroup!
  from: User!
  text: String
  image: Photo
  createdAt: String!
}

type ClassGroup{
  id:String!
}


type WorkGroupMessage{
  id:String!
  to: WorkGroup!
  from: User!
  text: String
  image: Photo
  createdAt: String!
}

type WorkGroup{
  id:String!
}

type FamilyGroupMessage{
  id:String!
  to: FamilyGroup!
  from: User!
  text: String
  image: Photo
  createdAt: String!
}

type FamilyGroupMessage{
  id:String!
}


type LocationGroupMessage{
  id:ID!
  to: LocationGroup!
  from: User!
  text: String
  image: Photo
  createdAt: String!
}

type LocationGroup{
  id:ID!
}

type RegStatusMessage{
  id:ID!
  to: RegStatus!
  from: User!
  text: String
  image: Photo
  createdAt: String!
}

type RegStatus{
  id:ID!
}



`;