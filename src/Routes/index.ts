import express from 'express';
import userRouter from './User.routes';
import offerRouter from './Offer.routes';
import competenceRouter from './Competence.routes';

const router = express.Router();

router.use('/users', userRouter);
router.use('/offers', offerRouter);
router.use('/competences', competenceRouter);

export default router;

export { userRouter, offerRouter, competenceRouter };