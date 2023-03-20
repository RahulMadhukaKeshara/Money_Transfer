import {useState , useEffect} from 'react'

function TransfersList() {

  const [transfers, setTransfers] = useState([])


  const fetchComments = async () => {
    const response = await fetch('http://localhost:4000/transfers')
    const data = await response.json()
    console.log(data)
    setTransfers(data)
  }

  useEffect(() => {
    fetchComments();
  }, []);
  
    return (
      <>
        <h1>Money Transfer History</h1>
        {transfers.map(transfer => {
        return (
          <div key={transfer.id}>
            {transfer.id}, {transfer.from},{transfer.amount}, {transfer.to}
          </div>
        )
      })}
      </>
    )
  }
  
  export default TransfersList