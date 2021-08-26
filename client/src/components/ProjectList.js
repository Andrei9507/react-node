import React, {useState} from 'react';
import { useQuery} from 'react-apollo'; // good one
import {AddProject} from './AddProject';
import {ProjectItem} from './ProjectItem';
// import { useQuery } from '@apollo/react-hooks';
// import {flowRight as compose} from 'lodash';
import {getProjectsQuery, removeProjectMutation} from '../queries/queries';
// import ProjectDetails from './ProjectDetails';


export const ProjectList = () => {

    const [showCreate, setShowCreate] = useState(false)
    const [projectList, setProjectList] = useState([])
    const { loading, error, data, refetch } = useQuery(getProjectsQuery,{ onCompleted: setProjectList});
    
    const showAddProjectForm = () => {
        setShowCreate(true) 
    }

    const hideAddProjectForm = () => {
        setShowCreate(false)
    }
            
    // refetch query with async because response are coming later
    const callProjects = async() => {
        await refetch()
            .then((response) => {
                setProjectList(response.data)
                displayProjects()
            })
    }

    const displayProjects = () => {
        
        const data = projectList
        if(!data.projects) {
            return( <div> Loading projects... </div>);
        } else {
            return data.projects.map(project => {
                    return(
                        // handleRemove={this.removeItem} event 
                        <ProjectItem key={project.id} projectItem={project} triggerParentUpdate={callProjects} />
                    );
            })
        }
    }
    
    return (
        <div id="main">
             {(() => {
                if (showCreate) {
                        return (
                            <button className="btn btn-sm btn-danger mb-5" onClick={hideAddProjectForm}>Cancel</button>
                        )
                }else {
                    return (
                        <button className="btn btn-sm btn-primary mb-5" onClick={showAddProjectForm}>Create Project</button>
                    )
                }
                })()}
                
                
                {(() => {
                if (showCreate) {
                        return (
                            <AddProject triggerParentUpdate={callProjects} triggerParentHideForm={hideAddProjectForm}/>
                        )
                }else {
                    // nothing doing for the moment
                }
                })()} 

            <div id="project-list" className="d-flex justify-content-around flex-wrap">
                {displayProjects()}
            </div>

        </div>
    )
}




// import React, {Component, useState, useEffect} from 'react';
// import { graphql,useQuery} from 'react-apollo'; // good one
// import AddProject from './AddProject';
// import ProjectItem from './ProjectItem';
// // import { useQuery } from '@apollo/react-hooks';
// import {flowRight as compose} from 'lodash';
// import {getProjectsQuery, removeProjectMutation} from '../queries/queries';
// import ProjectDetails from './ProjectDetails';

// class ProjectList extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             // selected: null,
//             showCreate: false,
//             itemRemoved: null
//         }
//         this.showAddProjectForm = this.showAddProjectForm.bind(this)
//     }

//     // showAddProjectForm() {
//     //     this.setState({
//     //         showAddProjectForm: true
//     //     })
//     // }

//     // removeItem(data) {
//     //     const projectId = data.projectId 
//     //     this.setState({
//     //         removeItem: projectId
//     //     });

//     //     console.log(this.state.removeItem)
//     //     // this.props.removeProjectMutation({
//     //     //     variables: {
//     //     //         id: data.projectId
//     //     //     },
//     //     //     // refetchQueries: [{query: getProjectsQuery}] // refetch query
//     //     // })
//     // }
    
//     showAddProjectForm() {
//         this.setState(prevState => ({
//             showCreate: !prevState.showCreate
//         }));
//     }

//     displayProjects() {
//         const data = this.props.getProjectsQuery
//         if(data.loading) {
//             return( <div> Loading projects... </div>);
//         } else {
//             return data.projects.map(project => {
//                 return(
//                     // handleRemove={this.removeItem} event 
//                     <ProjectItem key={project.id} projectItem={project}/>
//                 );
//             })
//         }
//     }
//     render() {
//         return (
//             <div id="main">
                
//                 {(() => {
//                 if (this.state.showCreate) {
//                         return (
//                             <button className="btn btn-sm btn-danger mb-5" onClick={this.showAddProjectForm}>Cancel</button>
//                         )
//                 }else {
//                     return (
//                         <button className="btn btn-sm btn-primary mb-5" onClick={this.showAddProjectForm}>Create Project</button>
//                     )
//                 }
//                 })()}
                
                
//                 {(() => {
//                 if (this.state.showCreate) {
//                         return (
//                             <AddProject triggerParentUpdate={this.showAddProjectForm}/>
//                         )
//                 }else {
//                     // nothing doing for the moment
//                 }
//                 })()} 
                
//                 <div id="project-list" className="d-flex justify-content-around flex-wrap">
//                     {this.displayProjects()}
//                 </div>
//             </div>
//         )
//     }
// }


// export default compose(
//     graphql(getProjectsQuery, {name: 'getProjectsQuery'}),
//     graphql(removeProjectMutation, {name: 'removeProjectMutation'})
// )(ProjectList);

// export default graphql(getProjectsQuery)(ProjectList);
