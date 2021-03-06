import * as React from 'react'
import {NEW_GAME, START_GAME, REPLAY_GAME} from './constants'
import {LeaderboardRecord, getLeaderboardRecords, getLogDataByName , LeaderboardLog} from './localstore'
import {Style, jss} from './leaderboard.style'


interface Props { message: string, onDispatch: any }
interface State {}

export default class Leaderboard extends React.Component<Props,State>{
   
   private table: JSX.Element
   private message: string
   private log: boolean
   private swipeStart: number

    constructor(props: Props){
        super(props)
        this.log = false
        this.table = this.leaderboard()
        this.message = props.message
    }

    showLog(name: string) {
        this.message = name
        this.log = true
        this.forceUpdate()
    }
    play(record: LeaderboardLog){
        this.props.onDispatch(REPLAY_GAME, record)
    }

    swipeHandler(event: TouchEvent) {

        if(!event.touches ||  !event.touches.length) return

        const dx = event.touches.item(0).pageX - this.swipeStart
        
    
        if(dx >= 50) {
            event.target.removeEventListener('touchmove',this.swipeHandler.bind(this))
            this.props.onDispatch(START_GAME)
        }
        if(dx <= -50) {
            event.target.removeEventListener('touchmove',this.swipeHandler.bind(this))
            this.props.onDispatch(NEW_GAME)
        }
        
    }

    touchHandler(event: TouchEvent) {
        if(!event.touches ||  !event.touches.length) return
        this.swipeStart = event.touches.item(0).pageX
        console.log('start at '+ this.swipeStart)
        event.target.addEventListener('touchmove',this.swipeHandler.bind(this))
    }

        
    render(){
        const touch = {
            onTouchStart: this.touchHandler.bind(this)
        }
        return (
            <div className={jss.container} {...touch}>
                <h1>{this.message}</h1>

                <div className={jss.leaderboard}>
                   { (this.log) ? this.drawLog(this.message) : this.leaderboard()}
                </div>
                <div>
                <button className={jss.button} onClick={this.props.onDispatch.bind(this,NEW_GAME)}>New Game</button>
                <button className={jss.button} onClick={this.props.onDispatch.bind(this,START_GAME)}>Continue</button>
                </div>
                <style>{Style.getStyles()}</style>
            </div>
        )    
    }

    leaderboard(){
        
        const lb = getLeaderboardRecords()
        const records = lb.map((val, idx) => {
            return (
                <tr key={idx} onClick={e => this.showLog(val.name)} >
                    <td>{val.name}</td>
                    <td>{val.w}</td>
                    <td>{val.l}</td>
                </tr>)
        })

        return (
            <table className={jss.table}>
                <tbody>
                    <tr className={jss.tableheader}>
                        <td>name</td>
                        <td>w</td>
                        <td>l</td>
                    </tr>
                    {records}
                </tbody>
            </table>
        )

    }

    // draw users data log
    drawLog(name: string) {

        const logdata = getLogDataByName(name)
         const records = logdata.map((val, idx) => {
             const date = new Date(val.date)
             const timestr = date.toDateString().substr(4,7) + date.toTimeString().substr(0,8) 
             const users = val.users.join(' - ')
            return (
                <tr key={idx} onClick={e => this.play(val)}>
                    <td>{timestr}</td>
                    <td>{users}</td>
                </tr>)
        })

        return (
            <table className={jss.table}>
                <tbody>
                    <tr className={jss.tableheader}>
                        <td>date</td>
                        <td>users</td>
                    </tr>
                    {records}
                </tbody>
            </table>
        )
    }
    
}
