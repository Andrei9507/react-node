import React, {useState} from 'react';
import { useQuery} from 'react-apollo'; // good one
import {AddProject} from './AddProject';
import {ProjectItem} from './ProjectItem';
import {getProjectsQuery} from '../queries/queries';


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
            
    // refetch query with async because response is async
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