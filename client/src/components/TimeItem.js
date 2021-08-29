import React, {useState} from 'react';
import { useMutation} from 'react-apollo';
import {removeTimeMutation} from '../queries/queries';

export const TimeItem = (props) => {
    
    const [timeAmount] = useState(props.timeItem.amount)
    const [timeId] = useState(props.timeItem.id)
    const [timeDescription] = useState(props.timeItem.description)
    const [removeTimeQuestion, setRemoveTimeQuestion] = useState(false)
    const [removeTime] = useMutation(removeTimeMutation)

    const removeTimeAction = e => {
        e.preventDefault();
        removeTime({
            variables: {
                id: timeId
            }
        })
        .then(() => {
            props.triggerTime()
        });
    }
    
    
    return (
        <tr>
            <td>{timeAmount} H</td>
            <td>{timeDescription} </td>
            <td >
            {(() => {
                    if (removeTimeQuestion) {
                            return (
                            <React.Fragment>
                                <button className="btn btn-sm btn-secondary mr-2"  onClick={() => setRemoveTimeQuestion(false)} >No</button>
                                <button className="btn btn-sm btn-danger"  onClick={removeTimeAction} >Yes</button>
                            </React.Fragment>
                            )
                    }else {
                        return (
                            <React.Fragment>
                                <button className="btn btn-sm btn-danger"  onClick={() => setRemoveTimeQuestion(true)} >Remove</button>
                            </React.Fragment>
                        )
                    }
                })()}
                
            </td>
        </tr>
    )
} 