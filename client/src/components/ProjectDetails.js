import React, {useState } from 'react';
import {getProjectQuery, addTimeMutation, removeTimeMutation} from '../queries/queries';
import { useQuery, useMutation} from 'react-apollo';


export const ProjectDetails = (props) => {

    
    const [projectId, setProjectId] = useState(props.match.params.id)
    const [showAddTImeForm, setShowAddTImeForm] = useState(false)
    const [project, setProject ] = useState(null)
    const [timeAmount, setTimeAmount ] = useState('')
    const [timeDescription, setTimeDescription ] = useState('')
    const [addTime] = useMutation(addTimeMutation, {
        variables: {
            amount: parseInt(timeAmount),
            description: timeDescription,
            projectId: projectId
        }
    })
    const [removeTime] = useMutation(removeTimeMutation)
    
  
    const { loading, error, data, refetch } = useQuery(getProjectQuery,{ 
        variables: {
            id: projectId
        },
        onCompleted: setProject
        
    });
    const showAddTime = () => {
        setShowAddTImeForm(true)
    }

    const hideAddTime = () => {
        setShowAddTImeForm(false)
    }

    const submitAddTime = e => {
        e.preventDefault();
        addTime()
        .then(() => {
            hideAddTime()
            callProject()
        })
    }

    const removeTimeAction = (timeId) => {
        
        removeTime({
            variables: {
                id: timeId
            }
        })
        .then(() => {
            callProject()
        });
    }

    const callProject = async() => {
       await refetch()
            .then((response) => {
                setProject(response.data)
                displayProjectDetails()
            })
    }
    

    const displayProjectDetails = () => {
        
        if(!project) {
            return <div>No project selected</div>
        } else {
            const data = project
            return(
                <div>
                    <h2>Project Name: { data.project.name}</h2>
                    <h2> Project Description: { data.project.description}</h2>
                    <div className="justify-content-center d-flex">
                        <table className="table table-bordered mt-5  project-times text-center">
                            <thead>
                                <tr>
                                    <td><strong>Time Duration</strong></td>
                                    <td><strong>Time Description</strong></td>
                                    <td><strong>Action</strong></td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.project.times.map(item =>{
                                        return <tr key={item.id}>
                                            <td>{item.amount}</td>
                                            <td>{item.description}</td>
                                            <td > <button className="btn btn-sm btn-danger"  onClick={() => removeTimeAction(item.id)} >Remove</button></td>
                                        </tr>
                                    })
                                }
                             
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        }
    }

    return (
        <div id="project-details">
            {displayProjectDetails()}

            {(() => {
                    if (showAddTImeForm) {
                        return (
                            <button className="btn btn-sm btn-danger mb-5" onClick={hideAddTime}>
                                Cancel
                            </button>   
                        )
                    } else{
                        return (
                            <button className="btn btn-sm btn-primary" onClick={showAddTime}>
                                Add Time
                            </button>   
                        )
                    }
                })()}
            

                {(() => {
                    if (showAddTImeForm) {
                        return (
                            <form id="add-project" className="card p-4 mb-5" onSubmit={submitAddTime} >
                                <div className="form-group">
                                    <label>Time amount</label>
                                    <input type="text" className="form-control" onChange={ (e) => setTimeAmount(e.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <label>Time description</label>
                                    <textarea type="text" className="form-control" onChange={ (e) => setTimeDescription(e.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-sm btn-success">Submit</button>
                                </div>
                            </form>
                        )
                    }
                })()} 
        </div>
    )
}