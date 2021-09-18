import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockIcon from '@material-ui/icons/Lock';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import {useEffect,useState} from 'react';
import {useHistory} from 'react-router-dom';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default  function SignIn() {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const history=useHistory()




  useEffect(()=>{
    checkUSer()
  },[])
  const checkUSer=async ()=>{
    const res=await fetch("http://localhost:3001/")
    if(res.status===200){
      history.push("/list")
    }
  }





  
  const handleSubmit = async(event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    setEmail(data.get("email"))
    setPassword(data.get("password"))
    const res=await fetch("http://localhost:3001/users",{
      method:"POST",
      credentials: 'include',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({email,password})
    })
    const resdata=await res.json()
    // console.log(resdata)
    if(res.status===200){
      window.alert(`welcome ${resdata.username}`)
      history.push("/list")
    }
    
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
  };
  
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4}} />
      </Container>
    </ThemeProvider>
  );
}