import express from 'express';
const app = express();

app.get('/', (req, res)=>{
    console.log('home');
    res.send('Heollllo');
});

app.listen(3000);
