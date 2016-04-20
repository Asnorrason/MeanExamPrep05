# MeanExamPrep05


####Name attributes of http protocol makes it difficult to use for real time systems:

The http protocol works with request/response sets, as a request is sent to the server it will respond with data via a response. 
WHen the transaction is finished the connection is terminated and afterwards the client and the server dont know anything about each other 
in such. This makes difficult to have a realtimei system like a chat server as you would need the server and the client to ’communicate’. 
So in order to get a real time system to work with the http you can sue polling, long-polling or websockets.

####Explain polling and long-polling strategies, their pros and cons:

#####Polling

The basic idea with polling, is that the application repeatedly polls a server for data. The client makes a request and wait for the server to respond with data. If nothing is available, an empty response is returned. 

######Pro
- In smaller systems it will not put a heavy load on the server

######Cons
-	In large systems, the poll calls will scale up, and use large amount of resources.
-	Wont be notified when the server event happens, there is a delay.


#####Long-polling

Long-polling works like poilling, instead of repeatedly polling a server for data, it makes a “Hanging GET” till it gets a response. 

######Pro
-	You will be notified when the server event happens with no delay

######Cons
-	If the connection is set to close after certain amount of time, it can close when it tries to get the received data
-	More intensive on the server


 
####What is HTTP streaming, SSE (Server sent events):

SSE is designed to be efficient. The data are streamed from the server to the client when it update, this can be done because SSE open a single unidirectional channel between the server and the client.

####What is WebSocket protocol, how is it different from HTTP communication, what advantages it has over HTTP:

The websocket protocol provides a full-duplex (bidirectional) communication channels over a single TCP connection. Normal HTTP communication works with request/response format and then ends it with a closed connection. It then has to open a new connection to get the next request/response, and therefore its heavy on the server.

####Explain what the WebSocket Protocol brings to the Web-world:

Instead of unidirectional connections like SSE, websockets creates bidirectional connections, which is good for game/messaging apps, and other apps where you need close to real time updates.

####Explain and demonstrate the process of WebSocket communication - From connecting client to server, through sending messages, to closing connection:

#####Example of normal websocket usage:
```
// Create a socket instance var socket = new WebSocket('ws://localhost:8080');
// Open the socket socket.onopen = function(event) {
 	 	// Send an initial message 	
		socket.send('I am the client and I\'m listening!');
 	 	// Listen for messages 	socket.onmessage = function(event) {
 		console.log('Client received a message',event);
	 	}; 	 	
// Listen for socket closes 	socket.onclose = function(event) { 
		console.log('Client notified socket has closed',event);
 	}; 	 	// To close the socket.... 	
//socket.close() 	 };
```
 
####What's the advantage of using libraries like Socket.IO, Sock.JS, WS, over pure WebSocket libraries in the backend and standard APIs on frontend? Which problems do they solve:

Socket.io decide if the system use WebSocket, Ajax long polling, Flash, etc.
This is an advantage because several webbrowsers doesn’t use WebSockets.

#####Example of socket.io usage:
```
// Create SocketIO instance,
connect var socket = new io.Socket('localhost',{ 	
port: 8080 }); socket.connect();
// Add a connect listener 
socket.on('connect',function() {
	console.log('Client has connected to the server!'); }); 
	// Add a connect listener 
	socket.on('message',function(data) { 	
		console.log('Received a message from the server!',data); }); 
		// Add a disconnect listener 
		socket.on('disconnect',function() { 
		console.log('The client has disconnected!'); });
		// Sends a message to the server via sockets function sendMessageToServer(message) {
		socket.send(message); }
```

####What is Backend as a Service, Database as a Service, why would you consider using Firebase in your projects?:

Backend as a service (BaaS) is a model for providing web and mobile app developers with a way to link their applications to backend cloud storage. 
Database as a Service (DBaaS) is a cloud based approach to the storage and management of structured data. The database is similar to databases such as SQL server, MySQL and Oracle. But because its cloud bases, you have some flexibility because you can scale the database on-demand. If you use DBaaS it has some disadvantages, such as unacceptable latency and application failures. Some of the databases doesn’t support table partitions.

Firebase has both BaaS and DBaas, which makes it easy to integrate into your apps frontend.

The application is easy to setup, and has OAuth authentication and communicates over SSL, which makes it ‘secure’.

####Explain the pros & cons of using a Backend as a Service Provider like Firebase:

######Pros:
-	Free to start with (until you have over 50 connections)
-	Great scalability
-	Fast way to develop

######Cons:
-	If firebase is down, your app will be down aswell
-	Wont have sensitive data on a public database
-	Database structure can be difficult to understand

 
####Explain and demonstrate “three-way data binding” using Firebase and Angular:

Three way data binding application is where all three levels (view, model, firebase) are synchronized. Which means, if you change something in either of the levels, if will change in the others too.

####Example see threeWayDataBinding project

####Explain and demonstrate the difference between the simple chat system in your own WebSocket + Node.js backend vs. Firebase:

Chat service websocket + node.js : [ChatRoulette](https://github.com/Asnorrason/MeanExamPrep05/tree/master/ChatRoulette)
Chat service firebase: [threeWayDataBinding](https://github.com/Asnorrason/MeanExamPrep05/tree/master/threeWayDataBinding)

In my own project with Websocket and Node.js, i got the backend with a express setup, and then using socket.io for the communication. Instead of using firebase you can store the data on MongoDB.

On the firebase chat service, you got everything except the frontend on firebase.
