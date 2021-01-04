import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  React.useEffect(() => {

    const QUOTE_STREAM_URL = "wss://**************:9925";
    const END_POINT = "/CreateSession.txt?User=LOGIN&Password=PASS&HttpClientType=WebSocket";

    let liveSessionId = null;


    //initialize connection
    const ws = new WebSocket(QUOTE_STREAM_URL + END_POINT)
    ws.onopen = () => {
      //send any msg from Client if needed
      ws.send('Hello Server!')
    };
    //save whatever response from client
    ws.onmessage = evt => {
      const jObj = JSON.parse(evt.data);

      if (jObj.Cmd !== undefined && 'CreateSession.txt' === jObj.Cmd && jObj.SessionId !== undefined && jObj.SessionId !== '') {
        console.log(jObj, 'jObjjj')
        liveSessionId = jObj.SessionId.toString();
      } else if(true){
        console.log(jObj)
      }
    }

    console.log('wss func');
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
