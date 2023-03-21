import Link from "next/link";
import React, { useState } from 'react';
import { useRouter } from "next/router";
import { Form, Button, Col, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';
import jwtDecode from "jwt-decode";
import Axios from 'axios';

export default function SignUp(){

    const router = useRouter()
    const [signUpData , setSignUpData] = useState({

        fname : "",
        lname : "",
        contact : "",
        email : "",
        password : "",
        signUpConfirmPass : "" 

    })

    function handleChange(e) {
        const newSignUpData = { ...signUpData };
        newSignUpData[e.target.id] = e.target.value;
        setSignUpData(newSignUpData);
        console.log(newSignUpData)
    }

    function handleSubmit(e){

        e.preventDefault();
        if (signUpData.password === signUpData.signUpConfirmPass) {
            Axios.post('http://localhost:3000/api/signUp',{
                
                fname : signUpData.fname,
                lname : signUpData.lname,
                contact : signUpData.contact, 
                email : signUpData.email,
                password : signUpData.password
    
            })
            .then((res)=>{
                console.log(res.data)
                if(res.data === "Succesfully Signed Up"){
                    Swal.fire({
                      icon: 'success',
                      title: 'Signed In Successfully!',
                    })
                    router.push('/user');       
            
                }
    
                else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                      })
                }
    
            })
            .catch((e) => {
                Swal.fire({
                    icon: 'info',
                    title: 'Already Registered',
                    text: 'Use different email for create new account',
                  })
              });

            
        } else {

            Swal.fire({
                icon: 'error',
                title: 'Password is not confirmed!',
                text: 'please enter same password in confirm password field to confirm the new password',
              })
            
        }


    }

    return (
        <>
            <div className='signup_form_container'>
                <Form className='signup_form' onSubmit={(e) => handleSubmit(e)}>

                    <Row>
                    <Col sm={12} lg={6} md={6}>
                        <Form.Group controlId="fname">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control onChange={(e) => handleChange(e)} required value={signUpData.fname} type="text" placeholder="First Name" />
                        </Form.Group>
                    </Col>

                    <Col sm={12} lg={6} md={6}>
                        <Form.Group controlId="lname">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control onChange={(e) => handleChange(e)} required value={signUpData.lname} type="text" placeholder="Last Name" />
                        </Form.Group>
                    </Col>
                    </Row>


                    <Row>
                    <Col sm={12} lg={6} md={6}>
                        <Form.Group controlId="contact">
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control onChange={(e) => handleChange(e)} required value={signUpData.contact} type="tel" pattern="[0-9]{10}" placeholder="Mobile Number" />
                        </Form.Group>
                    </Col>
                    <Col sm={12} lg={6} md={6}>
                        <Form.Group controlId="email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control onChange={(e) => handleChange(e)} required value={signUpData.email} type="Email" placeholder="Email Address" />
                        </Form.Group>
                    </Col>
                    </Row>

                    <Row>
                    <Col sm={12} lg={6} md={6}>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control onChange={(e) => handleChange(e)} required value={signUpData.password} type="password" placeholder="Password" />
                        </Form.Group>
                    </Col>

                    <Col sm={12} lg={6} md={6}>
                        <Form.Group controlId="signUpConfirmPass">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control onChange={(e) => handleChange(e)} required value={signUpData.signUpConfirmPass} type="password" placeholder="Confirm Password" />
                        </Form.Group>
                    </Col>
                    </Row>


                    <div className='signup_form_btns'>             
                        <Button className='signup_form_btn1' type="submit">Sign Up</Button>
                    </div>

                    <div className='signup_form_text'>
                         <p>Already Have An Account? <a href='/' className='signup_form_textlink' >Sign In</a></p>
                    </div>

                </Form>
            </div>
        </>
    )
}
