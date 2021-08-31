import React, {useState} from 'react';
import { useQuery} from 'react-apollo'; // good one
import AddProject from './AddProject';
import ProjectItem from './ProjectItem';
import {getProjectsQuery} from '../queries/queries';




const ProjectList = () => {

    const [showCreate, setShowCreate] = useState(false)
    const { loading, error, data, refetch } = useQuery(getProjectsQuery);
    
    const showAddProjectForm = () => {
        setShowCreate(true) 
    }

    const hideAddProjectForm = () => {
        setShowCreate(false)
    }
            
    // refetch query with async because response is async
    const callProjects = async() => {
        await refetch()
    }

    const displayProjects = () => {
        
        if(loading) {
            return <p>Loading project ...</p>
        }
        if(error) {
            <p>{error}</p>
        }
        if(data) {
            return data.projects.map(project => {
                    return(
                        <ProjectItem key={project.id} projectItem={project} triggerParentUpdate={callProjects} />
                    );
            })
        }
    }
    
    return (
        <div id="main">
            { showCreate ? (
                <React.Fragment>
                    <button className="btn btn-sm btn-danger mb-5" onClick={hideAddProjectForm}>Cancel</button>
                    <AddProject triggerParentUpdate={callProjects} triggerParentHideForm={hideAddProjectForm}/>
                </React.Fragment>
            ) : (
                <button className="btn btn-sm btn-primary mb-5" onClick={showAddProjectForm}>Create Project</button>
            )}
                
            <div id="project-list" className="d-flex justify-content-around flex-wrap">
                {displayProjects()}
            </div>

        </div>
    )
}
export default ProjectList;