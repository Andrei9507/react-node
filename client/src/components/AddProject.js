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