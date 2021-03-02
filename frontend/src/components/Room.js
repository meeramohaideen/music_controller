import React, {Component} from 'react';
import { Grid,Typography,Button } from '@material-ui/core';
import CreateRoomPage from "./CreateRoomPage"
import MusicPlayer from "./MusicPlayer"

class Room extends Component{
    constructor(props){
        super(props);
        this.state={
            votesToSkip : 2,
            guesCanPause : false,
            isHost : false,
            showSetting : false,
            spotifyAuthenticated : false,
            song : {}
        }
        this.roomCode = this.props.match.params.roomCode;
        
        this.leaveRoomPressed = this.leaveRoomPressed.bind(this);
        this.updateShowSettings =this.updateShowSettings.bind(this)
        this.renderSettings=this.renderSettings.bind(this)
        this.renderSettingsButton=this.renderSettingsButton.bind(this)
        this.getRoomDetails=this.getRoomDetails.bind(this)
        this.authenticateSpotify=this.authenticateSpotify.bind(this)
        this.getCurrentSong=this.getCurrentSong.bind(this);
        this.getRoomDetails();
        
        
    }

    componentDidMount(){
        this.interval = setInterval(this.getCurrentSong,1000)
    }
componentWillUnmount(){
    clearInterval(this.interval)
}

    getRoomDetails(){
        this.url="/api/get-room" + "?code=" + this.roomCode

        fetch(this.url).
        then((respose)=>{
            if (!respose.ok){
                this.props.leaveRoomCallback();
                this.props.history.push("/");
            }
            
            return respose.json()}
        )
        .then((data)=>{
            this.setState({
                votesToSkip : data.votes_to_skip,
                guesCanPause : data.guest_can_pause,
                isHost : data.is_host,
                
            })
            if(this.state.isHost){
                this.authenticateSpotify();
            }
        })
    }

    authenticateSpotify(){
        fetch("/spotify/is-authenticated")
        .then((response)=>response.json())
        .then((data)=>{
            this.setState({
                spotifyAuthenticated:data.status
            })
            console.log("Is authenticated:",data.status)
            if (!data.status){
              fetch("/spotify/get-auth-url")
              .then((response)=>response.json())
              .then((data)=>{
                window.location.replace(data.url)
                // console.log(data.url)
              })  
            }
        })
    }


    getCurrentSong(){
        fetch("/spotify/current-song")
        .then((response)=>{
            if (!response.ok){
                return {}
            }
            else {
                return response.json()
            }
        }).then((data)=>{
            this.setState({
                song  :data
            })
            console.log(data)
        })
    }

leaveRoomPressed(){

    const requestOperation={
        method : "POST",
        headers : {
            'Content-Type':'application/json'
        },
    }
    fetch('/api/leave-room',requestOperation).then((_response)=>{
        this.props.leaveRoomCallback();
        this.props.history.push("/");

    })

}

updateShowSettings(value){
    this.setState({
        showSetting : value,
    })

}

renderSettings(){

    return (

    <Grid container spacing={1}  align="center">
    <Grid item xs={12}>
<CreateRoomPage 
update={true}
votesToSkip={this.state.votesToSkip}
guestCanPause={this.state.guesCanPause}
roomCode={this.roomCode}
updateCallback={this.getRoomDetails}

/>      
    </Grid>
    <Grid item xs={12}>
    <Grid item xs={12} align="center">
        <Button variant="contained" color="secondary" onClick={()=>this.updateShowSettings(false)}>
            Close
        </Button>
        </Grid>
    </Grid>

    </Grid>
    )
}

renderSettingsButton(){
    return(
        <Grid item xs={12} align="center">
        <Button variant="contained" color="primary" onClick={()=>this.updateShowSettings(true)}>
            Settings
        </Button>
        </Grid>
    )
}

    render(){

        if (this.state.showSetting){
            return this.renderSettings();

        }
        return(
            

            <Grid container spacing={1}  align="center">
                <Grid item xs={12}>
                    <Typography variant="h4" component="h4" >
                        Room Code : {this.roomCode}
                    </Typography>
                </Grid>
       <MusicPlayer {...this.state.song}/>
                <Grid item xs={12}>
                    <Typography variant="h6" component="h6" >
                       Host ?  {this.state.isHost.toString()}
                    </Typography>
                </Grid>

                {this.state.isHost ? this.renderSettingsButton() : null}
                <Grid item xs={12}>
                <Button variant="contained" color="secondary" onClick={this.leaveRoomPressed}>
                    Leave Room
                </Button>
                </Grid>
                
        
            </Grid >
            
        )
    }

}

export default Room;

{/* <div>
                <h1>Room Code : {this.roomCode}</h1>
                <p>Votes : {this.state.votesToSkip}</p>
                <p>Guest Can Pause : {this.state.guesCanPause.toString()}</p>
                <p>IsHost : {this.state.isHost.toString()}</p>
</div> */}