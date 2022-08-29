import BackDrop from '../Modal/BackDrop';
import classes from './index.module.css';

const Message = (props) => {
    console.log("message");
    return (
        <>
        < BackDrop />
        <div className={ ` ${classes.message_container} `} >
            <div className='modal fade'>

            <div className={`${classes.modal_dialog} ${classes.modal_confirm}`}>
                <div className={`${classes.modal_content}`}>
                    <div className={`${classes.modal_header}`}>
                        <div className={`${classes.icon_box}`}>
                            <i className="material-icons">&#xE876;</i>
                        </div>
                        <h4 className="modal-title w-100">Awesome!</h4>
                    </div>
                    <div className="modal-body">
                        <p className="text-center">Your booking has been confirmed. Check your email for detials.</p>
                    </div>
                    <div className={`${classes.modal_footer}`}>
                        <button className="btn btn-success btn-block" data-dismiss="modal" onClick={props.onClose}>OK</button>
                    </div>
                </div>
            </div>
            </div>
        </div>
        </>
    )
}

export default Message;