import React,{Component} from 'react';
import CreateRoomPage from "./CreateRoomPage";
import RoomJoinPage from "./RoomJoinPage"
import Room from './Room'
import { Button,ButtonGroup,Grid,Typography} from "@material-ui/core"
import { 
    BrowserRouter as Router ,
    Switch,
    Route,
    Link,
    Redirect,
} from "react-router-dom"

class HomePage extends Component{
    constructor(props){
        super(props);
        this.state={
            roomCode : null,
        }
        this.cleaRoomCode = this.cleaRoomCode.bind(this)
    }


async componentDidMount(){

fetch('/api/user-in-room').
then((response)=>response.json()).
then((data)=>{
    this.setState(
        { roomCode : data.code}
    )
})

console.log(this.state.roomCode)

}

renderHomePage(){
    return (


        <Grid container spacing={3} align="center">

<Grid item xs={12}>
          <Typography variant="h4" contained="h4">
              House Party
          </Typography>

</Grid>

<Grid item xs={12}>
<ButtonGroup  disableElevation  variant="contained" >
  <Button to="/create" color="primary" component={Link}>Create a Room</Button>
  <Button to="/join" color="secondary" component={Link}>Join Room</Button>
</ButtonGroup>

</Grid>





        </Grid>


    );
}

cleaRoomCode(){
    this.setState({
        roomCode : null,
    })
}

    render(){
        return(
            <Router>
                <Switch>
                    <Route exact path='/' render={
                        ()=>{
                            return this.state.roomCode ? 
                            (<Redirect to={`/room/${this.state.roomCode}`} />) 
                            : 
                            (this.renderHomePage())
                        }
                    } />
                       
                    <Route path='/join' component={RoomJoinPage} />
                    <Route path='/create' component={CreateRoomPage} />
                      <Route path='/room/:roomCode' 
                      render={(props)=>{
                          return <Room {...props} leaveRoomCallback={this.cleaRoomCode} />
                      }}
                      />  
                   

                </Switch>

            </Router>
        )
    }
} 


export default HomePage