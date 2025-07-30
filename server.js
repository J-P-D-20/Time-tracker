import {checkFile,readData,getDate,writeData} from './tracker.js';
import cors from 'cors';
import express, { json, response } from 'express';

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

await checkFile()

app.get('/data',async (req,res) =>{
    const data = await readData();
    console.log("sending data..",data);
    res.json(data);
})

app.get('/highest', async (req, res) =>{
    const data = await readData();

    let highest = data.reduce((acc,current) =>{
        if(acc.duration > current.duration){
            return acc
        }else{
            return current
        }
    })

    res.json(highest)

})



app.post('/data', async(req,res) => {
    console.log(req.body);
    const data =  await readData();
    data.push(req.body);
    writeData(data);
    return res.send(200)
})


app.listen(3000);