import logo from './logo.svg';
import './App.css';
import FriendGraph from './FriendGraph';

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Get a list of cities from your database


function App() {

  // TODO: Replace the following with your app's Firebase project configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDHa0NEP7JUlCjq_1ENNGmB1typTxikXZQ",
    authDomain: "degrees-75d2f.firebaseapp.com",
    projectId: "degrees-75d2f",
    storageBucket: "degrees-75d2f.appspot.com",
    messagingSenderId: "336669785109",
    appId: "1:336669785109:web:13f2faa3bf4f65449e621c",
    measurementId: "G-FP6QEGW5X1"
  };

  const app = initializeApp(firebaseConfig);
  console.log(app);
  console.log(app);

  const db = getFirestore(app);



  return (
    <div>
      <FriendGraph db = {db}/>
    </div>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
