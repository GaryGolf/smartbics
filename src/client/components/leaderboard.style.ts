import * as FreeStyle from 'free-style'


export const Style = FreeStyle.create()


export const jss = {

    container: Style.registerStyle({
        
        color: 'silver'
        
    }),

    leaderboard: Style.registerStyle({
        margin: ' 30px auto',
        height: '450px',
        overflow: 'auto',
        width: '360px',
        background: 'rgba(100,100,100,.05)'
    }),

    table: Style.registerStyle({
        width: '100%',
    }),
    tableheader: Style.registerStyle({
        fontWeight: 'bold',
        borderBottom: '1px solid silver',
        padding: '5px'
    })


}