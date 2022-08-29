import classes from './index.module.css'; 

import ReactDOM from 'react-dom';
import BackDrop from './BackDrop';

const Modal = (props) => {
    console.log("Modal");
  const portalElement = document.getElementById("overlays");

    return (
        <>
        {ReactDOM.createPortal(<BackDrop onClose={props.onClose} />, portalElement)}
       
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