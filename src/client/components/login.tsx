import * as React from 'react'
import {Style, jss} from './login.style'


interface Props {users: string[], onDispatch: any}
interface State {}
export default class Login extends React.Component <Props, State>{

    private input1: HTMLInputElement
    private input2: HTMLInputElement
    constructor(props: Props) {

        super(props)
    }

    componentDidMount() { 
    
        this.input1.focus()        
        this.input2.disabled = true
    }

    input1Handler(event: KeyboardEvent) {

        const i1 = this.input1
        const i2 = this.input2

        switch(event.key) {
            case 'Enter' :
                // user1 name should not be empty
                if(i1.value == '') break    
                if(i2.value != '' && i1.value != i2.value ) return this.loadGame()
                i2.disabled = false
                // maybe user1 wants to play with computer?
                if(i1.value != 'computer') i2.value = 'computer'
                // maybe not
                i2.setSelectionRange(0,100)
                i2.focus()
            case 'Backspace' :
                break
            default :
                this.userAutocomplete(1)
        }
    }
    input2Handler(event: KeyboardEvent){

        const i1 = this.input1
        const i2 = this.input2
        switch(event.key){
            case 'Enter': 
                // user1 name should not be empty
                if(i1.value == '' || i2.value == '' || i1.value == i2.value) break 
                i2.setSelectionRange(0,0)
                i2.blur()
                this.loadGame()
            case 'Backspace' :
                break
            default:
                this.userAutocomplete(2)
        }
    }

    userAutocomplete(inputNum: number){
        const input = (inputNum == 1 ) ? this.input1 : this.input2
        const length = input.value.length
        if(length < 2 ) return
        for(var i = 0; i < this.props.users.length; i++)
            if(this.props.users[i].indexOf(input.value) == 0) {
                input.value = this.props.users[i]
                input.setSelectionRange(length,input.value.length)
                return
            }  
    }

    loadGame(){
        const users = {users:[this.input1.value, this.input2.value]}
        this.props.onDispatch('GET_USERS',users)
    }

    render() {
        const in1 = { onKeyUp: this.input1Handler.bind(this) }
        const in2 = { onKeyUp: this.input2Handler.bind(this) }
        return (

            <div className={jss.login}>
                <h3 className={jss.title}>крестики - нолики</h3>
                <input ref={el => this.input1 = el} className={jss.input} 
                type="text" placeholder="User 1" {...in1}/>
                <input ref={el => this.input2 = el} className={jss.input} 
                type="text" placeholder="User 2" {...in2} />
                
                <style>{Style.getStyles()}</style>
            </div>)
    }
}