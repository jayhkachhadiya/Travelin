import React, { useState } from 'react'
import './forgot.css'

export default function Forgot() {

    const [email, setEmail] = useState("")
    const postDetail = (e) => {
        const data = { email }
        e.preventDefault()
        fetch("http://localhost:2000/api/user/send-reset-password-email", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((result) => {
            result.json().then((resp) => {
                setEmail("")
                console.log(resp)
            })
        })
    }

    return (
        <>
            <div className="form-gap" />
            <div className="container">
                <div className='row'>
                    <div className="" >
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div className="text-center">
                                    <h3>
                                        <i className="fa fa-lock fa-4x" />
                                    </h3>
                                    <h2 className="text-center">Forgot Password?</h2>
                                    <p>You can reset your password here.</p>
                                    <div className="panel-body">
                                        <form
                                            id="register-form"
                                            autoComplete="off"
                                            className="form"
                                        >
                                            <div className="form-group">
                                                <div className="input-group InFi">
                                                    <span className="">
                                                        <i className="" />
                                                    </span>
                                                    <input
                                                        id="email"
                                                        name="email"
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        placeholder="email address"
                                                        className="form-control"
                                                        type="email"
                                                    />
                                                </div>
                                            </div >
                                            <div className="form-group mt-3 ">
                                                <button className="nir-btn ms-2" onClick={postDetail}>Submit</button>
                                            </div>
                                            <input
                                                type="hidden"
                                                className="hide"
                                                name="token"
                                                id="token"
                                                defaultValue=""
                                            />
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-gap" />
            </div>
        </>

    )
}
