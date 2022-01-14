import axios from "axios";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { API_URL } from "../constants";
import "../styles/Signup.css";

function Signup() {
    const [user, setUser] = useState(undefined);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signUpError, setSignupError] = useState(undefined);

    const history = useHistory();

    const handleSignup = (event) => {
        event.preventDefault();

        const req = {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
        };
        axios({
            method: "POST",
            url: `${API_URL}/signup`,
            headers: { "Content-Type": "application/json" },
            data: req,
        })
            .then((result) => {
                const { user } = result.data;
                // localStorage.setItem("user", JSON.stringify(user));

                setUser(user);
                history.push("/");
            })
            .catch((err) => {
                console.log(err);

                setSignupError("Error Signing Up");
            });
    };
    return (
        <div className="signup">
            <Link to="/">
                <img
                    className="login__logo"
                    src="http://media.corporate-ir.net/media_files/IROL/17/176060/Oct18/Amazon%20logo.PNG"
                    alt="not found"
                />
            </Link>
            <div className="signup__container">
                <h1 className="signup__title">Create an account</h1>
                <form action="">
                    {signUpError ? <h5 className="signup__alert ">{signUpError}</h5> : null}
                    <h5>First name</h5>
                    <input type="text" required value={firstName} onChange={(event) => setFirstName(event.target.value)} />
                    <h5>Last name</h5>
                    <input type="text" value={lastName} onChange={(event) => setLastName(event.target.value)} />

                    <h5>Email </h5>
                    <input type="text" required value={email} onChange={(event) => setEmail(event.target.value)} />

                    <h5>Password</h5>
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />

                    <button type="submit" onClick={(event) => handleSignup(event)}>
                        Sign up
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
