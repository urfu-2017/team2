import io from 'socket.io-client';
import * as Types from '../enum/WSActionType';
import ss from 'socket.io-stream';

const METHODS =
    ['GetMessages', 'GetProfile', 'SearchByLogin', 'AddContact', 'GetChatList',
        'SendMessage', 'DeleteProfile', 'UploadImage'];

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

    if (action === 'UploadImage') {
        const stream = ss.createStream();
        ss(socket).emit('UploadImage', stream);
        ss.createBlobReadStream(e.data.value).pipe(stream);

        return;
    }

    socket.emit(action, e.data.value);
};
