import React, { useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";

export default function Protected(props) {
    const { Component } = props
    const navigate = useNavigate();
    useEffect(() => {
        const userString = localStorage.getItem("user-info")
        const userObject = JSON.parse(userString)
        const status = userObject.status

        if (status !== 200) {
            navigate('/login')
        }
    })
    return (
        <section >
            <Component />
        </section>
    )
}
