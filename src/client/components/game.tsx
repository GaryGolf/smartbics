import * as React from 'react'
import {Style, jss} from './game.style'
import {win, isGameEnded} from './robot'

interface Props {turns: number[], users: string[], callback: any}
interface State {}
export default class Game extends React.Component <Props, State>{
    private cells: HTMLDivElement[]
    private turns: number[]
    private playMode: boolean
    private user1: HTMLDivElement
    private user2: HTMLDivElement
    private turnsOrder: boolean // if true user1 plays first
    constructor(props: Props) {

        super(props)
        this.cells = new Array(9)
        this.turns = []
        this.playMode = false
        

        // [this.user1,this.user2] =this.props.users
    }

    componentDidMount(){
        console.log('yo')
        this.user1.classList.add(jss.underline)
        if(this.props.turns.length > 0) this.play()
    }
    play(){
        this.playMode = true
        var i = 0
        const int = setInterval(()=>{
            if(this.props.turns.length > i){
                this.makeTurn(this.props.turns[i++])
            } else {
                clearInterval(int)
            }
        },1500)
    }
    makeTurn(sector: number){
        // empty sector?
        if(this.turns.indexOf(sector) >=0) return
        // save turn
        this.turns.push(sector)
        // odd - tic, even - tac
        
        const className = (this.turns.length%2) ? 'fa fa-times fa-3x' : 'fa fa-circle fa-3x'
        this.cells[sector].children.item(0).className = className
        // does somebody win ?
        if(win(this.turns)) {
            const user = (this.turns.length%2) ? 0 : 1
            console.log('the winner is '+  this.props.users[user])
            this.props.callback(user + 1)
            // this.playMode = true
            return
        }
        if(isGameEnded(this.turns)) this.props.callback(0) // draw
        this.user1.classList.toggle(jss.underline)
        this.user2.classList.toggle(jss.underline)
    }
    // user click handler
    turn(sector: number){
        if(this.playMode) return
        this.makeTurn(sector)
    }
    render(){
        return (
            <div className={jss.game}>
                <table>{this.drawBoard()}</table>
                <table>{this.drawUsers()}</table>
                <style>{Style.getStyles()}</style>
            </div>
        )
    }
    drawBoard(){
        return (
            <tbody>
                <tr>
                    <td>
                        <div ref={d=>this.cells[0]=d} className={jss.cell} onClick={this.turn.bind(this,0)}><i></i></div>
                    </td>
                    <td>
                        <div ref={d=>this.cells[1]=d} className={jss.cell} onClick={this.turn.bind(this,1)}><i></i></div>
                    </td>
                    <td>
                        <div ref={d=>this.cells[2]=d} className={jss.cell} onClick={this.turn.bind(this,2)}><i></i></div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div ref={d=>this.cells[3]=d} className={jss.cell} onClick={this.turn.bind(this,3)}><i></i></div>
                    </td>
                    <td>
                        <div ref={d=>this.cells[4]=d} className={jss.cell} onClick={this.turn.bind(this,4)}><i></i></div>
                    </td>
                    <td>
                        <div ref={d=>this.cells[5]=d} className={jss.cell} onClick={this.turn.bind(this,5)}><i></i></div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div ref={d=>this.cells[6]=d} className={jss.cell} onClick={this.turn.bind(this,6)}><i></i></div>
                    </td>
                    <td>
                        <div ref={d=>this.cells[7]=d} className={jss.cell} onClick={this.turn.bind(this,7)}><i></i></div>
                    </td>
                    <td>
                        <div ref={d=>this.cells[8]=d} className={jss.cell} onClick={this.turn.bind(this,8)}><i></i></div>
                    </td>
                </tr>
            </tbody>
        )
    }

    drawUsers(){
        return (
            <tbody>
                <tr>
                    <td><div ref={d=>this.user1=d}className={jss.user}>
                        <i className="fa fa-times"></i>&nbsp;{this.props.users[0]}</div></td>
                    <td><div ref={d=>this.user2=d}className={jss.user}>
                        <i className="fa fa-circle"></i>&nbsp;{this.props.users[1]}</div></td>
                </tr>
            </tbody>
        )
    }
}

