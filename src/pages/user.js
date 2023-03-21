import { useRouter } from "next/router";
import React, { useState, useEffect } from 'react';
import Divider from '@material-ui/core/Divider';
import { Row, Col, Container, Button } from 'react-bootstrap'
import Axios from 'axios';
import jwtDecode from "jwt-decode";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



export default function Profile() {

    let jwt
    const router = useRouter()
    const [userData, setuserData] = useState(null)
    const [transfers, setTransfers] = useState([]);

    const getTransfersData = async () => {
        try {
            const email = jwtDecode(jwt).email
            const data = await Axios.post("http://localhost:3000/api/transfers/filteredTransfers", { from: email });
            console.log(data.data);
            setTransfers(data.data);
        } catch (e) {
            console.log(e);
        }
    };


    const handleNewFundTransfer = () => {
        router.push('/fund-transfer')
    }

    const getUserData = async () => {

        if (jwt) {
            try {
                const userID = jwtDecode(jwt)._id
                const data = await Axios.post("http://localhost:3000/api/users", { id: userID });
                console.log("checking", data.data);
                setuserData(data.data);
            } catch (error) {
                console.log(error);
            }
        } else {
            router.push('/')
        }
    };

    useEffect(() => {
        jwt = localStorage.getItem("token");
        getUserData()
        getTransfersData()
    }, []);

    return (
        <>
            <Container className="main_container">
                <Container className="transfers_container">
                    <div>
                        <Row>
                            <Col className="transfer_col_1" sm={6} md={6} lg={6}>
                                <h5 className="profile_text">Name : {`${userData && userData.fname}  ${userData && userData.lname}`}</h5>
                                <h5 className="profile_text">Contact : {userData && userData.contact}</h5>
                                <h5 className="profile_text">Email : {userData && userData.email}</h5>
                            </Col>
                            <Col className="transfer_col_2" sm={6} md={6} lg={6} >
                                <button onClick={handleNewFundTransfer} className='transfers_btn1'>Transfer Money</button>
                            </Col>
                        </Row>
                    </div>

                </Container>
                <Container className="transfers_container">
                    {
                        transfers.length == 0 ?
                            (
                                <h2 style={{textAlign:'center'}}>No Past Transactions to Show</h2>
                            ) :
                            (
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell style={{ fontWeight: 'bold' }} >Transaction ID</TableCell>
                                                <TableCell style={{ fontWeight: 'bold' }} align="right">Transaction Date</TableCell>
                                                <TableCell style={{ fontWeight: 'bold' }} align="right">Transaction Amount</TableCell>
                                                <TableCell style={{ fontWeight: 'bold' }} align="right">Sent To</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {transfers.map((transfer) => (
                                                <TableRow
                                                    key={transfer._id}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {transfer._id}
                                                    </TableCell>
                                                    <TableCell align="right">{transfer.date}</TableCell>
                                                    <TableCell align="right">{transfer.amount}</TableCell>
                                                    <TableCell align="right">{transfer.to}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            )
                    }
                </Container >
            </Container>
        </>
    )
}

