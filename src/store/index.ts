
import { createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer, { RootState } from '../reducers';

export type StoreType = Store<RootState>;

const configureStore = (initialState?: RootState): StoreType => {
    const enhancer = composeWithDevTools();
    const store = createStore(rootReducer, initialState, enhancer);
    return store;
};

const store = configureStore();

if ('hot' in module) {
    const hotModule: any = module as any;
    hotModule.hot!.accept('../reducers', () =>
        store.replaceReducer(require('../reducers'))
    );
}

export default store;
