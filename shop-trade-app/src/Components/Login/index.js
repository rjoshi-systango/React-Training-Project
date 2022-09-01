import { useRef, useState } from 'react';
import BackDrop from '../Modal/BackDrop';
import classes from './index.module.css';
import { createUser, isUser } from '../../Store/auth';
import { useDispatch } from 'react-redux';


const Login = (props) => {

    const { FontAwesomeIcon, faEnvelope, faLock } = props;
    const [isExistingUser, setIsExistingUser] = useState(true);

    const dispatch = useDispatch();

    const enteredEmail = useRef();
    const enteredPassword = useRef();

    const switchPageHandler = () => {
        setIsExistingUser(state => !state);
    }

    const submitClickHandler = (event) => {
        event.preventDefault();
        let email = enteredEmail.current.value;
        let password = enteredPassword.current.value;
        let user = {
            email, password
        }
        if (isExistingUser) {
            dispatch(isUser(user));
            props.closeLogin();
        }
        else {
            dispatch(createUser(user));
        }

        enteredEmail.current.value = '';
        enteredPassword.current.value = '';
    }

    return (
        <>
            <BackDrop />

            <div className={`card  ${classes.container}`}>

                <div className={`card-header`}> {isExistingUser ? "Log In" : "Sign Up"} </div>


                <div className={`card-body`}>
                    <form onSubmit={submitClickHandler}>
                        <div className={` mb-5 d-flex w-100`}>
                            <FontAwesomeIcon className={`align-self-center`} icon={faEnvelope} />
                            <input type="email" id="defaultForm-email" ref={enteredEmail} className={`${classes.input_field} form-control validate`} placeholder="Your email" />
                            <label data-error="wrong" data-success="right" htmlFor="defaultForm-email"></label>
                        </div>
                        <div className={`mb-5 d-flex w-100`}>
                            <FontAwesomeIcon className={`align-self-center`} icon={faLock} />
                            <input type="password" id="defaultForm-password" ref={enteredPassword} className={`${classes.input_field} form-control validate`} placeholder="Your password" />
                            <label data-error="wrong" data-success="right" htmlFor="defaultForm-password"></label>
                        </div>

                        {isExistingUser &&

                            <div className={`card-footer`}>
                                <button className={`${classes.btn} btn btn-default`} >LOGIN</button>
                                <div>
                                    <span style={{ color: 'gray' }}> OR</span>
                                </div>
                                <div>
                                    <p onClick={switchPageHandler}>Create New Account</p>
                                </div>
                            </div>
                        }

                        {!isExistingUser &&

                            <div className={`card-footer`}>
                                <button className={`${classes.btn} btn btn-default`}>REGISTER</button>
                                <div>
                                    <span style={{ color: 'gray' }}> OR</span>
                                </div>
                                <div>
                                    <p onClick={switchPageHandler}>LOGIN</p>
                                </div>
                            </div>
                        }
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;