import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './components/App';
import rootReducer from './reducers';

//fuction logger(obj, next, action)
//redux will call logger(obj)(next)(action)
// const logger = ({ dispatch, getState }) => {
//   return function(next){
//     return function(action){
//       //middleware code
//       console.log('ACTION_TYPE = ', action.type);
//       next(action);
//     }
//   }
// }

const logger = ({ dispatch, getState }) => (next) => (action) => {
  if(typeof action !== 'function'){
    console.log('ACTION_TYPE = ', action.type);
  }
  next(action);
}

// const thunk = ({ dispatch, getState }) => (next) => (action) => {
//   // console.log('ACTION_TYPE = ', action.type);
//   if(typeof action === 'function'){
//     action(dispatch);
//     return;
//   }
//   next(action);
// }

const store = createStore(rootReducer, applyMiddleware(logger, thunk));
console.log("store", store);

// export const StoreContext = createContext();

// class Provider extends React.Component {
//   render(){
//     const { store } = this.props;
//     return(
//       <StoreContext.Provider value = {store}>
//         {this.props.children}
//       </StoreContext.Provider>
//     )
//   }
// }

// export function connect(callback){
//   return function(Component){
//     class ConnectedComponent extends React.Component{
//       constructor(props){
//         super(props);
//         this.unsubscribe = this.props.store.subscribe(() => this.forceUpdate());
//       }

//       componentWillUnmount(){
//         this.unsubscribe();
//       }
//       render(){
//         const { store } = this.props;
//         const state = store.getState();
//         const dataToBePassedAsProps = callback(state);

//         return(
//           <Component {...dataToBePassedAsProps} dispatch={store.dispatch} />
//         );
//       }
//     }

//     class ConnectedComponentWrapper extends React.Component{
//       render() {
//         return(
//           <StoreContext.Consumer>
//             {(store) => <ConnectedComponent store={store} />}
//           </StoreContext.Consumer>
//         );
//       }
//     }
//     return ConnectedComponentWrapper;
//   }
// }


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
