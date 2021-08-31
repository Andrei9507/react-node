import React, {useState} from 'react';
import { useMutation} from 'react-apollo';
import {addTimeMutation} from '../queries/queries';
import {useForm} from 'react-hook-form';


const AddTime = props => {
     
    const [amount, setAmount ] = useState('');
    const [description, setDescription ] = useState('');
    const [projectId] = useState(props.projectId)
    const [addTime] = useMutation(addTimeMutation, {
        variables: {
            amount: parseInt(amount),
            description: description,
            projectId: projectId
        }
    })

    const submitAddTime = (e) => {
        e.preventDefault()
        addTime()
        props.triggerCloseAddTime()
    }


    return (
        <form id="add-project" className="card p-4 mb-5" onSubmit={submitAddTime} >
            <div className="form-group">
                <label>Time amount</label>
                <input type="number" name="amount" className="form-control" onChange={ (e) => setAmount(e.target.value)}/>
            </div>
            <div className="form-group">
                <label>Time description</label>
                <textarea type="text" className="form-control" onChange={ (e) => setDescription(e.target.value)}/>
            </div>
            <div className="form-group">
                <button className="btn btn-sm btn-success">Submit</button>
            </div>
        </form>
    )
}

export default AddTime;