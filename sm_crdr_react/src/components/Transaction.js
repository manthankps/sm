import React from 'react';
import {useEffect,useState} from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {useHistory, useParams} from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    //maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  dividerFullWidth: {
    margin: `5px 0 0 ${theme.spacing(2)}px`,
  },
  dividerInset: {
    margin: `5px 0 0 ${theme.spacing(9)}px`,
  },
  amount: {
    textAlign: "right",
  },
  addcustomerbar:{
    position: "fixed",
    zIndex: 1,
    backgroundColor: "Black",
    color: "white",
    height: "3rem",
  },
  addnew: {
    textAlign: "right",
    fontSize:"2rem",
  },

  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.25),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(0),
    marginLeft: "10px",
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 0, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(2)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },

}));



export default function Transaction() {
    console.log("QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ",useParams())
  const accountid=useParams().id
  const accountname=useParams().name
  const classes = useStyles();
  const history=useHistory()
  const [listArr,setListArr]=useState([])
  useEffect(()=>{
    console.log(typeof id)
    getData()
  },[])

  const getData=async()=>{
    const res=await fetch(`http://localhost:3001/transaction/${accountid}`,{
      method:"GET"
    })
    const resdata=await res.json()
    setListArr(resdata)
    console.log("kkkkkkkkkkkkkkkkkkkkk",resdata)
  }

  const handleAddNew = () => { 
    history.push(`/transactionentry/${accountid}/${accountname}`)
  }

  return (
    <React.Fragment>
      {/*===============<NEW ACCOUNT ADD>===============*/}
      <List className={classes.root}>
        <ListItem className={classes.addcustomerbar}>
          <ListItemText primary={`Transaction [${accountname}]`}/>
          <ListItemText>
            <div className={classes.search} hidden>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
          </ListItemText>
          <ListItemText className={classes.amount}>
            <Button 
            color="inherit" 
            onClick={handleAddNew}
            className={classes.addnew} >+</Button>
          </ListItemText>
        </ListItem>
      </List>
      <Toolbar />
      {/*===============</NEW ACCOUNT ADD>===============*/}
  
      

      {/*===============<DYNAMIC DATA>===============*/}  
      <List className={classes.root}>
      {
        listArr.map((listItem)=>{
            console.log(listItem.entrydate)
          return(
            <div>
              <ListItem button>
              <ListItemText primary={listItem.id} hidden/>
                <ListItemText primary={listItem.description} secondary={listItem.entrydate} />
                <ListItemText primary={listItem.amount} className={classes.amount}/>
              </ListItem>
              <Divider  />
            </div>
          )
        })
      }
      {/*===============</DYNAMIC DATA>===============*/}
    
    </List>
    </React.Fragment>
  );
}
