
import { useDispatch } from 'react-redux';
import { 
  open_simple_dialogue, 
  close_simple_dialogue, 
  set_message, 
  set_alert,
  remove_alert 
} from '../Action'


/**
 * 
 * @param {the message to show in the popup window} message 
 * @param {tells which popup to use, alert or dialogue} type 
 */
function autoAlert(){

    const dispatch = useDispatch();

    setTimeout(() => {
        dispatch(close_simple_dialogue());
    }, 10000);

    return (
        <div>
            <div></div>
        </div>
    )
};

export default autoAlert;


