import express from 'express';

import {getTakes, createTake, getTake} from './database.js';

const app = express();  

app.use(express.json());

app.get('/notes', async (req, res) => {
   const kpps = await getTakes();
   res.send(kpps);
});

app.get('/notes/:id', async (req, res) => {
    const id = req.params.id;  
    const kpp = await getTake(id);
    res.send(kpp);
 });
 
app.post('/notes', async (req, res) => {
    const {Addmission_num, name, DOB, Address, age} = req.body;
    const id = await createTake(Addmission_num, name, DOB, Address, age);
    res.status(201).send({id});
});

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});

app.listen(3000, () => {
    console.log('Server is running on 3000');
});