import React, {useState} from 'react';
import {addProjectMutation} from '../queries/queries';
import { useMutation} from 'react-apollo';
import { useForm } from "react-hook-form";

const AddProject = (props) => {

    const { register, handleSubmit, clearErrors , formState: { errors } } = useForm();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [addProject] = useMutation(addProjectMutation)

    // data  parameter is mandatory to can submit the form
    const submitForm = (data, e) => {
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
        <form id="add-project" className="card p-4 mb-5" onSubmit={handleSubmit(submitForm)}>
            <div className="form-group">
                <label>Project Name</label>
                <input  
                    type="text" 
                    className="form-control"
                    {...register("name", { required: 'Project name is required' } )} 
                    onChange={ (e) => {setName(e.target.value); clearErrors('name'); }}
                />

                {errors.name && (
                    <span role="alert" className="text-danger">{errors.name.message}</span>
                )}
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

export default AddProject;