import React, {useState} from 'react';
import { useMutation} from 'react-apollo';
import {updateProjectMutation, removeProjectMutation, getProjectsQuery} from '../queries/queries';
import {Link } from 'react-router-dom';

export const ProjectItem = (props) => {

    const [projectId, setProjectId] = useState(props.projectItem.id)
    const [projectName, setProjectName] = useState(props.projectItem.name)
    const [projectDescription, setProjectDescription] = useState(props.projectItem.description)
    const [showEdit, setShowEdit] = useState(false)
    const [updateProject] = useMutation(updateProjectMutation)
    const [removeProject] = useMutation(removeProjectMutation)


    const showEditForm = () => {
        setShowEdit(true)
    }

    const hideEditForm = () => {
        setShowEdit(false)
    }

    const submitForm = e => {
        e.preventDefault();
        updateProject({
            variables: {
                id: projectId,
                name: projectName,
                description: projectDescription
            }
            // refetchQueries: [{query: getProjectsQuery}] // refetch query
        }).then(() => {
            hideEditForm()
        });
        
    }

    const removeProjectAction = e => {
        e.preventDefault();
        removeProject({
            variables: {
                id: projectId
            },
            refetchQueries: [{query: getProjectsQuery}] // refetch query
        })
        .then(() => {
            props.triggerParentUpdate()
        });
    }

    return (
        <React.Fragment>
                {(() => {
                    if (!showEdit) {
                            return (
                                <div className="card mb-5" style={{width: "18rem"}}>
                                    <div className="card-body">
                                        <h5 className="card-title">Project Name: {projectName}</h5>
                                        <p className="card-text"> Project Description: {projectDescription}</p>
                                        
                                    </div>
                                    <div className="card-footer justify-content-center">
                                        <Link to={`/projects/${projectId}`} className="btn btn-sm btn-info" >Project Details</Link>
                                        <button className="btn btn-sm btn-secondary ml-2" onClick={showEditForm}>Edit</button>
                                        <button className="btn btn-sm btn-danger ml-2"  onClick={removeProjectAction}>Remove</button>
                                    </div>

                                </div>
                            )
                    }else {
                        return (
                            <div className="card mb-5" style={{width: "18rem"}}>
                                <form onSubmit={submitForm}>
                                    <div className="card-body">
                                        <input className="form-control mb-2" value={projectName}  onChange={ (e) => setProjectName(e.target.value)} />
                                        <textarea className="form-control" value={projectDescription} onChange={ (e) => setProjectDescription(e.target.value)} ></textarea>
                                    </div>
                                    <div className="justify-content-center d-flex card-footer">
                                        <button className="btn btn-sm btn-success mt-1" >Update</button>
                                        <button className="btn btn-sm btn-danger mt-1 ml-2" onClick={hideEditForm} >Cancel</button>
                                    </div>
                                </form>
                            </div>
                            
                        )
                    }
                })()}
            </React.Fragment>
    )

}




// import React, {Component} from 'react';
// import { graphql } from 'react-apollo';
// import {Link } from 'react-router-dom';
// import {flowRight as compose} from 'lodash';
// import {updateProjectMutation, removeProjectMutation, getProjectsQuery} from '../queries/queries';

// class ProjectItem extends Component {

//     constructor(props) {
//         super(props)
//         this.state = {
//             // selected: null,
//             projectId: this.props.projectItem.id,
//             projectName: this.props.projectItem.name,
//             projectDescription: this.props.projectItem.description,
//             showEdit: false
//         }
//         this.showEditProjectForm = this.showEditProjectForm.bind(this)
//     }

//     showEditProjectForm() {
//         this.setState(prevState => ({
//             showEdit: !prevState.showEdit
//         }));
//     }

//     // fix error after remove item
//     removeProject(e) {
//         e.preventDefault();
//         this.props.removeProjectMutation({
//             variables: {
//                 id: this.state.projectId
//             },
//             refetchQueries: [{query: getProjectsQuery}] // refetch query
//         })
//         .then(() => {
//             this.props.triggerParentUpdate()
//         });
//     }

//     submitForm(e) {
//         e.preventDefault();
//         this.props.updateProjectMutation({
//             variables: {
//                 id: this.state.projectId,
//                 name: this.state.projectName,
//                 description: this.state.projectDescription
//             }
//             // refetchQueries: [{query: getProjectsQuery}] // refetch query
//         }).then(() => {
//             this.showEditProjectForm()
//         });
//     }

//     render() {
//         // console.log(this.props)
//         return (
//             <React.Fragment>
//                 {(() => {
//                     if (!this.state.showEdit) {
//                             return (
//                                 <div className="card mb-5" style={{width: "18rem"}}>
//                                     <div className="card-body">
//                                         <h5 className="card-title">Project Name: {this.props.projectItem.name}</h5>
//                                         <p className="card-text"> Project Description: {this.props.projectItem.description}</p>
                                        
//                                     </div>
//                                     <div className="card-footer justify-content-center">
//                                         <Link to={`/projects/${this.props.projectItem.id}`} className="btn btn-sm btn-info" >Project Details</Link>
//                                         <button className="btn btn-sm btn-secondary ml-2" onClick={this.showEditProjectForm}>Edit</button>
//                                         <button className="btn btn-sm btn-danger ml-2"  onClick={this.removeProject.bind(this) }>Remove</button>
//                                     </div>

//                                 </div>
//                             )
//                     }else {
//                         return (
//                             <div className="card mb-5" style={{width: "18rem"}}>
//                                 <form onSubmit={this.submitForm.bind(this) }>
//                                     <div className="card-body">
//                                             <input className="form-control mb-2" value={this.state.projectName}  onChange={ (e) => this.setState({ projectName: e.target.value })} />
//                                         <textarea className="form-control" value={this.state.projectDescription} onChange={ (e) => this.setState({ projectDescription: e.target.value })} ></textarea>
                                        
//                                     </div>
//                                     <div className="justify-content-center d-flex card-footer">
//                                             <button className="btn btn-sm btn-success mt-1" >Update</button>
//                                             <button className="btn btn-sm btn-danger mt-1 ml-2" onClick={this.showEditProjectForm} >Cancel</button>
//                                     </div>
//                                 </form>
//                             </div>
                            
//                         )
//                     }
//                 })()}
//             </React.Fragment>
            
           
//         )
//     }
// }


// export default compose(
//     graphql(updateProjectMutation, {name: 'updateProjectMutation'}),
//     graphql(removeProjectMutation, {name: 'removeProjectMutation'}),
//     graphql(getProjectsQuery, {name: 'getProjectsQuery'})
// )(ProjectItem);
