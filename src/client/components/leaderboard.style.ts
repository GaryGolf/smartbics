import * as FreeStyle from 'free-style'


export const Style = FreeStyle.create()


export const jss = {

    container: Style.registerStyle({
        
        color: 'silver'
        
    }),

    leaderboard: Style.registerStyle({
        margin: ' 30px auto',
        height: '400px',
        overflow: 'auto',
        width: '320px',
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