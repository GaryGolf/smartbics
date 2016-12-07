import * as FreeStyle from 'free-style'


export const Style = FreeStyle.create()

const width = 360

export const jss = {
    game: Style.registerStyle({

        position: 'absolute',
        margin: 'auto',
        marginTop: '10%',
        // border: '1px solid black' 
    }),
    cell: Style.registerStyle({
        // width: '120px',
        // heisght: '120px',
        display: 'table-cell',
        width: width/3,
        height: width/3,
        verticalAlign: 'middle',
        textAlign: 'center',
        background: 'rgba(255,255,255,.5)',
        border: '1px solid gray',
        cursor: 'default',
    }),
    user: Style.registerStyle({
        width: width/2,
        color: 'white',
        padding: '15px',
        display: 'table-cell',
        verticalAlign: 'middle',
        textAlign: 'center',
        fontSize: '2rem'
        // background: 'rgba(255,255,255,.5)',
    }),
    underline: Style.registerStyle({
        textDecoration: 'underline'
    }),

}