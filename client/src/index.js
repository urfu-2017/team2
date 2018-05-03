import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import RootStore from './stores/RootStore';
import { WorkerWrapper } from './websocket/worker-wrapper';
import { Provider } from 'mobx-react';

const worker = new WorkerWrapper();

const rootStore = new RootStore(worker);

ReactDOM.render(
    <Provider rootStore={rootStore}>
        <App worker={worker}/>
    </Provider>,
    document.getElementById('root')
);
