import express from 'express';

const router = express.Router();

router.get('/hello', (req, res) => {
  res.json({ message: 'Hello World' });
});

export default router;  

// postgresql://neondb_owner:npg_zhAOJ3j8ryQN@ep-noisy-cell-aquehy2e.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require
// postgresql://neondb_owner:npg_zhAOJ3j8ryQN@ep-noisy-cell-aquehy2e.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require