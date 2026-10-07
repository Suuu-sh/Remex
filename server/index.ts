import {createApp} from './app';
const port=Number(process.env.PORT||3001);
createApp().listen(port,'127.0.0.1',()=>console.log(`Remex API: http://127.0.0.1:${port}`));
