import { Grid,Typography,TextField,Button } from '@material-ui/core';
import React,{Component} from 'react';
import {Link} from "react-router-dom"

class RoomJoinPage extends Component{
    constructor(props){
        super(props);
        
        this.state={
            roomCode : "",
            error:"",

        }
        this.roomButtonPressed=this.roomButtonPressed.bind(this)
    }

    roomButtonPressed(){
        const requestOperations={
            method: "POST",
            headers: {
                'Content-Type':'application/json'
            },
            body : JSON.stringify({
                code : this.state.roomCode
            })
        };

        fetch('/api/join-room',requestOperations).then((response)=>{
            if (response.ok){
                this.props.history.push(`/room/${this.state.roomCode}`)
            }else{
                this.setState({
                    error:"Room Not Found!"
                })
            }
        }).catch((error)=>{
            console.log(error)
        })

    }
    
    render(){
        return(
            <div>
            <Grid container spacing={1}  align="center">
        <Grid item xs={12}>
          <Typography variant="h4" component="h4">
              Join a room
          </Typography>
        </Grid>
 
        <Grid item xs={12}>
        <TextField
        label="Code"
        placeholder="Enter a Room code"
        variant="outlined"
        error={this.state.error}
        helperText={this.state.error}
        value={this.state.roomCode}
        onChange={(e)=>{
            this.setState({
                roomCode : e.target.value
                
            })
        }}
        />
        </Grid>
        <Grid item xs={12}>
       
       
        
<Button variant="contained" color="primary" onClick={this.roomButtonPressed}>
  Enter a Room
</Button>
</Grid>
<Grid item xs={12}>
<Button variant="contained" color="secondary" to="/"  component={Link}>
  Back
</Button>
</Grid>


            </Grid>
            </div>
       
        )
    }
}


export default RoomJoinPage;