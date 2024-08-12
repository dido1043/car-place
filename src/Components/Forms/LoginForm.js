import React, { useState } from "react";
import axios from 'axios'
import Label from '../Shared/Label';
import BaseButton from '../Shared/BaseButton'
import InputField from '../Shared/InputField';
import StatusComponent from '../Shared/StatusComponent';
function LoginForm() {
    //TODO
    const [state , setState] = useState({
        email : "",
        password : "",
        successMessage: null
    })
    return (
        <div className="login-form">
            <div className="header flex justify-center items-center">
                <h2 >Login</h2>
            </div>
            <form>
                <Label text="Email" />
                
            </form>
        </div>
    )
}
export default LoginForm