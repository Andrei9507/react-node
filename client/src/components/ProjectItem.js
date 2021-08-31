import React, {useState} from 'react';
import { useMutation} from 'react-apollo';
import {updateProjectMutation, removeProjectMutation, getProjectsQuery} from '../queries/queries';
import {Link } from 'react-router-dom';
import PropTypes from 'prop-types'

const ProjectItem = (props) => {

    console.log(props)
    const [projectId] = useState(props.projectItem.id)
    const [projectName, setProjectName] = useState(props.projectItem.name)
    const [projectDescription, setProjectDescription] = useState(props.projectItem.description)
    const [showEdit, setShowEdit] = useState(false)
    const [removeProjectAsk, setRemoveProjectAsk] = useState(false)
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

            {!showEdit ? (
               
                <div className="card mb-5" style={{width: "18rem"}}>
                    <div className="card-body">
                    <   h5 className="card-title">Project Name: {projectName}</h5>
                        <p className="card-text"> Project Description: {projectDescription ? projectDescription : 'No description'}</p>
                    
                    </div>
                    <div className="card-footer justify-content-center">
                    { !removeProjectAsk ? (
                        <React.Fragment>
                            <Link to={`/projects/${projectId}`} className="btn btn-sm btn-info" >Project Details</Link>

                            <button className="btn btn-sm btn-secondary ml-2" onClick={showEditForm}>Edit</button>
                            <button className="btn btn-sm btn-danger ml-2"  onClick={ (e) => setRemoveProjectAsk(true)}>Remove</button>
                        </React.Fragment>
                    ) : (
                        <div className="justify-content-center d-flex" >
                            <button className="btn btn-sm btn-secondary ml-2"  onClick={ (e) => setRemoveProjectAsk(false)}>No</button>    
                            <button className="btn btn-sm btn-danger ml-2"  onClick={removeProjectAction}>Yes</button>
                        </div>
                    )}
                    </div>

                </div>
            ) : (
               
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
            )}

                
            </React.Fragment>
        )

}

ProjectItem.propTypes = {
    projectItem: PropTypes.object
}
console.log(ProjectItem.propTypes )
export default ProjectItem;