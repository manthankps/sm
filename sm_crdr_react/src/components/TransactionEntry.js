import * as React from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';

export default function TransactionEntry() {
    const accountid=useParams().id
    const accountname=useParams().name
    const [id,setId]=useState("")
    const [idaccount,setIdaccount]=useState("")
    const [description,setDescription]=useState("")
    const [transactiontype,setTransactiontype]=useState("")
    const [amount,setAmount]=useState("")
    const [remark,setRemark]=useState("")
    //const [entrydate,setEntrydate]=useState("")
    //const [status,setStatus]=useState("")
    const history=useHistory()

    const getMaxId=async()=>{
        const res=await fetch(`http://localhost:3001/maxtransactionid`,{
          method:"GET"
        })
        const resdata=await res.json()
        console.log("TTTTTTTTTTTTTTTTTTT",resdata)
        
        return resdata.id
      }


    const handleSubmit = async(event) => {
        event.preventDefault();
    
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        //setId(data.get("id"))
        const id1=await getMaxId()
        setId(id1)  
        setIdaccount(accountid)
        setDescription(data.get("description"))
        setTransactiontype(data.get("transactiontype"))
        setAmount(data.get("amount"))
        setRemark(data.get("remark"))

        const res=await fetch("http://localhost:3001/transaction",{
          method:"POST",
          credentials: 'include',
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({id,idaccount,description,transactiontype,amount,remark})
        })

       // const resdata=await res.json()
        if(res.status===200){
            console.log("OOOOOOKKKKK")
          window.alert(`Transaction saved `)
          history.push(`/transaction/${accountid}/${accountname}`)
        }
      };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch', paddingBottom: '1rem', },
      }}
      noValidate
      autoComplete="off"
    >
        <br/>
      <div>
          <h2>{accountname}</h2>
        <TextField
          required
          id="description"
          name="description"
          label="Description"
        />
        <TextField
          required
          id="transactiontype"
          name="transactiontype"
          label="Transactiontype"
        />
        <TextField
        required
          id="amount"
          name="amount"
          label="Amount"
        />  
        <TextField
          id="remark"
          name="remark"
          label="Remark"
        />  
        <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ width:'25ch ', mt: 3, mb: 2 }}
            >
              Save
            </Button>
      </div>
    </Box>
  );
}
