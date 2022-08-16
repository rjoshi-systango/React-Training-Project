import classes from './Advertisment.module.css';

const Advertisment = () => {
    return (
        // <div className={classes.advertisment_container}>
        //     <p>Invite Friends To The Fashion Festival $ Get Up To $150 Bonus Every Referal</p>
        //     <button>Invite Now</button>
        // </div>
        <div className={`${classes.invite_bar} container-fluid d-flex flex-column flex-sm-row align-items-center justify-content-center py-2`}>
        <p className={`{${classes.invite_text} m-0`} style={{color: "white"}}>Invite Friends To The Fashion Festival $ Get Up To $150 Bonus Every Referal</p>
        <button class={`${classes.invite_button} mx-4 px-5`}>Invite Now</button>
      </div>
    )
}

export default Advertisment;