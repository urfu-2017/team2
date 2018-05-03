import io from 'socket.io-client';
import * as Types from '../enum/WSActionType';

const METHODS =
    ['GetMessages', 'GetProfile', 'SearchByLogin', 'AddContact', 'GetChatList',
        'SendMessage', 'DeleteProfile'];

let TOKEN;
let socket;

function init() {
    socket = io(process.env.HOST, {
        transports: ['websocket'],
        query: { token: TOKEN }
    });

    socket.on('NewMessage', message => {
        postMessage({ action: 'NewMessage', result: message, type: Types.EMIT });
    });
    socket.on('NewChat', chat => {
        postMessage({ action: 'NewChat', result: chat, type: Types.EMIT });
    });

    for (const method of METHODS) {
        socket.on(`${method}Result`, result => {
            postMessage({ action: method, result, type: Types.RESPONSE });
        });
    }
}

onmessage = e => {
    const action = e.data.action;
    if (action === 'auth' && !TOKEN) {
        TOKEN = e.data.token;
        init();

        return;
    }

    socket.emit(action, e.data.value);
};
