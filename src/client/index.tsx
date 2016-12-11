import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Login from './components/login'
import Game from './components/game'
import Leaderboard from './components/leaderboard'
import {getNames, updateRecords,getLeaderboardRecords, writeToLog} from './components/localstore'
import {GET_USERS, SHOW_LEADERBAORD, START_GAME, NEW_GAME, CONGRAT_WINNER, REPLAY_GAME} from './components/constants'

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
            case GET_USERS :
                this.stage = 1
                this.users = payload.users
                break
            case SHOW_LEADERBAORD :
                this.stage = 2
                this.message = 'lets play again'
                break
            case START_GAME :
                this.stage = 1
                this.users  = [this.users[1], this.users[0]]
                break
            case NEW_GAME :
                this.stage = 0
                break
            case CONGRAT_WINNER :
                this.stage = 2
                this.message = payload.winner+' wins!'
                updateRecords(payload.winner, payload.looser)
                writeToLog({name: payload.winner,date: Date.now(),users: this.users,turns: payload.turns})
                break
            case REPLAY_GAME :
                this.stage = 3
                this.players = payload.users
                this.turns = payload.turns
                break
            default :
        }
        this.forceUpdate()
    }   
  
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