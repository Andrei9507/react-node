import {gql} from 'apollo-boost';

// PROJECT
const getProjectsQuery = gql`
    {
        projects {
            name
            description
            id
        }
    }
`

const addProjectMutation = gql`
    mutation($name: String!, $description: String) {
        addProject(name:$name, description: $description){
            description
            name
            id
        }
    }
`

const getProjectQuery = gql`
    query($id: ID){
        project(id: $id) {
            id
            name
            description
            times {
                id
                amount
                description
            }
        }
    }
`



const updateProjectMutation = gql`
    mutation($name: String, $description: String, $id: ID) {
        updateProject(name: $name, description: $description, id: $id){
            description
            name
            id
        }
    }
`


const removeProjectMutation = gql`
    mutation($id: ID) {
        removeProject(id: $id){
            description
            name
            id
        }
    }
`
// TIME 
const addTimeMutation = gql`
    mutation($amount: Int, $description: String, $projectId: ID) {
        addTime(amount: $amount, description: $description, projectId: $projectId){
            description
            amount
            id
        }
    }
`
const removeTimeMutation = gql`
    mutation($id: ID) {
        removeTime(id: $id){
            description
            amount
            id
        }
    }
`


export {getProjectsQuery, addProjectMutation, getProjectQuery, addTimeMutation, updateProjectMutation, removeProjectMutation, removeTimeMutation};