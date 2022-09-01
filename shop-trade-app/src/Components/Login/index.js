import { useState } from 'react';
import BackDrop from '../Modal/BackDrop';
import classes from './index.module.css';
import { createUser, isUser } from '../../Store/auth';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Login = (props) => {

    const { FontAwesomeIcon, faEnvelope, faLock } = props;
    const [isExistingUser, setIsExistingUser] = useState(true);

    const dispatch = useDispatch();
    
    const submitClickHandler = (email, password) => {
       
        let user = {
            email, password
        }

        if (isExistingUser) {
            dispatch(isUser(user));
        }
        else {
            dispatch(createUser(user));
        }
        props.closeLogin();
    }
    

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string()
                   .email('Invalid email')
                   .required("required"),
            password: Yup.string()
                   .min(6,"Password must be atleast of 6 characters")
                   .required("required"), 
        }),
      
        onSubmit: (values) => {
            let {email, password} = values;
            submitClickHandler(email, password);
        }
    })


    const switchPageHandler = () => {
        setIsExistingUser(state => !state);
    }


    return (
        <>
            <BackDrop />

            <div className={`card  ${classes.container}`}>

                <div className={`card-header`}> {isExistingUser ? "Log In" : "Sign Up"} </div>


                <div className={`card-body`}>
                    <form onSubmit={formik.handleSubmit}>
                        <div className={` mb-5 d-flex w-100`}>
                            <FontAwesomeIcon className={`align-self-center`} icon={faEnvelope} />
                            <input 
                                type="email" 
                                id="email"  
                                name='email'
                                className={`${classes.input_field} form-control validate`} 
                                placeholder="Your email" 
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                />
                            {formik.errors.email ? <p className={`${classes.error_message}`}>{formik.errors.email}</p> : null}
                        </div>

                        <div className={`mb-5 d-flex w-100`}>
                            <FontAwesomeIcon className={`align-self-center`} icon={faLock} />
                            <input 
                                type="password" 
                                id="password" 
                                className={`${classes.input_field} form-control validate`} 
                                placeholder="Your password" 
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                />
                            {formik.errors.password ? <p className={`${classes.error_message}`}>{formik.errors.password}</p> : null}
                        </div>

                        {isExistingUser &&

                            <div className={`card-footer`}>
                                <button type="text" className={`${classes.btn} btn btn-default`} >LOGIN</button>
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
                                <button type="text" className={`${classes.btn} btn btn-default`}>REGISTER</button>
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