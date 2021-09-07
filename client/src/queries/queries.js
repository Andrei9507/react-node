import {gql} from 'apollo-boost';

// PROJECT
const getProjectsQuery = gql`
    query GetProjects {
        projects {
            name
            description
            id
        }
    }
`

const addProjectMutation = gql`
    mutation AddProject($name: String!, $description: String) {
        addProject(name:$name, description: $description){
            description
            name
            id
        }
    }
`

const getProjectQuery = gql`
    query GetProject($id: ID){
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
    mutation UpdateProject($name: String, $description: String, $id: ID) {
        updateProject(name: $name, description: $description, id: $id){
            description
            name
            id
        }
    }
`


const removeProjectMutation = gql`
    mutation RemoverProject($id: ID) {
        removeProject(id: $id){
            description
            name
            id
        }
    }
`
// TIME 
const addTimeMutation = gql`
    mutation AddTime($amount: Int, $description: String, $projectId: ID) {
        addTime(amount: $amount, description: $description, projectId: $projectId){
            description
            amount
            id
        }
    }
`
const removeTimeMutation = gql`
    mutation RemoveTime($id: ID) {
        removeTime(id: $id){
            description
            amount
            id
        }
    }
`


export {getProjectsQuery, addProjectMutation, getProjectQuery, addTimeMutation, updateProjectMutation, removeProjectMutation, removeTimeMutation};