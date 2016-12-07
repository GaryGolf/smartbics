import * as FreeStyle from 'free-style'


export const Style = FreeStyle.create()


export const jss = {

    input: Style.registerStyle({
        
        padding: '4px 12px 4px 12px',
        border: '2px solid gray',
        borderRadius: '6px',
        boxSizing: 'border-box',
        float: 'none',
        transitionDuration: '0.5s',
        margin: '7px',
        width: '250px',
        '&:focus': {
            outline: 'none',
            boxShadow: '3px 3px 6px #222328',
            borderColor: 'silver'
        }
    }),
    login: Style.registerStyle({
       
        // position: 'relative',
        // display: 'table-cell',
        // verticalAlign: 'middle',
        margin: 'auto',
        marginTop: '10%',
        border: '2px dashed #677380',
        padding: '0px 20px 20px 20px',
        width: '310px'
         
    }),
    title: Style.registerStyle({
        color: '#A7A3AA',
        cursor: 'default',
        userSelect: 'none',
        MozUserSelect: 'none',
        WebkitUserSelect: 'none',
        msUserSelect: 'none',
        '&:hover': {
            textShadow: '2px 2px 4px #222328'
        } 
    }),
}