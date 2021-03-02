import React,{Component} from 'react'

import {render} from 'react-dom'
import HomePage from "./HomePage"





class App extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="center">
                <HomePage />
                
            </div>
           
        )
    }
}

render(<App />,document.getElementById("app"));

export default App;