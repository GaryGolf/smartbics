import * as React from 'react'
import * as ReactDOM from 'react-dom'

import Login from './components/login'
import Game from './components/game'
import Leaderboard from './components/leaderboard'
import {getNames, updateRecords,getLeaderboardRecords} from './components/localstore'



interface Props {}
interface State {}

class App extends React.Component<Props,State>{
    private stage: number
    private users: string[]
    private message: string
    constructor(props: Props){
        super(props)
        this.message = 'hello'
        this.stage = 2
    }
    componentWillMount(){
        // console.log('will')
        console.log(getLeaderboardRecords())
    }

    getUsers(users: string[]){
        this.users = users
        this.stage = 1
        this.forceUpdate()
        // console.log(users)
    }



    getResult(status: number){
        console.log('get results')
        switch(status){
            // draw
            case 0 :
                // switch users
                this.users  = [this.users[1], this.users[0]]
                this.stage = 2
                this.message = 'draw'
                // show 'draw' message for a while 
                this.forceUpdate()
                // then play again
                setTimeout(() => {
                    this.stage = 1
                    this.forceUpdate()}
                ,2000)
                break
            case 1 :

            case 2 :
                // someone wins
                const winner = this.users[status-1]
                const looser = (status-1 == 0) ? this.users[1] : this.users[0]
                this.message = winner + ' wins!'
                // save stats
                updateRecords(winner, looser)
                this.stage = 2
                this.forceUpdate()
                break
            case 3 : 
                this.users  = [this.users[1], this.users[0]]
                this.stage = 1
                this.forceUpdate()
                break
            default :
        }
    }

    render(){
        switch(this.stage) {
            case 0 :
                return <Login users={getNames()} callback={this.getUsers.bind(this)}/>
            case 1 :
                return <Game turns={[]} users={this.users} callback={this.getResult.bind(this)}/>
            case 2 :
                return <Leaderboard message={this.message} callback={this.getResult.bind(this)}  
                leaderboard={getLeaderboardRecords()}/>
            default :
             return null
        }    
    }
}


ReactDOM.render(<App/>,document.getElementById('layout'))
// ReactDOM.render(<Game turns={[]} users={['vanya','tanya']}/>,document.getElementById('layout'))
// ReactDOM.render(<Game turns={[2,3,5,7,8]} users={['vanya','tanya']}/>,document.getElementById('layout'))
// ReactDOM.render(<Login users={['computer','beavis','butthead']}/>,document.getElementById('layout'))
