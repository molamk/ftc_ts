import { Request, Response } from 'express';

export const get = (_: Request, res: Response) => res.sendStatus(200);
