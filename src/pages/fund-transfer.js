import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';
import jwtDecode from "jwt-decode";
import Axios from 'axios';

export default function FundTransfer() {

    let jwt
    const router = useRouter()
    const [token, setToken] = useState(null)
    const [transferData, setTransferData] = useState({
        from: '',
        to: '',
        amount: '',
        date: ''
    })

    useEffect(() => {
        // jwt = localStorage.getItem("token");
        tokenReceiver()
    }, []);

    function handleChange(e) {
        const newTransferData = { ...transferData };
        newTransferData[e.target.id] = e.target.value;
        setTransferData(newTransferData);
        console.log(newTransferData)
    }

    function tokenReceiver() {
        let jwt = localStorage.getItem("token");
        if (jwt) {
            setToken(jwtDecode(jwt))
            // console.log(jwtDecode(jwt))
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const d = new Date();
        const date = d.toLocaleDateString();

        Axios.post('http://localhost:3000/api/transfers', {
            from: token.email,
            to: transferData.to,
            amount: transferData.amount,
            date: date
        })
            .then((res) => {
                if (res.data === "Transfer Success!") {
                    Swal.fire({
                        icon: 'success',
                        title: 'Money Transfered Successfully!'
                    })
                    router.push('/user')
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Somthing Goes Wrong!'
                    })
                }
            })
            .catch((e) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Somthing Goes Wrong!'
                })
            })


    }

    return (
        <>
            <div className='signin_form_container'>
                <Form className='signin_form' onSubmit={(e) => handleSubmit(e)}>
                    <Row>
                        <Col sm={12} lg={12} md={12}>
                            <Form.Group controlId="to">
                                <Form.Label>Receiver's Email Address</Form.Label>
                                <Form.Control onChange={(e) => handleChange(e)} required value={transferData.to} type="Email" placeholder="Receiver's Email Address" />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={12} lg={12} md={12}>
                            <Form.Group controlId="amount">
                                <Form.Label>Amount</Form.Label>
                                <Form.Control onChange={(e) => handleChange(e)} required value={transferData.amount} type="number" placeholder="Amount" />
                            </Form.Group>
                        </Col>
                    </Row>


                    <div className='signin_form_btns'>
                        <Button className='signin_form_btn1' type="submit">Transfer Money</Button>
                    </div>

                </Form>
            </div>
        </>
    )
}