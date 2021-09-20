//https://www.eclipse.org/paho/clients/js/

//FUNCION DEL BOTON ENCENDER
function LED1_On() {
	//alert("led on");
	//document.getElementById("sensor").innerHTML="LED ENCENDIDO";
	
	message = new Paho.MQTT.Message("ENCENDIDO");
	message.destinationName = "dyautibug.fie@unach.edu.ec/test1";
	client.send(message); 
	console.log("led on");
}

//FUNCION DEL BOTON APAGAR
function LED1_Off(){	
	//alert("led off");
	//document.getElementById("sensor").innerHTML="LED APAGADO";
	
	message = new Paho.MQTT.Message("APAGADO");
	message.destinationName = "dyautibug.fie@unach.edu.ec/test1";
	client.send(message); 
	console.log("led off");

}

   // Create a client instance
  //client = new Paho.MQTT.Client("postman.cloudmqtt.com", 14970);
  
  client = new Paho.MQTT.Client("maqiatto.com", 8883, "web_" + parseInt(Math.random() * 100, 10));

  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  var options = {
   useSSL: false,
    userName: "dyautibug.fie@unach.edu.ec",
    password: "daniels",
    onSuccess:onConnect,
    onFailure:doFail
  }

  // connect the client
  client.connect(options);
   
  // called when the client connects
  function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("Conectado...");
	
    client.subscribe("dyautibug.fie@unach.edu.ec/test");
    message = new Paho.MQTT.Message("hola desde la web");
    message.destinationName = "dyautibug.fie@unach.edu.ec/test1";
    client.send(message);
	
  }

  function doFail(e){
    console.log(e);
	
  }

  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  }

  // called when a message arrives
  function onMessageArrived(message) {
    //console.log("onMessageArrived:"+message.payloadString);
	  sms=(message.payloadString);
	  if(sms=="MUY ALTO"){
	  	document.getElementById("sensor").innerHTML=sms;
	  }
	  if(sms=="MUY BAJO"){
	  	document.getElementById("sensor").innerHTML=sms;
	  }
	  //document.getElementById("sensor").innerHTML=message.payloadString;
  }
  
