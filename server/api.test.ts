import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,readFile,rm} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {createApp} from './app';
test('API validates and persists real requests and inquiries',async()=>{
 const dir=await mkdtemp(path.join(os.tmpdir(),'remex-'));
 const server=createApp(dir).listen(0,'127.0.0.1');
 await new Promise<void>(resolve=>server.on('listening',resolve));
 const url=`http://127.0.0.1:${(server.address() as {port:number}).port}/api/requests`;
 const body={mode:'request',name:'テスト',email:'test@example.com',place:'東京駅',preferred:'平日午後',activities:'道順確認',checkpoints:'',formats:['写真'],wishes:'',consent:true,website:''};
 const post=(input:unknown)=>fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(input)});
 try{
  assert.equal((await post({...body,consent:false})).status,400);
  assert.equal((await post({...body,email:'bad'})).status,400);
  assert.equal((await post({...body,place:''})).status,400);
  assert.equal((await post({...body,website:'bot'})).status,400);
  const response=await post(body);assert.equal(response.status,201);
  const result=await response.json() as {id:string};assert.ok(result.id);
  assert.equal((await post({...body,mode:'inquiry',place:'',preferred:'',activities:'',wishes:'法人相談'})).status,201);
  const records=JSON.parse(await readFile(path.join(dir,'requests.json'),'utf8'));
  assert.equal(records.length,2);assert.equal(records[0].id,result.id);assert.equal(records[1].mode,'inquiry');
  await post(body);await post(body);assert.equal((await post(body)).status,429);
 }finally{await new Promise<void>((resolve,reject)=>server.close(error=>error?reject(error):resolve()));await rm(dir,{recursive:true,force:true});}
});
