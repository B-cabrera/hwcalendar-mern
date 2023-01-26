import express, { Router, Request, Response } from 'express';

const router = Router();


router.get('/', (req: Request, res: Response) => {
    res.send('YOU SET ME UP.')
});


export default router;


