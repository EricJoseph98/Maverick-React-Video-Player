import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Bookmark } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import { FastRewind } from '@material-ui/icons';
import { FastForward } from '@material-ui/icons';
import { PlayArrow } from '@material-ui/icons';
import { Pause } from '@material-ui/icons';
import { VolumeUp } from '@material-ui/icons';
import { VolumeOff } from '@material-ui/icons';
import { Fullscreen } from '@material-ui/icons';

import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Popover from "@material-ui/core/Popover";

const useStyles = makeStyles({
    playerWrapper: {
      width: "100%",
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

function ValueLabelComponent(props) {
    const { children, open, value } = props;
  
    return (
      <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
        {children}
      </Tooltip>
    );
}
  
const PrettoSlider = withStyles({
    root: {
      color: '#52af77',
      height: 8,
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -8,
      marginLeft: -12,
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
})(Slider);


function ControlsComponent({ onPlayPause, playing, onRewind, onFastForward, 
  muted, onMuted, volume, onVolumeChange, onVolumeSeekUp, playbackRate, onPlaybackRateChanged,
  onToggleFullScreen, played, onSeek, onSeekMouseDown, onSeekMouseUp, elapsedTime, totalDuration }){
    
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopover = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "playbackrate-popover" : undefined;

    return(
    <div className={classes.controlsWrapper}>
    {/* Top controls */}
    <Grid container direction="row" alignItems="center" justify="space-between" style={{ padding: 16 }}>
        <Grid item>
            <Typography variant="h5" style={{ color: "#fff" }}>Video Title</Typography>
        </Grid>

        <Grid item>
            <Button variant="contained" color="primary" startIcon={ <Bookmark/> }>Bookmark</Button>
        </Grid>
    </Grid>

    {/* Middle controls */}
    <Grid container direction="row" alignItems="center" justify="center">
        <IconButton onClick={onRewind} className={classes.controlIcons} aria-label="reqind">
            <FastRewind fontSize="inherit"/>
        </IconButton>

        <IconButton onClick={onPlayPause} className={classes.controlIcons} aria-label="reqind">
          {playing ? (<Pause fontSize="inherit"/>) : (<PlayArrow fontSize="inherit"/>)}
        </IconButton>

        <IconButton className={classes.controlIcons} aria-label="reqind">
            <FastForward onClick={onFastForward} fontSize="inherit"/>
        </IconButton>
    </Grid>

    {/* Bottom controls */}
    <Grid container direction="row" justify="space-between" alignItems="center" style={{ padding: 16 }}>
      
      <Grid item xs={12}>
          <PrettoSlider min={0} max={100} defaultValue={20} value={played * 100} 
            ValueLabelComponent={(props) => <ValueLabelComponent {...props} value={elapsedTime}/>} onChange={onSeek} 
            onMouseDown={onSeekMouseDown} onChangeCommitted={onSeekMouseUp}/>
      </Grid>

      <Grid item>
          <Grid container alignItems="center" direction="row">
            <IconButton onClick={onPlayPause} className={classes.bottomIcons}>
              { playing ? (<Pause fontSize="large"/>) : (<PlayArrow fontSize="large" />) }
            </IconButton>

            <IconButton onClick={onMuted} className={classes.bottomIcons}>
              { muted ? (<VolumeOff fontSize="large"/>) : (<VolumeUp fontSize="large" />) } 
            </IconButton>

            <Slider
              min={0}
              max={100}
              value={volume * 100}
              className={classes.volumeSlider}
              onChange={onVolumeChange}
              onChangeCommited={onVolumeSeekUp}
            />

            <Button variant="text" style={{ color: "#fff", marginLeft: 16 }}>
              <Typography>{elapsedTime}/{totalDuration}</Typography>
            </Button>
          </Grid>
      </Grid>

            <Grid item>
                <Button onClick={handlePopover} variant="text" className={classes.bottomIcons}>
                <Typography>{playbackRate}x</Typography>
                </Button>

                <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }} transformOrigin={{ vertical: "bottom", horizontal: "center" }}>

                    <Grid container direction="column-reverse">
                        {[0.5, 1, 1.5, 2].map((rate) => (
                        <Button onClick={ () => onPlaybackRateChanged(rate) }  variant="text">
                            <Typography color={rate===playbackRate ? "secondary" : "default"}>{rate}</Typography>
                        </Button>
                        ))}
                    </Grid>
                
                </Popover>
            
                <IconButton onClick={onToggleFullScreen} className={classes.bottomIcons}>
                  <Fullscreen fontSize="large" />
                </IconButton>
            </Grid>
        </Grid>
  </div>
  );
}

export default ControlsComponent;