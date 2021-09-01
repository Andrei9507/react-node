import React, {useState} from 'react';
import { useMutation} from 'react-apollo';
import {removeTimeMutation} from '../queries/queries';
import PropTypes from 'prop-types'

const TimeItem = (props) => {
    
    const [timeAmount] = useState(props.timeItem.amount)
    const [timeDescription] = useState(props.timeItem.description)
    const [removeTimeQuestion, setRemoveTimeQuestion] = useState(false)
    const [removeTime] = useMutation(removeTimeMutation)

    const removeTimeAction = e => {
        e.preventDefault();
        removeTime({
            variables: {
                id: props.timeItem.id
            }
        })
        .then(() => {
            props.triggerTime()
        });
    }
    
    
    return (
        <tr>
            <td>{timeAmount} H</td>
            <td>{timeDescription ? timeDescription : 'No description'  } </td>
            <td >
                {removeTimeQuestion ? (
                    <React.Fragment>
                        <button className="btn btn-sm btn-secondary mr-2"  onClick={() => setRemoveTimeQuestion(false)} >No</button>
                        <button className="btn btn-sm btn-danger"  onClick={removeTimeAction} >Yes</button>
                    </React.Fragment>
                ): (
                    <React.Fragment>
                        <button className="btn btn-sm btn-danger"  onClick={() => setRemoveTimeQuestion(true)} >Remove</button>
                    </React.Fragment>
                )}
            </td>
        </tr>
    )
}


TimeItem.propTypes = {
    timeItem: PropTypes.object.isRequired
}

export default TimeItem;