import express from 'express';
import multer from 'multer';
import { analyzeChart } from '../controllers/analyze.controller.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/analyze', upload.single('file'), analyzeChart);

export default router;