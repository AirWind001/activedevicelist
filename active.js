/*
Javascript program for Active Device Dashboard.
Date: 17th January 2023
Company: EBM Papst Neo, Dortmund
Author: Arvind Raju
*/

// import fs module in which writeFile function is defined.
const fsLibrary  = require('fs')

var IGLTE=0, IGAIR=0, modv6=0, modv6fancy=0, Fan_ACE=0, simcard=0, modv5=0, fan_v2=0, other=0, activeDevices=0, deactive=0;
// var allProfiles= [IGLTE, IGAIR, modv6, modv6fancy,  Fan_ACE, simcard, modv5, fan_v2 ]
async function calcActiveDevices(){
try {
  const response = await fetch('https://emea5.ebmpapstneo.io/api/auth/login', {
  method: "POST",
  body: JSON.stringify({
	"username":"arvind.raju@epneo.com",
	"password":"ebmpapstneo1"
})})
var token= await response.json();
  //console.log(token);
  token.token = "Bearer " + token.token;
  console.log(token);

// var token= {token: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhcnZpbmQucmFqdUBlcG5lby5jb20iLCJ1c2VySWQiOiJmZTRjZDE3MC01ZWE3LTExZWQtOWE4NS00M2I1ODY2MTYxYWUiLCJzY29wZXMiOlsiVEVOQU5UX0FETUlOIl0sImlzcyI6InRoaW5nc2JvYXJkLmlvIiwiaWF0IjoxNjczNTMwMTg3LCJleHAiOjE2NzM1MzkxODcsImZpcnN0TmFtZSI6ImFydmluZCIsImxhc3ROYW1lIjoicmFqdSIsImVuYWJsZWQiOnRydWUsImlzUHVibGljIjpmYWxzZSwidGVuYW50SWQiOiJkZjgwYmRjMC0xOGJlLTExZTktYjdjNi1hZmMwM2VjYjdiMmEiLCJjdXN0b21lcklkIjoiMTM4MTQwMDAtMWRkMi0xMWIyLTgwODAtODA4MDgwODA4MDgwIn0.8-C5K-vHHrDw0MoKjkUw9YheMKi8mg35KO0PjcdUwGy51Y0fnraFiIQagG94sX3w_1vl5Zvjkt3Fsgan3JEJpA", refreshToken: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhcnZpbmQucmFqdUBlcG5lby5jb20iLCJ1c2VySWQiOiJmZTRjZDE3MC01ZWE3LTExZWQtOWE4NS00M2I1ODY2MTYxYWUiLCJzY29wZXMiOlsiUkVGUkVTSF9UT0tFTiJdLCJpc3MiOiJ0aGluZ3Nib2FyZC5pbyIsImlhdCI6MTY3MzUzMDE4NywiZXhwIjoxNjc0MTM0OTg3LCJpc1B1YmxpYyI6ZmFsc2UsImp0aSI6ImQ1N2QyNmE0LTE3ODAtNDM4Ny1hYmVkLTEyZDFlY2NlNWIyYyJ9.T1rV5PdGLKjT_KoWSrXaMelp4oP5zwQZaqTLVr1rn33wdDEhjbCIirlLsM4acHN0qj8sSsRJDXuY-mTQRYFKrw", scope: null}
// console.log("token is", token.token)
  var IGLTE= await fetch('https://emea5.ebmpapstneo.io:443/api/tenant/devices?pageSize=10000&page=0&type=IntelliGateLTE', {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': token.token,      
    }    
  })
  IGLTE= await IGLTE.json()
  //console.log(IGLTE);
  var modv6= await fetch('https://emea5.ebmpapstneo.io:443/api/tenant/devices?pageSize=10000&page=0&type=Modbus%20V6%20Fan', {  // Modbus V6 Fan
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': token.token,      
    }    
  })
  modv6= await modv6.json()  
  //   //console.log(modv6);
    var modv6fancy= await fetch('https://emea5.ebmpapstneo.io:443/api/tenant/devices?pageSize=10000&page=0&type=Modbus-V6_FANcy', {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': token.token,      
    }    
  })
    modv6fancy= await modv6fancy.json() 
    //console.log(modv6fancy);
  var Fan_ACE= await fetch('https://emea5.ebmpapstneo.io:443/api/tenant/devices?pageSize=10000&page=0&type=Fan_ACE', {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': token.token,      
    }    
  })  
  Fan_ACE= await Fan_ACE.json()    
    //console.log(Fan_ACE);
  var IGAIR= await fetch('https://emea5.ebmpapstneo.io:443/api/tenant/devices?pageSize=10000&page=0&type=IntelliGateAIR', {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': token.token,      
    }    
  })
  IGAIR= await IGAIR.json()
    //console.log(IGAIR);
  var simcard= await fetch('https://emea5.ebmpapstneo.io:443/api/tenant/devices?pageSize=10000&page=0&type=SIM%20CARD', {    //  SIM CARD
    method: "GET", 
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': token.token,      
    }    
  })  
  simcard= await simcard.json()
    //console.log(simcard);
  var modv5= await fetch('https://emea5.ebmpapstneo.io:443/api/tenant/devices?pageSize=10000&page=0&type=Modbus%20V5.0%20Fan', {  //  Modbus V5.0 Fan
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': token.token,      
    }    
  })   
  modv5= await modv5.json()
    //console.log(modv5);
  var fan_v2= await fetch('https://emea5.ebmpapstneo.io:443/api/tenant/devices?pageSize=10000&page=0&type=fan_v2', {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': token.token,      
    }    
  })  
  fan_v2= await fan_v2.json()
    //console.log(fan_v2);
    var IGWifi= await fetch('https://emea5.ebmpapstneo.io:443/api/tenant/devices?pageSize=10000&page=0&type=IntelliGateWifi', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token.token,      
      }    
    })  
    IGWifi= await IGWifi.json()  

////////////////////////////////////////////////////////////////////////////////////////////////////////
// Other Sensors
var bravo= await fetch('https://emea5.ebmpapstneo.io:443/api/tenant/devices?pageSize=10000&page=0&type=BRAVO', {
  method: "GET",
  headers: {
    'Content-Type': 'application/json',
    'X-Authorization': token.token,      
  }    
})  
bravo= await bravo.json() 

var aerasgard= await fetch('https://emea5.ebmpapstneo.io:443/api/tenant/devices?pageSize=10000&page=0&type=AERASGARD', {
  method: "GET",
  headers: {
    'Content-Type': 'application/json',
    'X-Authorization': token.token,      
  }
}) 
// Our Sensor
aerasgard= await aerasgard.json()
// console.log(aerasgard);
// console.log(aerasgard)
var temco= await fetch('https://emea5.ebmpapstneo.io:443/api/tenant/devices?pageSize=10000&page=0&type=Temco%20Controls%20PM2.5/10-W', {
  method: "GET",
  headers: {
    'Content-Type': 'application/json',
    'X-Authorization': token.token, 
  }
})
temco= await temco.json()

// AirGradient ONE
var airG= await fetch('https://emea5.ebmpapstneo.io:443/api/tenant/devices?pageSize=10000&page=0&type=AirGradient%20ONE', {
  method: "GET",
  headers: {
    'Content-Type': 'application/json',
    'X-Authorization': token.token,
  }
})  
airG= await airG.json()       
  // var deviceData= await deviceData.json();  

//console.log(fan_v2.totalElements, modv5.totalElements, simcard.totalElements, IGAIR.totalElements, IGLTE.totalElements, Fan_ACE.totalElements, modv6fancy.totalElements, modv6.totalElements)
//console.log(fan_v2.totalElements+ modv5.totalElements+ simcard.totalElements+ IGAIR.totalElements+ IGLTE.totalElements+ Fan_ACE.totalElements+ modv6fancy.totalElements+ modv6.totalElements)
//console.log(IGLTE.data[800].id.id)
//console.log(IGLTE.totalElements)
 var allProfiles= [IGLTE, IGAIR, modv6, modv6fancy, Fan_ACE, modv5, fan_v2, IGWifi]
// var allProfiles= [ modv6fancy, Fan_ACE, modv5, fan_v2]
var timestamp= Math.floor(new Date().getTime())
var id, link, activeList= []
for (let profileIndex=0; profileIndex <allProfiles.length; profileIndex++){  // outer for loop, to loop through the device profiles
      var profile_= allProfiles[profileIndex].data
        //console.log(profile_.totalElements)
        //console.log(profile_.length)
        //console.log("length of this profile is ", profile_)
        //console.log("above profile is of index", profileIndex)
     for (let index = 0; index < profile_.length; index++) {  // test for high index number
      //console.log(IGLTE.data[index].id.id)
      //id= IGLTE.data[index].id.id
      id= profile_[index].id.id
      //console.log(id)
      link= 'https://emea5.ebmpapstneo.io:443/api/plugins/telemetry/DEVICE/' + id + '/values/attributes?keys=lastActivityTime'
      //console.log(link)
          var ts= await fetch(link, {
          method: "GET",
          headers: {
          'Content-Type': 'application/json',
          'X-Authorization': token.token,
          }
          })
          ts= await ts.json()
          //console.log(ts)
          if( ts.length != 0){
          //console.log(index)
            //if ( timestamp - ts[0].lastUpdateTs > 86400000  ) {  // 7 zeros is 3 hours. 10000000. // 86400000 is 1 day 24 hours ( here they use milliseconds format)
            if ( timestamp - ts[0].lastUpdateTs > 60480000   ) { // one week 
              //console.log('device is inactive')          
              deactive++
            }
            else{
            //console.log("device active")
            activeDevices++
          }
          }
          else {
            //console.log("this device id is empty")
          }

          //console.log(ts[0].lastUpdateTs)
    }
    console.log("active devices at the end of this profile is", activeDevices)
    activeList.push(activeDevices)
    activeDevices=0
   }
   //simcard
   /////////////////////////////////////////////////////////////////////////////////////////////
   let default_=0
   var profile_= simcard.data
   //console.log(profile_.totalElements)
   //console.log(profile_.length)
   //console.log("length of this profile is ", profile_)
   //console.log("above profile is of index", profileIndex)
for (let index = 0; index < profile_.length; index++) {  // test for high index number
 //console.log(IGLTE.data[index].id.id)
 //id= IGLTE.data[index].id.id
 id= profile_[index].id.id
 //console.log(id)
 link= 'https://emea5.ebmpapstneo.io:443/api/plugins/telemetry/DEVICE/' + id + '/values/attributes?keys=Status'
 //console.log(link)
     var ts= await fetch(link, {
     method: "GET",
     headers: {
     'Content-Type': 'application/json',
     'X-Authorization': token.token,
     }
     })
     ts= await ts.json()
     //console.log(ts)
     if( ts.length != 0){
     //console.log(index)
     switch(ts[0].value){
      case 'ONLINE':
        // console.log("inside switch ONLINE")
        activeDevices++
      case 'OFFLINE':
        deactive++
      default:
        // console.log("default")
        default_++
     }    
     }
     else {
       //console.log("this device id is empty")
     }

     //console.log(ts[0].lastUpdateTs)
}
console.log("active devices at the end of simcard profile is", activeDevices)
activeList.push(activeDevices)
// activeDevices=0   // this is next level jugaad you have done. be mindful of this when you want to change the code in the future XP
   /////////////////////////////////////////////////////////////////////////////////////////////
//console.log("list of active devices is", activeList)
//console.log("list of all devices is", [IGLTE, IGAIR, modv6, modv6fancy, Fan_ACE, simcard, modv5, fan_v2])
var IGLTE_Active= activeList[0], IGAIR_Active=activeList[1], modv6_Active=activeList[2], modv6fancy_Active=activeList[3], Fan_ACE_Active=activeList[4], modv5_Active=activeList[5], fan_v2_Active=activeList[6], IGWifi_Active= activeList[7], bravo_Active=activeList[8], aerasgard_Active=activeList[9], temco_Active=activeList[10], airG_Active= activeList[11], simcard_Active=activeDevices
let total_Active= activeList.reduce((a, b) => {
  return a + b;
});
total_Active= total_Active+ activeDevices
console.log("simcard and total active is ", IGLTE_Active, simcard_Active, total_Active)
// var IGLTE_Active= 56, IGAIR_Active=52, modv6_Active=74, modv6fancy_Active=16, Fan_ACE_Active=91, 
// simcard_Active=64, modv5_Active=87, fan_v2_Active=15
// [IGLTE, IGAIR, modv6, modv6fancy, Fan_ACE, simcard, modv5, fan_v2]
//console.log("IGLTE", IGLTE)
//console.log("length of all devices are", IGLTE.data.length, IGAIR.data.length, modv6.data.length, modv6fancy.data.length, Fan_ACE.data.length, simcard.data.length, modv5.data.length, fan_v2.data.length)
var IGLTE_inactive=IGLTE.data.length -IGLTE_Active, IGAIR_inactive= IGAIR.data.length- IGAIR_Active, modv6_inactive= modv6.data.length- modv6_Active, modv6fancy_inactive= modv6fancy.data.length- modv6fancy_Active
var Fan_ACE_inactive= Fan_ACE.data.length- Fan_ACE_Active, simcard_inactive= simcard.data.length- simcard_Active, modv5_inactive= modv5.data.length- modv5_Active
var fan_v2_inactive= fan_v2.data.length- fan_v2_Active, IGWifi_inactive= IGWifi.data.length- IGWifi_Active
var bravo_inctive= bravo.data.length- bravo_Active, aerasgard_inactive = aerasgard.data.length- aerasgard_Active
var temco_inactive= temco.data.length- temco_Active, airG_inactive= airG.data.length- airG_Active
//console.log("inactive devices are", IGLTE_inactive, IGAIR_inactive, modv6_inactive, modv6fancy_inactive, Fan_ACE_inactive, simcard_inactive, modv5_inactive, fan_v2_inactive)
var data = {"deviceName":"activelist","deviceType":"default", "groupName": "arvindspublic", IGLTE_Active, IGAIR_Active, modv6_Active, modv6fancy_Active,  Fan_ACE_Active, simcard_Active, modv5_Active, fan_v2_Active, IGWifi_Active,bravo_Active, aerasgard_Active, temco_Active, airG_Active, IGLTE_inactive, IGAIR_inactive, modv6_inactive, modv6fancy_inactive, Fan_ACE_inactive, simcard_inactive, modv5_inactive, fan_v2_inactive, IGWifi_inactive, bravo_inctive, aerasgard_inactive, temco_inactive, airG_inactive, total_Active}
//console.log(data)
  var http= await fetch("https://emea4.ebmpapstneo.io/api/v1/integrations/http/382c5cc0-8c01-90d0-36cd-82cda88e7a22",
{
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  method: "POST",
  body: JSON.stringify(data)
})

// Data which will need to add in a file.
let date = "\ncode ran successfully on " + Date().toLocaleString()

// Write data in 'newfile.txt' .
fsLibrary.appendFile('/home/pi/active_dashboard/log.txt', date, (error) => {

    // In case of a error throw err exception.
    if (error) throw err;
    console.log('Saved!');
})
//toLocaleString()

return token
} catch (error) {
console.error ('ERROR:${error}')
console.error(error)
}

}

calcActiveDevices();
// setInterval(calcActiveDevices, 12*60*60*1000);
//console.log(Date().toLocaleString())
