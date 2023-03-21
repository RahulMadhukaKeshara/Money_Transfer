import Link from "next/link";
import React, { useState,useEffect } from 'react';
import { useRouter } from "next/router";
import { Form, Button, Col, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';
import jwtDecode from "jwt-decode";
import Axios from 'axios';

function SignIn() {

    const router = useRouter()

    const [signInData, setsignInData] = useState({
        email: '',
        password: ''
    })

    function handleChange(e) {
        const newSignInData = { ...signInData };
        newSignInData[e.target.id] = e.target.value;
        setsignInData(newSignInData);
        console.log(newSignInData)
    }

    //Login User
    const handleSubmit = async (e) => {
        e.preventDefault();
        Axios.post('http://localhost:3000/api/signIn', signInData)
            .then((res) => {
                if (res.data.warn) {
                    Swal.fire({
                        icon: 'error',
                        title: `${res.data.warn}`,
                    })
                }
                else if (res.data.msg) {

                    localStorage.setItem("token", res.data.jwt);
                    Swal.fire({
                        icon: 'success',
                        title: `${res.data.msg}`,
                    })
                    // router.push('/user')
                    window.location = '/user'
                }
                else {

                    Swal.fire({
                        icon: 'info',
                        title: 'Opss...',
                        text: 'Something goes wrong!!',
                    })

                }

            })
            .catch((e) => {
                Swal.fire({
                    icon: 'info',
                    title: 'Opss...',
                    text: 'Something goes wrong!!',
                })
            });

    };

    useEffect(() => {
        if(localStorage.getItem("token")){
            router.push('/user')
        }
    }, []);

    const handleClick = () => {
        router.push('/sign-up')
    }
    return (
        // <div>
        //     {/* <h1>SignIn Page</h1>
        //     <button onClick={handleClick}>Sign Up</button> */}
        // </div>
        <>
            <div className='signin_form_container'>
                <Form className='signin_form' onSubmit={(e) => handleSubmit(e)}>
                    <Row>
                        <Col sm={12} lg={12} md={12}>
                            <Form.Group controlId="email">
                                <Form.Label className="dfg">Email Address</Form.Label>
                                <Form.Control onChange={(e) => handleChange(e)} required value={signInData.email} type="Email" placeholder="Email Address" />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={12} lg={12} md={12}>
                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control onChange={(e) => handleChange(e)} required value={signInData.password} type="password" placeholder="Password" />
                            </Form.Group>
                        </Col>
                    </Row>


                    <div className='signin_form_btns'>
                        <Button className='signin_form_btn1' type="submit">Sign In</Button>
                    </div>

                    <div className='signin_form_text'>
                        <p>Don't Have An Account? <a href='/sign-up' className='signin_form_textlink' >Sign Up Now</a></p>
                    </div>

                </Form>
            </div>
        </>
    )
}

export default SignIn
