(this["webpackJsonpvirtual-smart-home-controller"]=this["webpackJsonpvirtual-smart-home-controller"]||[]).push([[0],{17:function(t,e,n){},18:function(t,e,n){},21:function(t,e,n){"use strict";n.r(e);var o=n(0),a=n.n(o),c=n(7),s=n.n(c),r=(n(17),n(8)),i=n(9),l=n(12),g=n(11),m=(n(18),n(10)),h=n.n(m),d=n(23),u=n(24),b=n(25),j=n(26),O=n(1),L=function(t){Object(l.a)(n,t);var e=Object(g.a)(n);function n(){var t;Object(r.a)(this,n);for(var o=arguments.length,a=new Array(o),c=0;c<o;c++)a[c]=arguments[c];return(t=e.call.apply(e,[this].concat(a))).state={subject:"VirtualSmartHome/",host:"broker.emqx.io",port:"8084",rooms:[{Name:"Bedroom",LightOn:!1,label:"Bedroom (2nd Floor)"},{Name:"Hallway",LightOn:!1,label:"Hallway (2nd Floor)"},{Name:"Library",LightOn:!1,label:"Library (2nd Floor)"},{Name:"Bathroom",LightOn:!1,label:"Bathroom (1st Floor)"},{Name:"F1_Stairs",LightOn:!1,label:"Stairs (1st Floor)"},{Name:"LivingRoom",LightOn:!1,label:"Living Room (1st Floor)"},{Name:"Garage",LightOn:!1,label:"Garage (Ground Floor)"},{Name:"GF_Stairs",LightOn:!1,label:"Stairs (Ground Floor)"},{Name:"Kitchen",LightOn:!1,label:"Kitchen (Ground Floor)"},{Name:"DiningRoom",LightOn:!1,label:"Dining Room (Ground Floor)"},{Name:"Basement",LightOn:!1,label:"Basement"}],topic:"",client:{},messages:[],connected:!1},t.startConnect=function(){var e="clientID-"+parseInt(100*Math.random()),n=new h.a.Client(t.state.host,Number(t.state.port),e);console.log(n),n.onConnectionLost=t.onConnectionLost,n.onMessageArrived=t.onMessageArrived,n.connect({onSuccess:t.onConnect,useSSL:!0}),t.setState({client:n})},t.onConnect=function(){for(var e=0;e<t.state.rooms.length;e++){var n="".concat(t.state.subject).concat(t.state.rooms[e].Name,"/Light");t.state.client.subscribe(n)}t.setState({connected:!0})},t.onConnectionLost=function(e){console.log("onConnectionLost: Connection Lost"),0!==e.errorCode&&console.log("onConnectionLost: "+e.errorMessage),t.setState({connected:!1})},t.changeLight=function(e,n){var o=e.substring(t.state.subject.length,e.indexOf("/Light"));console.log("Payload",n),console.log("Room Name",o),console.log("State",t.state),console.log("destination",e);var a=t.state.rooms.map((function(t){return t.Name===o&&(t.LightOn="1"===n,console.log("Room",t)),t}));t.setState({rooms:a})},t.toggleLight=function(e){if(t.state.connected){var n=t.state.rooms.find((function(t){return t.Name===e})).LightOn;t.state.client.publish("".concat(t.state.subject).concat(e,"/Light"),n?"0":"1",0,!0)}},t.onMessageArrived=function(e){console.log("onMessageArrived: "+e.payloadString),t.changeLight(e.destinationName,e.payloadString)},t.startDisconnect=function(){t.state.client.disconnect()},t}return Object(i.a)(n,[{key:"render",value:function(){var t=this;return Object(O.jsxs)(d.a,{fluid:!0,className:"text-center",children:[Object(O.jsx)(u.a,{className:"py-4",children:Object(O.jsxs)(b.a,{children:[Object(O.jsx)("h1",{children:"PrivIoT"}),Object(O.jsx)("h2",{children:"Virtual Smart Home"})]})}),Object(O.jsx)(u.a,{className:"my-5",children:Object(O.jsxs)(b.a,{children:[Object(O.jsx)(j.a,{variant:this.state.connected?"success":"danger",disabled:this.state.connected,onClick:function(){return t.startConnect()},children:"Connect"}),Object(O.jsx)(j.a,{variant:"primary",disabled:!this.state.connected,onClick:function(){return t.startDisconnect()},children:"Disconnect"})]})}),this.state.rooms.map((function(e){return Object(O.jsxs)(u.a,{children:[Object(O.jsx)(b.a,{xs:"6",className:"text-right",children:e.label}),Object(O.jsx)(b.a,{xs:"2",children:Object(O.jsxs)("div",{className:"toggleWrapper",children:[Object(O.jsx)("input",{type:"checkbox",name:"toggle_".concat(e.Name),className:"mobileToggle",id:"toggle_".concat(e.Name),checked:t.state.rooms.find((function(t){return t.Name===e.Name})).LightOn,onChange:function(){return t.toggleLight(e.Name)}}),Object(O.jsx)("label",{htmlFor:"toggle_".concat(e.Name)})]})})]},e.Name)}))]})}}]),n}(o.Component),f=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,27)).then((function(e){var n=e.getCLS,o=e.getFID,a=e.getFCP,c=e.getLCP,s=e.getTTFB;n(t),o(t),a(t),c(t),s(t)}))};s.a.render(Object(O.jsx)(a.a.StrictMode,{children:Object(O.jsx)(L,{})}),document.getElementById("root")),f()}},[[21,1,2]]]);
//# sourceMappingURL=main.825eeae3.chunk.js.map