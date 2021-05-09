import React, { useState, useEffect } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Badge from '@material-ui/core/Badge'
import IconButton from '@material-ui/core/IconButton'
import NotificationsIcon from '@material-ui/icons/Notifications'
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Popover from '@material-ui/core/Popover';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { nanoid } from 'nanoid'


function App() {

  const [undreadCount, setUnreadCount] = useState(0)
  const [notifications, setNotifications] = useState([])
  const [anchorEl, setAnchorEl] = useState(null)
  const [id, setId] = useState(null)

  const open = Boolean(anchorEl)
  const notificationId = open ? 'simple-popover' : undefined

  useEffect(() => { setId(nanoid()) }, [])

  useEffect(() => {

    const callLongPolling = (id) => {
      fetch(`http://localhost:8080/long-polling?clientId=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setNotifications(prevState => [...prevState, data.message])
        callLongPolling(id)
      })
    }

    if (id) {
      callLongPolling(id)
    } 

  }, [id])

  const resetNotifications = () => {
    setUnreadCount(0)
  }

  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <IconButton aria-describedby={notificationId} onClick={(e) => { resetNotifications(); setAnchorEl(e.currentTarget); }} color="inherit">
              <Badge badgeContent={undreadCount} color="secondary" invisible={!undreadCount}>
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <Popover
              id={notificationId}
              open={open}
              anchorEl={anchorEl}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <List component="nav" style={{ padding: '0' }}>
                {
                  notifications.map((message, i) => {
                    return(
                      <Box key={i}>
                        <ListItem button>
                          <ListItemText primary={message}/>
                        </ListItem>
                        <Divider />
                      </Box>
                    )
                  })  
                }
              </List>
            </Popover>

            <Box component='div' style={{ margin: 'auto' }}>
              {`id: ${id}`}
            </Box>

        </Toolbar>
      </AppBar>


    </>
  );
}

export default App;
