import BackDrop from '../Modal/BackDrop';
import classes from './index.module.css';

const Message = (props) => {
    console.log("message");
    return (
        <>
        < BackDrop />
        
        <div className={`${classes.box_container} card`}>
      <div style={{borderRadius:'200px', height: '200px', width: '200px', background: '#F8FAF5', margin:'0 auto'}}>
        <i className={`${classes.success_icon} checkmark`} >✓</i>
      </div>
        <h1 className={classes.success_heading}>Success</h1> 
        <p className={classes.success_message}>We received your purchase request;<br/> we'll be in touch shortly!</p>
      </div>
        </>
    )
}

export default Message;