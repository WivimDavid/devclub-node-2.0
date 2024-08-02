import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors())

// Rota GET
app.get('/usuarios', async (req, res) => {

  const allUsers = await prisma.user.findMany();

  res.status(200).json(allUsers);
});


// Rota POST
app.post('/usuarios/', async (req, res) => {
  const { name, email, age } = req.body;
  const user = await prisma.user.create({
    data: {
      name,
      email,
      age
    },
  });

  res.status(201).json(user);
});

// Rota PUT
app.put('/usuarios/:id', async (req, res) => {

  const user = await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age
    },
  });

  res.status(200).json(user);
});

// Rota DELETE
app.delete('/usuarios/:id', async (req, res) => {

  await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json({ message: 'User deleted' });
});

// Listagem da porta
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});