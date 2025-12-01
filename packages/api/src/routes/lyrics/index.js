/**
 * Lyrics Routes
 */

const express = require('express');
const router = express.Router();
const { body, query, param } = require('express-validator');
const { validate } = require('../../middleware/validation');

// Controllers (placeholder implementations)
const lyricsController = {
  search: async (req, res) => {
    const { q, lang, limit = 20, offset = 0 } = req.query;
    // TODO: Implement lyrics search
    res.json({
      results: [],
      total: 0,
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
  },

  getById: async (req, res) => {
    const { songId } = req.params;
    // TODO: Implement get lyrics by ID
    res.json({
      id: songId,
      lyrics: null,
      synced: null,
    });
  },

  getSynced: async (req, res) => {
    const { songId } = req.params;
    // TODO: Implement get synced lyrics
    res.json({
      id: songId,
      syncedLyrics: [],
    });
  },

  submitCorrection: async (req, res) => {
    const { songId } = req.params;
    const { correction } = req.body;
    // TODO: Implement correction submission
    res.json({
      success: true,
      message: 'Correction submitted for review',
    });
  },

  report: async (req, res) => {
    const { songId } = req.params;
    const { reason, details } = req.body;
    // TODO: Implement lyrics reporting
    res.json({
      success: true,
      message: 'Report submitted',
    });
  },
};

// Routes
router.get(
  '/search',
  [
    query('q').notEmpty().trim(),
    query('lang').optional().isLength({ min: 2, max: 5 }),
    query('limit').optional().isInt({ min: 1, max: 100 }),
    query('offset').optional().isInt({ min: 0 }),
  ],
  validate,
  lyricsController.search
);

router.get(
  '/:songId',
  [param('songId').notEmpty()],
  validate,
  lyricsController.getById
);

router.get(
  '/:songId/synced',
  [param('songId').notEmpty()],
  validate,
  lyricsController.getSynced
);

router.post(
  '/:songId/corrections',
  [
    param('songId').notEmpty(),
    body('correction').isObject(),
  ],
  validate,
  lyricsController.submitCorrection
);

router.post(
  '/:songId/report',
  [
    param('songId').notEmpty(),
    body('reason').notEmpty().trim(),
  ],
  validate,
  lyricsController.report
);

module.exports = router;










