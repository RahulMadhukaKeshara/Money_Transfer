import { useState } from 'react'

function NewTransfer() {

    const [transfer, setTransfer] = useState({
        id: '',
        from: "",
        amount: '',
        to: ""
    })

    function handleSubmit(e){
        e.preventDefault();
        alert('submitted')

    }

    return (
      <>
        <h1>New Money Transfer</h1>
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label for="to">Receiver's Email Address :</label><br/>
                <input type="text" id="to" name="to" value="John"/><br/><br/>
                <label for="amount">Sending Amount :</label><br/>
                <input type="text" id="amount" name="amount" value="Doe"/><br/><br/>
                <button type="submit">Send Money</button>
            </form> 
        </div>
      </>
    )
}
export default NewTransfer