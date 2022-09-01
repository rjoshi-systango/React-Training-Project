import { productDataActions } from "./product-slice";

export const createUser = (userData) => {
    let { email, password } = userData;
    return async (dispatch) => {
        const sendUserData = async () => {
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAG9PP6W8vDmLGjlkxp2YPqluEShAfRxM0', {
                method: "POST",
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                }),
                headers: {
                    'content-type': 'application/json'
                },
            })
            if (!response.ok) {
                throw new Error("failed");
            }
            const data = response.json();
            return data;
        }
        try {
            const result = await sendUserData();
            if (result.idToken) {
                alert("Register Succesfull")

            }

        } catch (error) {
            console.log(error);
        }
    }
}

export const isUser = (userData) => {
    return async (dispatch) => {
        let { email, password } = userData;
        console.log(typeof(email));
        console.log(typeof(password));
        console.log(userData);
        const isValid = async () => {
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAG9PP6W8vDmLGjlkxp2YPqluEShAfRxM0', {
                method: "POST",
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                }),
                headers: {
                    'content-type': 'application/json'
                },
            })
            if (!response.ok) {
                throw new Error("Login failed");
            }
            const data = response.json();
            return data;
        }
        try {
            const result = await isValid();
            if (result.idToken) {
                dispatch(productDataActions.setToken({ token: result.idToken }));
                localStorage.setItem('token', result.idToken);
                localStorage.setItem('email', result.email);
            }
        } catch (error) {
            console.log(error);
        }
    }
}


