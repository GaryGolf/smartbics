import * as React from 'react'
import * as ReactDOM from 'react-dom'

// import Login from './components/login'
import Game from './components/game'



// console.log('index.tsx')

// ReactDOM.render(<Game turns={[]} users={['vanya','tanya']}/>,document.getElementById('layout'))
ReactDOM.render(<Game turns={[2,3,5,7,8]} users={['vanya','tanya']}/>,document.getElementById('layout'))
// ReactDOM.render(<Login users={['computer','beavis','butthead']}/>,document.getElementById('layout'))
