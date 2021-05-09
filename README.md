# Web socket, SSE, and Long Polling Demo

The application for this demo is a simple notification system using React and a Node.js/Express server. Use the unique client id to use in the request.

## Start the App
```
npm install
npm run server
npm run client
```
By default the server runs on port 8080 and the client runs on port 3000.

## Long Polling
POST /create-notification
```
{
   "type": "long-polling",
   "forClientId": "S739zi9178cxWKDFqz1ji",
   "message" : "This is the long polling example."  
}
```
## SSE
POST /create-notification
```
{
   "type": "sse",
   "forClientId": "S739zi9178cxWKDFqz1ji",
   "message" : "This is the sse example."  
}
```