import * as React from 'react'
import {Style, jss} from './game.style'
import {win, isGameEnded,makeDecision} from './robot'


interface Props {turns: number[], users: string[], onDispatch: any}
interface State {}

export default class Game extends React.Component <Props, State>{

    private cells: HTMLDivElement[]
    private turns: number[]
    private playMode: boolean
    private user1: HTMLDivElement
    private user2: HTMLDivElement
    
    
    constructor(props: Props) {
        super(props)
        this.cells = new Array(9)
        this.turns = []
        this.playMode = false
    }

    componentDidMount(){
        this.user1.classList.add(jss.underline)
        if(this.props.turns.length > 0) this.play()
        else if(this.nameOfCurrentUser() == 'computer')
            this.makeTurn(makeDecision(this.turns))
    }

    play(){
        
        this.playMode = true
        var i = 0
        const int = setInterval(()=>{
            if(this.props.turns.length > i) {
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
            // save to log
            if(!this.playMode) {
                
                const payload = {
                    turns:  this.turns,
                    users:  this.props.users,
                    winner: (this.turns,length%2) ? this.props.users[1] : this.props.users[0],
                    looser: (this.turns,length%2) ? this.props.users[0] : this.props.users[1],
                }
                setTimeout(this.props.onDispatch.bind(this,'CONGRAT_WINNER', payload),300)
            }else{
                // setTimeout(this.props.callback.bind(this,0,this.turns),1500)
                setTimeout(this.props.onDispatch.bind(this,'SHOW_LEADERBAORD'),1500)
            }
            return
        }
        if(isGameEnded(this.turns)) return this.props.onDispatch('SHOW_LEADERBAORD') // draw
        this.user1.classList.toggle(jss.underline)
        this.user2.classList.toggle(jss.underline)
        if(this.nameOfCurrentUser() == 'computer'){
            if(this.playMode) return
            const decision = makeDecision(this.turns)
            this.makeTurn(decision)
        }
    }

    // user click handler
    turn(sector: number){
        if(this.playMode) return
        this.makeTurn(sector)
    }

    render(){
        return (
            <div className={jss.container}>
            <div className={jss.game}>
                <table>{this.drawBoard()}</table>
                <table>{this.drawUsers()}</table>
                <style>{Style.getStyles()}</style>
            </div>
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
    
    nameOfCurrentUser(){
        return (this.turns.length%2) ? this.props.users[1] : this.props.users[0]
    }
}

