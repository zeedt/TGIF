import {createStore} from 'redux';
import app from './Reducers';
export default function configureStore(){
    let store = createStore(app);
    return store;
}