import React, { useState} from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Badge from '@material-ui/core/Badge'
import IconButton from '@material-ui/core/IconButton'
import NotificationsIcon from '@material-ui/icons/Notifications'


function App() {

  const [undreadCount, setUnreadCount] = useState(0)
  const [notifications, setNotifications] = useState([])

  const resetNotifications = () => {
    setUnreadCount(0)
  }

  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <IconButton onClick={resetNotifications} color="inherit">
              <Badge badgeContent={undreadCount} color="secondary" invisible={!undreadCount}>
                <NotificationsIcon />
              </Badge>
            </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default App;
