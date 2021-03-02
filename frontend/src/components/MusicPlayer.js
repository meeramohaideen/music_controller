import React, {Component} from 'react'
import { Grid, Card,Typography, IconButton, LinearProgress} from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PauseIcon from '@material-ui/icons/Pause';



class MusicPlayer extends Component {
    constructor(props){
        super(props);


    }

skipSong(){

    const requestOptions={
        method : "POST",
        headers : {
            "Content-Type":"application/json"
        }
    };
    console.log("Skipped")
    fetch("/spotify/skip",requestOptions );

}    
 
pauseSong(){
    const requestOptions={
        method : "PUT",
        headers : {
            "Content-Type":"application/json"
        },
    };
    console.log("pause")
    fetch("/spotify/pause",requestOptions );
  
 
 }

 playSong(){
    const requestOptions={
        method : "PUT",
        headers : {
            "Content-Type":"application/json"
        },
    };
    console.log("play")
    fetch("/spotify/play",requestOptions );


 }

    render(){

        const songProgress = (this.props.time / this.props.duration ) *100
        return(
           
           <Card>

        
        <Grid container alignItems="center">
            <Grid item xs={4}>
            <img src={this.props.image_url} height="100%" width="100%"  />
            </Grid>

            <Grid item xs={8}>
            <Typography variant="h5" contained="h5">
                {this.props.title}
            </Typography>
            <Typography variant="textSecondary" contained="subtitle">
                {this.props.artist}
            </Typography>
            <div>
                <IconButton onClick={()=>{this.props.is_playing ? this.pauseSong():this.playSong()}}>
                    {this.props.is_playing ? <PauseIcon /> : <PlayArrowIcon />}
                </IconButton>
                <IconButton onClick={()=>this.skipSong()}>
                    <SkipNextIcon />{this.props.votes} / {this.props.votes_required}
                </IconButton>
            </div>

            </Grid>

        </Grid>
            
            <LinearProgress variant="determinate" value = {songProgress} />
        </Card>             
        )
    }
}

export default MusicPlayer;