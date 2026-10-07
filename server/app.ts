import express from 'express';
import {mkdir,readFile,writeFile,rename} from 'node:fs/promises';
import path from 'node:path';
import {randomUUID} from 'node:crypto';
import {requestSchema} from '../shared/request-schema';
export {requestSchema} from '../shared/request-schema';
export function createApp(dataDir = path.resolve('data')){
 const app=express();
 app.disable('x-powered-by');
 app.use((_req,res,next)=>{res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Cache-Control','no-store');next();});
 app.use(express.json({limit:'20kb'}));
 const attempts=new Map<string,{count:number,until:number}>();
 let queue:Promise<unknown>=Promise.resolve();
 app.get('/api/health',(_req,res)=>res.json({ok:true}));
 app.post('/api/requests',async(req,res)=>{
  const key=req.ip||'unknown', now=Date.now();
  for(const [ip,entry] of attempts) if(entry.until<now) attempts.delete(ip);
  const entry=attempts.get(key)||{count:0,until:now+15*60*1000};
  entry.count++; attempts.set(key,entry);
  if(entry.count>8){res.status(429).json({message:'送信回数が多いため、15分ほど待ってからお試しください。'});return;}
  const result=requestSchema.safeParse(req.body);
  if(!result.success){res.status(400).json({message:'入力内容をご確認ください。',fields:result.error.flatten().fieldErrors});return;}
  if(result.data.website){res.status(400).json({message:'送信できませんでした。'});return;}
  const {website,...input}=result.data;
  const record={id:randomUUID(),createdAt:new Date().toISOString(),...input};
  const task=queue.catch(()=>{}).then(async()=>{
   await mkdir(dataDir,{recursive:true,mode:0o700});
   const file=path.join(dataDir,'requests.json');
   let records:unknown[]=[];
   try {records=JSON.parse(await readFile(file,'utf8'));if(!Array.isArray(records))throw new Error('Invalid data');}
   catch(error){if((error as NodeJS.ErrnoException).code!=='ENOENT')throw error;}
   records.push(record);
   const temporary=path.join(dataDir,`requests-${record.id}.tmp`);
   await writeFile(temporary,JSON.stringify(records,null,2),{mode:0o600});
   await rename(temporary,file);
  });
  queue=task;
  try{await task;res.status(201).json({id:record.id,message:'受け付けました。'});}
  catch{res.status(500).json({message:'保存できませんでした。時間をおいて再度お試しください。'});}
 });
 app.use(express.static(path.resolve('dist'),{index:'index.html'}));
 app.use((error:unknown,_req:express.Request,res:express.Response,_next:express.NextFunction)=>{
  res.status((error as {status?:number}).status===413?413:400).json({message:'送信データを確認してください。'});
 });
 return app;
}
