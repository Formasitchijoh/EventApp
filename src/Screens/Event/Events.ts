import { StyleSheet } from "react-native";

export const events = StyleSheet.create({
    main:{
        flex: 1, 
         justifyContent: 'center', 
         alignItems: 'center',
         height:'100%'
    },
    scrollView: {
        width: '100%',
        height: '100%',
      },
    container:{
       display:'flex',
       flexDirection:'row',
       width:"95%",
        height:100,
        justifyContent:'center',
        alignContent:"center",
        borderWidth:1,
        borderRadius:10,
        shadowRadius: 5,
        shadowColor: '#000',
        shadowOffset: {width: 0, height:2},
        shadowOpacity: 0.8,
        // elevation: ,
        marginBottom:10

    },
    dayColor:{
        width:'10%',
        height:'100%',
        borderStartWidth:5,
        backgroundColor:'purple',
        justifyContent:"flex-start",
         borderTopLeftRadius:10,
         borderBottomLeftRadius:10,
         
    },
    date:{
        width:'15%',
        height:'100%',
        justifyContent:'flex-start',
        alignItems:'center',
        borderWidth:0.5,
        shadowRadius: 5,
        shadowColor: '#000',
        shadowOffset: {width: 0, height:2},
        shadowOpacity: 0.8,
        elevation:1 ,
        // backgroundColor:'purple'
    },
    text1:{
        fontFamily:'Inter',
        fontSize:20,
        fontStyle:"normal",
        fontWeight:'900',
        color:'purple'
    },
    text:{
        fontFamily:'Inter',
        fontSize:20,
        fontStyle:"normal",
        fontWeight:'100'
    },
    text2:{
        fontFamily:'Inter',
        fontSize:30,
        fontStyle:"normal",
        fontWeight:'bold'
    },
    text3:{
        fontFamily:'Inter',
        fontSize:15,
        fontStyle:"normal",
        fontWeight:'100'
    },
    text4:{
        fontFamily:'Inter',
        fontSize:15,
        fontStyle:"normal",
        fontWeight:'bold'
    },
    details:{
        width:'65%',
        height:'auto',
        display:'flex',
         flexDirection:'column',
         gap:5,
         marginLeft:2,
        paddingTop:10,
        paddingLeft:10
    },
    dots:{
        width:'8%',
        height:'auto',
        marginRight:10
    },
  
    
    
})