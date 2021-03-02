import React,{Component} from 'react'
import { Link } from 'react-router-dom'

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import {Collapse} from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"

class CreateRoomPage extends Component{
    static defaultProps = {
      votesToSkip : 2,
      guestCanPause : false,
      update : false,
      roomCode : null,
      updateCallback : () =>{ },
    }
    constructor(props){
        super(props);
        this.state={
          guestCanPause: this.props.guestCanPause,
            votesToSkip: this.props.votesToSkip,
            successMsg : "",
            errorMsg :"",
                        
        }
        this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this);
        this.handleVoteChange = this.handleVoteChange.bind(this);
        this.handleGuestCanPause = this.handleGuestCanPause.bind(this);
        this.handleUpdateButtonPressed = this.handleUpdateButtonPressed.bind(this)

    }

    handleVoteChange(e){
        this.setState(
            {
                votesToSkip:e.target.value,

                });
    }

        handleGuestCanPause(e){




          if(e.target.value === "true"){
            console.log("TRUEEE")
            this.setState({guestCanPause:true})
          }else{
            console.log("FALSEEE")
            this.setState({guestCanPause:false})
          }

            // this.setState(
            //     {
                  
            //       guestCanPause : e.target.value === "true" ? true : false,
    
            //         })
            //         console.log("FFFFguestCanPause=",e.target.value)

        }

        handleRoomButtonPressed(){

const requestOperations={
    method:"POST",
    headers : {
        "Content-Type":"application/JSON"
    },
    body : JSON.stringify(
        {
            votes_to_skip : this.state.votesToSkip, 
        guest_can_pause:this.state.guestCanPause,
        }
    ),
};

fetch("/api/create-room/",requestOperations)
.then((response) => response.json())
.then((data) => this.props.history.push('/room/'+ data.code) )
        }



        handleUpdateButtonPressed(){

          console.log("handleUpdateButtonPressed")

          const requestOperations={
              method:"PATCH",
              headers : {
                  "Content-Type":"application/JSON"
              },
              body : JSON.stringify(
                  {
                      votes_to_skip : this.state.votesToSkip, 
                  guest_can_pause:this.state.guestCanPause,
                  code : this.props.roomCode,
                                  }
              ),
          };
          
          fetch("/api/update-room",requestOperations)
          .then((response) => {
            if (response.ok){
                this.setState({
                  successMsg : "Room Updated Sucessfully"
                })
            }else{
              this.setState({
                errorMsg : "Room not Updated "
              })

            }
            this.props.updateCallback();/*Fetch might be running still,so called ater then */
          })
          
                  }
          


renderCreateButtons(){

  return(

  <Grid container spacing={1} >
  <Grid item xs={12} align="center">
  <Button variant="contained" color="primary" onClick={this.handleRoomButtonPressed}>
  Create a Room
</Button>
     </Grid>    

  <Grid item xs={12} align="center">

<Button variant="contained" color="secondary" to="/" component={Link}>
  Back
</Button>
  </Grid>
   </Grid>
  )
}  


renderUpdateButtons(){

  return (

  <Grid container spacing={1} >
  <Grid item xs={12} align="center">
  <Button variant="contained" color="primary" onClick={this.handleUpdateButtonPressed}>
  Update Room
</Button>
     </Grid>    

     </Grid>

  )
}        


    render(){


      // console.log("RoomCode = ",this.props.roomCode)
      console.log("PROPS = ",this.props.guestCanPause)
      console.log("STATE =",this.state.guestCanPause)
      const title = this.props.update ? "Update room" : "Create a room"
        return(
            <div >
<Grid container spacing={1} >


<Grid item xs={12} align="center">
  <Collapse in={this.state.errorMsg != "" || this.state.successMsg != ""} >
    {this.state.successMsg != "" ? 
    (<Alert severity="success"
    onClose={()=>{this.setState({successMsg:""})}}
    >{this.state.successMsg}</Alert>) 
    : (<Alert severity="error"
    onClose={()=>{this.setState({errorMsg:""})}}
    >{this.state.errorMsg}</Alert>)}
  </Collapse>  

</Grid>
  

        <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
            {title}
          </Typography>
        </Grid>    
     
        <Grid item xs={12} align="center">
        <FormControl component="fieldset">
        <FormHelperText>
              <div align="center">Guest control of Playback State</div>
            </FormHelperText>
      
      <RadioGroup 
      row 
      defaultValue={this.state.guestCanPause.toString()}
      // defaultValue={this.props.guestCanPause.toString()}
      
      onChange={this.handleGuestCanPause}>
        <FormControlLabel value="true" control={<Radio color="primary"/>} label="Play/Pause" labelPlacement="bottom" />
        <FormControlLabel value="false" control={<Radio color="secondary"/>} label="No Control" labelPlacement="bottom" />
      </RadioGroup>
    </FormControl>
        </Grid>   

        <Grid item xs={12} align="center">
        <FormControl>
            <TextField 
              required={true}
              type="number"    
              onChange={this.handleVoteChange}          
              defaultValue={this.props.votesToSkip}
              inputProps={{
                min: 1,
                
                style:{textAlign:"center"}
              
              }}
            />
            <FormHelperText>
              <div align="center">Votes Required To Skip Song</div>
            </FormHelperText>
          </FormControl>
          </Grid> 
     
     {this.props.update ? this.renderUpdateButtons() : this.renderCreateButtons()}
   

     </Grid>






            </div>
        )
    }
}


export default CreateRoomPage;