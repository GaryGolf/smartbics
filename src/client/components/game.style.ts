import * as FreeStyle from 'free-style'


export const Style = FreeStyle.create()

const width = Math.min(340,window.screen.width-80, window.screen.height-100)

const transformAnimation = Style.registerKeyframes({
        from: { transform: 'translate('+window.screen.width+'px)' }
})

export const jss = {

    

    container: Style.registerStyle({
        
        top: '0px',
        width: '100%',
        height: '100%',
        textAlign: 'center',
        animationName: transformAnimation,
        animationDuration: '.5s'
        
    }),
    game: Style.registerStyle({

        margin: 'auto',
        width: (width+4)+'px',
        marginTop: '5%' 
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

    navy: Style.registerStyle({
        color: '#EEEEEE'
    })

}