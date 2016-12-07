import * as React from 'react'
import * as ReactDOM from 'react-dom'

import Login from './components/login'



console.log('index.tsx')

ReactDOM.render(<Login users={['computer','beavis','butthead']}/>,document.getElementById('layout'))
