import classes from './index.module.css'; 
import BackDrop from './BackDrop';

const Modal = (props) => {
    console.log("Modal");

    return (
        <>
        {(<BackDrop  />)}
       
        <div className={`card w-50 ${classes.modal}` }>
            
            <div className={`card-body `}>Are you want to delete product
            </div>
            <div className="d-flex justify-content-end">
                <div className="card-btn m-1">
                    <button className="btn btn-secondary" onClick={props.onCancel}>cancel</button>
                </div>
                <div className="card-btn m-1">
                    <button className="btn btn-success" onClick={props.onConfirm}>confirm</button>
                </div>

            </div>

        </div>
        </>
    )
}

export default Modal;