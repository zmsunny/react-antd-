import React, { Component } from 'react'

import {
    BrowserRouter as Router,
    Route, Switch
} from 'react-router-dom'

import App from '../App'

import Home from '../component/home'
import Work from '../component/work'
import Board from '../component/board'
import Mine from '../component/mine'
import Leavework from '../component/leavework'
export default class extends Component{
    render(){
        return (
            <Router>
                <App>
                    <Route path="/" render={()=>
                        (<Home>
                            <Switch>
                                <Route exact path="/" component = {Work}/> 
                                <Route path="/board" component = {Board}/>
                                <Route path = "/attend/mine" component = { Mine } />
                                <Route path = "/attend/leave-work" component = { Leavework } />
                            </Switch>
                        </Home> 
                    )}/>
                </App>
            </Router>
        )  
    }
}