import React, {useState } from 'react';
import {getProjectQuery} from '../queries/queries';
import { useQuery} from 'react-apollo';
import {TimeItem} from './TimeItem'
import {AddTime} from './AddTime';


export const ProjectDetails = (props) => {

    
    const [projectId] = useState(props.match.params.id)
    const [showAddTImeForm, setShowAddTImeForm] = useState(false)
    const [project, setProject ] = useState(null)
  
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
        callProject()
    }

    const displayTotalHours = () => {
        if(project) {
            const data = project
            if(data.project.times.length) {
                let sum = data.project.times.map(el => el.amount).reduce((accumulator, currentValue) => { return accumulator + currentValue });
                
                return sum
            }
            return <React.Fragment>0 </React.Fragment>
           
        }
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
                                    <td><strong>Time Amount</strong></td>
                                    <td><strong>Time Description</strong></td>
                                    <td><strong>Action</strong></td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.project.times.map(item =>{
                                        return (
                                            <TimeItem key={item.id} timeItem={item} triggerTime={callProject}/>
                                        )
                                    })
                                }
                             <tr>
                                <td colSpan="3">
                                    Total Hours: {displayTotalHours()}
                                </td>
                            </tr>
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
                            <AddTime  projectId={projectId} triggerCloseAddTime={hideAddTime}/>
                        )
                    }
                })()} 
        </div>
    )
}