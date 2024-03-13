// Example using useEffect hook

import { Base_url } from '../Config/BaseUrl';
import { KJUR } from 'jsrsasign';
import React,{useEffect,Fragment} from "react";
import { useLocation } from 'react-router-dom';
const ZoomCdn = () => {
    const location = useLocation();
    const { ZoomMeetingNumber } = location.state; 
  var authEndpoint = Base_url
  var sdkKey = 'TsFvuPFLTeKf7_bNBWggPA'
  var meetingNumber =ZoomMeetingNumber.number
  var passWord = ZoomMeetingNumber.pass
  var role = 0
  var userName = "Akshay Pareek"
  var userEmail = "Akshay96102@gmail.com"
  var registrantToken = ''
  var zakToken = ''
  var leaveUrl = 'http://localhost:3000'
  var userId="Akshay96102@gmail.com"
  var SECRET="C7Dm4JuZ2QXoN0bM2OYTw5JxZvjPK1y9"
  
//   function getSignature() {
//     const iat = Math.round(new Date().getTime() / 1000) - 30
//     const exp = iat + 60 * 60 * 2
//     const oHeader = { alg: 'HS256', typ: 'JWT' }
  
//     const oPayload = {
//       sdkKey: sdkKey,
//       appKey: sdkKey,
//       mn: meetingNumber,
//       role: role,
//       iat: iat,
//       exp: exp,
//       tokenExp: exp,
//       userId: userId,
//     }
  
//     const sHeader = JSON.stringify(oHeader)
//     const sPayload = JSON.stringify(oPayload)
//     const sdkJWT = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, SECRET);

//     const data = {
//       meetingId:meetingNumber,
//       meetingPassword:passWord
//     }
   
    
//     return sdkJWT
//   }

//   const startZoomMeeting = () => {
//     // Replace these values with your actual Zoom API key and meeting number
//     const apiKey = sdkKey;
    

//     window.ZoomMtg.init({
//       leaveUrl: leaveUrl,
//       isSupportAV: true,
//       success: function () {
//         window.ZoomMtg.join({
//           meetingNumber: meetingNumber,
//           userName: 'Akshay Pareek',
//           apiKey: apiKey,
//           signature: getSignature(),
//           success: function (res) {
//             console.log('Meeting joined successfully:==>', res);
//           },
//           error: function (res) {
//             console.error('Error joining meeting:==>', res);
//           },
//         });
//       },
//       error: function (res) {
//         console.error('Error initializing Zoom:==>', res);
//       },
//     });
//   };



useEffect(async()=>{
   const {ZoomMtg} = await import ("@zoomus/websdk");
   ZoomMtg.setZoomJSLib('https://source.zoom.us/3.1.6/lib', '/av');
   ZoomMtg.preLoadWasm();
   ZoomMtg.prepareJssdk();

   ZoomMtg.generateSDKSignature({
    meetingNumber:meetingNumber,
    role:role,
    sdkKey:sdkKey,
    sdkSecret:SECRET,

    success:function(signature){
        ZoomMtg.init({
            leaveUrl:leaveUrl,
            success:function(data){
                 ZoomMtg.join({
                    meetingNumber: meetingNumber,
                    signature:signature.result,
                    sdkKey:sdkKey,
                    userName:'Akshay Pareek',
                    userEmail: 'akshay96102@gmail.com',
                    passWord:passWord,
                    tk: '',
                    
                    success: function (res) {
                                console.log('Meeting joined successfully:==>', res);
                              },
                    error: function (res) {
                                console.error('Error joining meeting:==>', res);
                              },
                 })
            },
            error:function(err){

                console.log(err)
            }
        })
    },
    error:function(error){
        console.log(error);
    }
   })
},[])
  return  <Fragment>
        <link type="text/css" rel="stylessheet" href='https://source.zoom.us/3.1.6/css/bootstrap.css' />
        <link type="text/css" rel="stylessheet" href='https://source.zoom.us/3.1.6/css/react-select.css' />
  </Fragment>
};

export default ZoomCdn;

