import React, {useState } from 'react';
import {getProjectQuery, addTimeMutation, removeTimeMutation} from '../queries/queries';
import { useQuery, useMutation} from 'react-apollo';


export const ProjectDetails = (props) => {

    
    const [projectId, setProjectId] = useState(props.match.params.id)
    const [showAddTImeForm, setShowAddTImeForm] = useState(false)
    const [project, setProject ] = useState(null)
    const [timeAmount, setTimeAmount ] = useState('')
    const [timeDescription, setTimeDescription ] = useState('')
    const [addTime] = useMutation(addTimeMutation)
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
        addTime({
            variables: {
                amount: parseInt(timeAmount),
                description: timeDescription,
                projectId: projectId
            }
        })
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









// import React, {Component} from 'react';
// import { graphql } from 'react-apollo';
// import {flowRight as compose} from 'lodash';
// import {getProjectQuery, addTimeMutation} from '../queries/queries';

// class ProjectDetails extends Component {
//     constructor(props) {
//         super(props);
//         this.state= {
//             displayAddTimeForm: false,
//             timeAmount: 0,
//             timeDescription: '',
//             projectId: this.props.data.variables.id
//         }
//         this.showAddTimeForm = this.showAddTimeForm.bind(this)
        
//     }

//     showAddTimeForm() {
//         this.setState(prevState => ({
//             displayAddTimeForm: !prevState.displayAddTimeForm
//         }));
//     }

//     submitForm(e) {
//         e.preventDefault();
//         this.props.addTimeMutation({
//             variables: {
//                 amount: parseInt(this.state.timeAmount),
//                 description: this.state.timeDescription,
//                 projectId: this.state.projectId
//             },
//             refetchQueries: [{query: getProjectQuery,
//                 variables: {
//                     id: this.state.projectId
//                 }
//             }] // refetch query
//         });

//         this.setState(prevState => ({
//             displayAddTimeForm: !prevState.displayAddTimeForm
//         }));

//     }
    
//     displayProjectDetails() {
//         const { project } = this.props.data;
//         if(project) {
//             return(
//                 <div>
//                     <h2>Project Name: {project.name}</h2>
//                     <h2> Project Description: {project.description}</h2>
//                     <div className="justify-content-center d-flex">
//                         <table className="table table-bordered mt-5  project-times text-center">
//                             <thead>
//                                 <tr>
//                                     <td><strong>Time Duration</strong></td>
//                                     <td><strong>Time Description</strong></td>
//                                     <td><strong>Action</strong></td>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {
//                                     project.times.map(item =>{
//                                         return <tr key={item.id}>
//                                             <td>{item.amount}</td>
//                                             <td>{item.description}</td>
//                                             <td > <button className="btn btn-sm btn-danger">Remove</button></td>
//                                         </tr>
//                                     })
//                                 }
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             )
//         } else {
//             return <div>No project selected</div>
//         }
//     }

//     render() {
//         console.log(this.props)
//         return (
//             <div id="project-details">
//                 {this.displayProjectDetails()}
               
//                 {(() => {
//                     if (this.state.displayAddTimeForm) {
//                         return (
//                             <button className="btn btn-sm btn-danger mb-5" onClick={this.showAddTimeForm}>
//                                 Cancel
//                             </button>   
//                         )
//                     } else{
//                         return (
//                             <button className="btn btn-sm btn-primary" onClick={this.showAddTimeForm}>
//                                 Add Time
//                             </button>   
//                         )
//                     }
//                 })()}
            

//                 {(() => {
//                     if (this.state.displayAddTimeForm) {
//                         return (
//                             <form id="add-project" className="card p-4 mb-5" onSubmit={this.submitForm.bind(this) } >
//                                 <div className="form-group">
//                                     <label>Time amount</label>
//                                     <input type="text" className="form-control" onChange={ (e) => this.setState({ timeAmount: e.target.value })}/>
//                                 </div>
//                                 <div className="form-group">
//                                     <label>Time description</label>
//                                     <textarea type="text" className="form-control" onChange={ (e) => this.setState({ timeDescription: e.target.value })}/>
//                                 </div>
//                                 <div className="form-group">
//                                     <button className="btn btn-sm btn-success">Submit</button>
//                                 </div>
//                             </form>
//                         )
//                     }
//                 })()} 
//             </div>
//         );
//     }
// }

// export default compose(
    
//     graphql(addTimeMutation, {name: 'addTimeMutation'}),
//     graphql(getProjectQuery, {
//         options:(props) => {
//             return{
//                 variables: {
//                     id: props.match.params.id
//                 }
//             }
//         }
        
//     })
// )(ProjectDetails);