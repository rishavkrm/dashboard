const express = require('express');
const router = express.Router();

const Line = require('./../models/lineModel');
const Bar = require('./../models/barModel')
const Pie = require('./../models/pieModel')


router.route('/pie')
.get(async (req, res) => {
    try {
      const data = await Pie.find();
        res.status(200).json({
          status: 'success',
          data: {
            data
          }
        });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  router.route('/bar')
  .get(async (req, res) => {
    try {
      const data = await Bar.find();

      res.status(200).json({
        status: 'success',
        data: {
          data
        }
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  router.route('/line')
  .get(async (req, res) => {
    try {
      const data = await Line.find();

      res.status(200).json({
        status: 'success',
        data: {
          data
        }
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  module.exports = router;