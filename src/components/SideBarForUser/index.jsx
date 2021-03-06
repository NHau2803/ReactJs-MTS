import React from "react";
import {
  ListItem,
  List,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import ViewListIcon from '@material-ui/icons/ViewList';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import { SET_COLOR_PRIMARY } from "styles/Color";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const StudentSide = props => {

  const { history } = props;
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  const studentId = 1;

  const itemsList = [
   
    {
      text: "Topics ",
      icon: <ViewListIcon style={SET_COLOR_PRIMARY}/>,
      onClick: () => history.push("/mts/topic")
    },
    {
      text: "Add Team",
      icon: <GroupAddIcon style={SET_COLOR_PRIMARY}/>,
      onClick: () => history.push("/mts/team/add")
    },
    {
      text: "My Topic",
      icon: <FolderOpenIcon style={SET_COLOR_PRIMARY}/>,
      onClick: () => history.push(`/mts/my/${studentId}/view`)
    },
    {
      text: "My Info",
      icon: <AssignmentIndIcon style={SET_COLOR_PRIMARY}/>,
      onClick: () => history.push(`/mts/info/${studentId}`)
    },
    {
      text: "My Account",
      icon: <AccountCircleIcon style={SET_COLOR_PRIMARY}/>,
      onClick: () => history.push("/mts/account")
    },

  ];
  return (
      <div>

        <List 
          component="div" 
          disablePadding
        >
            {itemsList.map((item) => {

            const { text, icon, onClick } = item;

            return (
            <ListItem 
              className={classes.nested} 
              button key={text} 
              onClick={onClick}
              >
                {icon 
                && <ListItemIcon>{icon}</ListItemIcon>
                }

                <ListItemText 
                  primary={text} 
                  style={SET_COLOR_PRIMARY}
                />
            </ListItem>
            );
        })}
        </List>
       
      </div>
  );
};

export default withRouter(StudentSide);