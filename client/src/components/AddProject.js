import React, {useState} from 'react';
import {addProjectMutation} from '../queries/queries';
import { useMutation} from 'react-apollo'; // good one

export const AddProject = (props) => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [addProject] = useMutation(addProjectMutation)

    const submitForm = e => {
        e.preventDefault();
        addProject({
            variables: {
                name: name,
                description: description
            }
        })
        .then(() => {
            props.triggerParentUpdate()
            props.triggerParentHideForm()
        })
    }

    return (
        <form id="add-project" className="card p-4 mb-5" onSubmit={submitForm}>
            <div className="form-group">
                <label>Project Name</label>
                <input type="text" className="form-control" onChange={ (e) => setName(e.target.value)}/>
            </div>
            <div className="form-group">
                <label>Project description</label>
                <textarea type="text" className="form-control" onChange={ (e) => setDescription(e.target.value )}/>
            </div>
            <div className="form-group">
                <button className="btn btn-sm btn-success">Submit</button>
            </div>
        </form>
    );
}







// import React, {Component} from 'react';
// import { graphql} from 'react-apollo';
// import {flowRight as compose} from 'lodash';
// import {addProjectMutation, getProjectsQuery} from '../queries/queries';


// class AddProject extends Component {
 
//     state = {
//         name: "",
//         description: ""
//     };
    
//     submitForm(e) {
//         e.preventDefault();
//         this.props.addProjectMutation({
//             variables: {
//                 name: this.state.name,
//                 description: this.state.description
//             },
//             refetchQueries: [{query: getProjectsQuery}] // refetch query
//         }).then(() => {
//             this.props.triggerParentUpdate()
//             this.props.triggerParentHideForm()
//         });

//     }

//     render() {
        
//         return (
//             <form id="add-project" className="card p-4 mb-5" onSubmit={this.submitForm.bind(this) }>
//                 <div className="form-group">
//                     <label>Project Name</label>
//                     <input type="text" className="form-control" onChange={ (e) => this.setState({ name: e.target.value })}/>
//                 </div>
//                 <div className="form-group">
//                     <label>Project description</label>
//                     <textarea type="text" className="form-control" onChange={ (e) => this.setState({ description: e.target.value })}/>
//                 </div>
//                 <div className="form-group">
//                     <button className="btn btn-sm btn-success">Submit</button>
//                 </div>
//             </form>
//         );
//     }
// }
// // for more query we can use with compose EXAMPLE
// // export default compose(
// // graphql(getProjectsQuery, {name: "getProjectsQuery" }),
// // graphql(addProjectMutation, {name: "addProjectMutation" }),
// // )(AddBook);

// // usage
// export default compose(
//     graphql(addProjectMutation, {name: "addProjectMutation"})
// )(AddProject);