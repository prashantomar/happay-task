import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';


const container = document.getElementById('root');
const root = createRoot(container);

// DUE TO CORS ERROR using static json
// async function fetchData() {
//   const response = await fetch('https://react-coding-assignment.s3.ap-south-1.amazonaws.com/cards/items.json', {
//     method: 'GET', // *GET, POST, PUT, DELETE, etc.
//     mode: 'cors', // no-cors, *cors, same-origin
//     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: 'same-origin', // include, *same-origin, omit
//     headers: {
//       'Content-Type': 'application/json'
//     },
//   });
//   console.log(response)
//   const res = await response.json()
//   console.log(res)
//   return res;
// }
// fetchData().then(products => {
//    store.dispatch(loadList(products))
// });






root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
