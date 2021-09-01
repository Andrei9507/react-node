import React, {useState} from 'react';
import { useMutation} from 'react-apollo';
import {addTimeMutation} from '../queries/queries';
import {useForm} from 'react-hook-form';
import PropTypes from 'prop-types'

const AddTime = props => {
     
    const [amount, setAmount ] = useState('');
    const [description, setDescription ] = useState('');
    const [projectId] = useState(props.projectId)
    const { register, handleSubmit, clearErrors , formState: { errors } } = useForm();
    const [addTime] = useMutation(addTimeMutation, {
        variables: {
            amount: parseInt(amount),
            description: description,
            projectId: projectId
        }
    })

    const submitAddTime = (data, e) => {
        e.preventDefault()
        addTime()
        props.triggerCloseAddTime()
    }


    return (
        <form id="add-project" className="card p-4 mb-5" onSubmit={handleSubmit(submitAddTime)} >
            <div className="form-group">
                <label>Time amount</label>
                <input 
                    type="number"
                    className="form-control"
                    {...register('amount', { required: "Amount is required", min: { value: 1, message: 'Minimum amount is 1' }  })} 
                    onChange={ (e) => {setAmount(e.target.value); clearErrors('amount')} }
                />
                {errors.amount && (
                    <span role="alert" className="text-danger">{errors.amount.message}</span>
                )}

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

AddTime.propTypes = {
    projectId: PropTypes.string.isRequired
}
export default AddTime;