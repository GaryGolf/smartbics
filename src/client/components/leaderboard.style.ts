import * as FreeStyle from 'free-style'

const tabHeight = Math.min(480,window.screen.height/2)

export const Style = FreeStyle.create()


export const jss = {

    container: Style.registerStyle({
        
        color: 'silver',
        width: '100%',
        height: '100%'
        
    }),

    leaderboard: Style.registerStyle({
        margin: ' 30px auto',
        height: tabHeight,
        overflow: 'auto',
        width: '300px',
        background: 'rgba(100,100,100,.05)'
    }),

    table: Style.registerStyle({
        width: '100%',
        cursor: 'pointer'
    }),
    tableheader: Style.registerStyle({
        fontWeight: 'bold',
        fontSize: '1.7rem',
        borderBottom: '1px solid silver',
        padding: '5px'
    }),
    button: Style.registerStyle({
       width: '120px',
       color: 'gray',
       textShadow: '1px 1px 2px rgba(24,56,100,.7)'
    })
}