import * as React from 'react'
import {LeaderboardRecord} from './localstore'
import {Style, jss} from './leaderboard.style'

interface Props { message: string, callback: any, leaderboard: LeaderboardRecord[] }
interface State {}

export default class Leaderboard extends React.Component<Props,State>{
   
    constructor(props: Props){
        super(props)
    }
    // hContinue(event: MouseEvent){

    // }

    render(){
        return (
            <div className={jss.container}>
                <h1>{this.props.message}</h1>
                <div className={jss.leaderboard}>{this.leaderboard()}</div>
                <button onClick={this.props.callback.bind(this,3)}>Continue</button>
                <style>{Style.getStyles()}</style>
            </div>
        )    
    }

    leaderboard(){
        const records = this.props.leaderboard.map((val, idx) => {
            return (
                <tr key={idx} >
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
}
