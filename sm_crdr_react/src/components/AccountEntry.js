import * as React from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {useState} from 'react';
import {useHistory} from 'react-router-dom';

export default function AccountEntry() {
    const [id,setId]=useState("")
    const [name,setName]=useState("")
    const [mobile,setMobile]=useState("")
    const [address,setAddress]=useState("")
    const history=useHistory()

    const getMaxId=async()=>{
        const res=await fetch(`http://localhost:3001/maxaccountid`,{
          method:"GET"
        })
        console.log("kkkkkkkRRRREEEESSSS",res)
        const resdata=await res.json()
        console.log("kkkkkkkkkkkkkkkkkkkkk",resdata)
        
        return resdata.id
      }


    const handleSubmit = async(event) => {
        event.preventDefault();
    
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        //setId(data.get("id"))
        const id1=await getMaxId()
        setId(id1)  
        console.log("======================================", id1)
        setName(data.get("name"))
        setMobile(data.get("mobile"))
        setAddress(data.get("address"))

        const res=await fetch("http://localhost:3001/account",{
          method:"POST",
          credentials: 'include',
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({id,name,mobile,address})
        })

       // const resdata=await res.json()
        console.log(res,"35")
        if(res.status===200){
            console.log("OOOOOOKKKKK")
          window.alert(`Account saved `)
          history.push("/list")
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
        <TextField
          required
          id="name"
          name="name"
          label="Name"
        />
        <TextField
          required
          id="mobile"
          name="mobile"
          label="Mobile"
        />
        <TextField
          id="address"
          name="address"
          label="Address"
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
