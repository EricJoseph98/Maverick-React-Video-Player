import React, {useState, useRef} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ReactPlayer from 'react-player';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import screenfull from 'screenfull';

import ControlsComponent from './components/ControlsComponent';
import Grid from '@material-ui/core/Grid';

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

const format = (seconds) => {
  if(isNaN(seconds)){
    return "00:00";
  }
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds().toString().padStart(2, "0");

  if(hh){
    return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
  }

  return `${mm}:${ss}`;
}

let count = 0;

function App() {
  const classes = useStyles();
  const [state, setState] = useState({
      playing: true,
      muted: true,
      volume: 0.5,
      playbackRate: 1.0,
      played: 0,
      seeking: false
  });

  const [timeDisplayFormat, setTimeDisplayFormat] = useState("normal");
  const [bookmarks, setBookmarks] = useState([]);

  const { playing, muted, volume, playbackRate, played, seeking } = state;

  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const canvasRef = useRef(null);
  const controlRef = useRef(null);

  const handlePlayPause = () => {
    setState({...state, playing: !state.playing });
  }

  const handleMuted = () => {
    setState({...state, muted: !state.muted });
  }

  const handleRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  }

  const handleFastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
  }

  const handleVolumeChange = (e, newValue) => {
      setState({
        ...state,
        volume: parseFloat(newValue/100),
        muted: newValue === 0 ? true : false
      });
  }

  const handleVolumeSeekUp = (e, newValue) => {
    setState({
      ...state,
      volume: parseFloat(newValue/100),
      muted: newValue === 0 ? true : false
    });
  }

  const handlePlaybackRateChange = (rate) => {
    setState({
      ...state,
      playbackRate: rate
    });
  }

  const toggleFullScreen = () => {
    screenfull.toggle(playerContainerRef.current);
  }

  const handleProgress = (changeState) => {
    console.log(changeState);

    if(count > 3){
      controlRef.current.style.visibility = "hidden";
      count = 0;
    }

    if(controlRef.current.style.visibility === "visible"){
      count += 1;
    }

    if(!seeking){
      setState({ ...state, ...changeState })
    }
  }

  const handleSeekChange = (e, newValue) => {
    setState({...state, played: parseFloat(newValue/100)});
  }

  const handleSeekMouseDown = (e) => {
    setState({...state, seeking: true});
  }

  const handleSeekMouseUp = (e, newValue) => {
    setState({...state, seeking: false});
    playerRef.current.seekTo(newValue/100);
  }

  const handleChangeDisplayFormat = () => {
    if(timeDisplayFormat === "normal"){
      setTimeDisplayFormat("remaining");
    }
    else {
      setTimeDisplayFormat("normal");
    }
  }

  const addBookmark = () => {
    const canvas = canvasRef.current;
    canvas.width = 160;
    canvas.height = 90;

    /* const ctx = canvas.getContext("2d");
    ctx.drawImage(
      playerRef.current.getInternalPlayer().,
      0,
      0,
      canvas.width,
      canvas.height
    ); */
    
    const imageUrl = canvas.toDataURL();
    canvas.width = 0;
    canvas.height = 0;

    setBookmarks([...bookmarks, { time: currentTime, display: elapsedTime, image: imageUrl }])
  }

  const handleMouseMove = () => {
    controlRef.current.style.visibility = "visible";
    count = 0;
  }

  const currentTime = playerRef.current ? playerRef.current.getCurrentTime() : "00:00";
  const duration = playerRef.current ? playerRef.current.getDuration() : "00:00";
  
  const elapsedTime = timeDisplayFormat === "normal" ? format(currentTime) : `-${format(duration - currentTime)}`;
  const totalDuration = format(duration);

  return ( 
    <>
      <AppBar position="fixed">
        <Toolbar>
            <Typography variant="h6">React Video Player</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar/>
      <Container maxWidth="md">
        <div ref={playerContainerRef} className={classes.playerWrapper}
            onMouseMove={handleMouseMove} >

          <ReactPlayer playing={playing} muted={muted} volume={volume} playbackRate={playbackRate} 
          ref={playerRef} onProgress={handleProgress} 
          width={"100%"} height="100%"
          url="https://www.youtube.com/watch?v=r6qWEteVMyM&list=PL4OKShK9gkQca9QVqmnPMzT6QYM2LHaqt&index=3"
          config={{ file: { attributes : {crossorigin: "anonymous" }} }}/>

          <ControlsComponent ref={controlRef} playing={playing} muted={muted} volume={volume} onPlayPause={handlePlayPause} 
            onRewind={handleRewind} onFastForward={handleFastForward} onMuted={handleMuted} 
            onVolumeChange={handleVolumeChange} onVolumeSeekUp={handleVolumeSeekUp} 
            playbackRate={playbackRate} onPlaybackRateChanged={handlePlaybackRateChange}
            onToggleFullScreen={toggleFullScreen} played={played} 
            onSeek={handleSeekChange} onSeekMouseDown={handleSeekMouseDown} onSeekMouseUp={handleSeekMouseUp}
            elapsedTime={elapsedTime} totalDuration={totalDuration}
            onChangedDisplayFormat={handleChangeDisplayFormat}
            onBookmark={addBookmark}/>

        </div>

        <Grid container style={{ marginTop: 20 }} spacing={3}>
            { bookmarks.map((bookmark, index) => {
                      return(
                          <Grid item key={index}>
                              <Paper onClick={() => playerRef.current.seekTo(bookmark.time)}>
                                  <img crossOrigin="anonymous" src={bookmark.image} alt="Unavailable"/>
                                  <Typography>Bookmart at {bookmark.display}</Typography>
                              </Paper>
                          </Grid>
                      );
              }) }
        </Grid>

        <canvas ref={canvasRef} />
      </Container>
    </>
  );
}

export default App;