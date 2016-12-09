import * as React from 'react'
import * as ReactDOM from 'react-dom'

import Login from './components/login'
import Game from './components/game'
import Leaderboard from './components/leaderboard'
import {getNames, updateRecords,getLeaderboardRecords, writeToLog} from './components/localstore'



interface Props {}
interface State {}

class App extends React.Component<Props,State>{
    
    private stage: number
    private users: string[]
    private message: string
    private turns: number[]
    private players: string[]

    constructor(props: Props){
        super(props)
        this.message = 'hello'
        this.stage = 0
    }
    componentWillMount(){
        // localStorage.clear()
    }

    dispatch(action: string, payload: any){

        switch(action){
            case 'GET_USERS' :
                this.stage = 1
                this.users = payload.users
                break
            case 'SHOW_LEADERBAORD' :
                this.stage = 2
                // this.users  = [this.users[1], this.users[0]]
                this.message = 'lets play again'
                break
            case 'START_GAME' :
                this.stage = 1
                this.users  = [this.users[1], this.users[0]]
                break
            case 'NEW_GAME' :
                this.stage = 0
                break
            case 'CONGRAT_WINNER' :
                this.stage = 2
                this.message = payload.winner+' wins!'
                updateRecords(payload.winner, payload.looser)
                writeToLog({name: payload.winner,date: Date.now(),users: this.users,turns: payload.turns})
                break
            case 'REPLAY_GAME' :
                this.stage = 3
                this.players = payload.users
                this.turns = payload.turns
                break
            default :
        }
        this.forceUpdate()
    }   
  
    // getResult(status: number, turns?: any){
        
    //     switch(status){
    //         // draw
    //         case 0 :
    //             // switch users
    //             this.users  = [this.users[1], this.users[0]]
    //             this.stage = 2
    //             this.message = 'lets play again' 
    //             this.forceUpdate()
    //             break
    //         case 1 :
    //         case 2 :
    //             // someone wins
    //             const winner = this.users[status-1]
    //             const looser = (status-1 == 0) ? this.users[1] : this.users[0]
    //             this.message = winner + ' wins!'
    //             // save stats
    //             updateRecords(winner, looser)
    //             writeToLog({name: winner,date: Date.now(),users: this.users,turns})
    //             this.stage = 2
    //             this.forceUpdate() 
    //             break
    //         case 3 : // play again
    //             this.users  = [this.users[1], this.users[0]]
    //             this.stage = 1
    //             this.forceUpdate()
    //             break
    //         case 4 :  // replay old game
    //             this.players = turns.users
    //             this.turns = turns.turns
    //             this.stage = 3
    //             this.forceUpdate()
    //             break
    //         case 5 : // new game
    //             this.stage = 0
    //             this.forceUpdate()
    //             break;
    //         default :
    //     }
    // }

    render(){

        const dispatch = {
            onDispatch: this.dispatch.bind(this)
        }
       
        switch(this.stage) {
            case 0 : // users login 
                return <Login users={getNames()} {...dispatch}/>
            case 1 : // game
                return <Game turns={[]} users={this.users} {...dispatch}/>
            case 2 : // show leaderboard
                return <Leaderboard message={this.message} {...dispatch} />
            case 3 :  // replay game
                return <Game turns={this.turns} users={this.players} {...dispatch}/>
            default :
             return null
        }    
    }
}


ReactDOM.render(<App/>,document.getElementById('layout'))
