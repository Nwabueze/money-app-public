import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    /* __next is actually #__next, its an id */
    __next: {width:'100vw', marginTop:0},
    navBar: {
        backgroundColor: '#203040',
        position: 'relative',
        top:0,
        marginLeft:0,
        marginRight:0,
        width:'100%',
        '& a': {
            color: '#ffff!important',
            marginLeft: 10
        }
    },
    brand: {fontWeight: 'bold', fontSize: '1.5rem'},
    grow: {flexGrow:1},
    main: {
        minHeight: '80vh'
    },
    footer: {
        textAlign: 'center',
        marginTop: 10,
    },
    section: {
        marginTop: 10,
        marginBottom: 10
    },
    ml_30: {
        marginLeft: "30px"
    },
    mtop: {
        marginTop: "15px",
    },
    info: {
        color: "royalblue",
        marginTop: "30px",
    },
    appName: {
        fontSize: "27px",
    },

})

export default useStyles;