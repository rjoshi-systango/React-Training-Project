import classes from './index.module.css';

const Advertisment = () => {
  return (

    <div className={`${classes.invite_bar} container-fluid d-flex flex-column flex-sm-row align-items-center justify-content-center py-2`}>
      <p className={`${classes.invite_text} m-0 text-center`} >Invite Friends To The Fashion Festival $ Get Up To $150 Bonus Every Referal</p>
      <button className={`${classes.invite_button} ms-5 px-2`}>Invite Now</button>
    </div>
  )
}

export default Advertisment;