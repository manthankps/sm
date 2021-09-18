import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
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
}));

export default function Welcome() {
  const classes = useStyles();

  return (
      <Typography>WELCOME</Typography>
    // <List className={classes.root}>
    //   <ListItem button>
    //     <ListItemText primary="Heri" href="#simple-list"/>
    //     <ListItemText primary="7000" className={classes.amount}/>
    //   </ListItem>
    //   <Divider  />
      
    //   <ListItem button>
    //     <ListItemText primary="Akshay" />
    //     <ListItemText primary="400" className={classes.amount}/>
    //   </ListItem>
    //   <Divider  />
    //   {/* <Divider component="li" variant="inset" /> */}

    //   <ListItem button>
    //     <ListItemText primary="Sweta" />
    //     <ListItemText primary="27000" className={classes.amount}/>
    //   </ListItem>
    //   <Divider  />
      
    //   {/* <ListItem>
    //     <ListItemAvatar>
    //       <Avatar>
    //         <BeachAccessIcon />
    //       </Avatar>
    //     </ListItemAvatar>
    //     <ListItemText primary="Vacation" secondary="July 20, 2014" />
    //   </ListItem> */}
    // </List>
  );
}
