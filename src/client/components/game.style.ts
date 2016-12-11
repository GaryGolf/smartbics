import * as FreeStyle from 'free-style'


export const Style = FreeStyle.create()

const width = Math.min(340,window.screen.width-20, window.screen.height-30)

export const jss = {

    container: Style.registerStyle({
        position: 'absolute',
        top: '0px',
        left: '10px',
        width: '100%',
        height: '100%',
        display: 'table-cell',
        textAlign: 'center'
        // padding: '100px'

    }),
    game: Style.registerStyle({

        // position: 'relative',
        margin: 'auto',
        width: '360px',
        // marginTop: '10%',
        // border: '1px solid black' 
    }),
    cell: Style.registerStyle({
        
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
        color: '#AAAAAA',
        padding: '5px',
        display: 'table-cell',
        verticalAlign: 'middle',
        textAlign: 'center',
        // fontSize: '2rem'
        // background: 'rgba(255,255,255,.5)',
    }),
    underline: Style.registerStyle({
        color: 'white',
        textDecoration: 'underline'
    }),

}