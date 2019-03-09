import gql from 'graphql-tag';

const STUDENTS_ADDED_SUBSCRIPTION = gql`
    subscription onStudentsAdded{
        studentsAdded{
            text
        }
    }
`   

export default STUDENTS_ADDED_SUBSCRIPTION;