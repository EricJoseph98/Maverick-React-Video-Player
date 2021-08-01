import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ReactPlayer from 'react-player';
import { makeStyles } from '@material-ui/core/styles';

import ControlsComponent from './components/ControlsComponent';

const useStyles = makeStyles({
  playerWrapper: {
    width: "100%",
    height: "500px",
    position: "relative",
  },
  controlsWrapper: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    background: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    zIndex: 1
  },
  controlIcons: {
    color: "#777",
    fontSize: 50,
    transform: "scale(0.9)",
    "&:hover": {
      color: "#fff",
      transform: "scale(1)"
    }
  },
  bottomIcons: {
    color: "#999",
    "&:hover": {
        color: "white"
    }
  },
  volumeSlider: {
    width: 100
  }
});

function App() {
  const classes = useStyles();

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
            <Typography variant="h6">React Video Player</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar/>
      <Container maxWidth="md">
        <div className={classes.playerWrapper}>
          <ReactPlayer width={"100%"} height="100%" url="https://www.youtube.com/watch?v=r6qWEteVMyM&list=PL4OKShK9gkQca9QVqmnPMzT6QYM2LHaqt&index=3"
          muted={false} playing={true}/>
        
        <ControlsComponent/>

        </div>
      </Container>
    </>
  );
}

export default App;