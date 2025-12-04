import express from 'express';
import userRouter from './User.routes';
import offerRouter from './Offer.routes';
import competenceRouter from './Competence.routes';
import experienceRouter from './Experience.routes';
import aiRouter from './AI.routes';

const router = express.Router();

router.use('/users', userRouter);
router.use('/offers', offerRouter);
router.use('/competences', competenceRouter);
router.use('/experiences', experienceRouter);
router.use('/ai', aiRouter);

export default router;

export { userRouter, offerRouter, competenceRouter, experienceRouter, aiRouter };