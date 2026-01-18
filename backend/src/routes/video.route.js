import { Router } from 'express';
const router = Router();

function data(req, res) {
  return res.send({
    name: 'saqib',
  });
}

router.route('/aysi').get(data);

export default router