const express = require('express');
const router = express.Router();
const upload = require('../utils/upload');

const majorController = require('../controllers/majorController');
const applicationController = require('../controllers/applicationController');
const chatController = require('../controllers/chatController');
const historicalScoreController = require('../controllers/historicalScoreController');
const postController = require('../controllers/postController');
const categoryController = require('../controllers/categoryController');
const facultyController = require('../controllers/facultyController');
const settingsController = require('../controllers/settingsController');

router.get('/majors', majorController.getAllMajors);
router.get('/majors/:id', majorController.getMajorById);
router.get('/majors/:id/images', require('../controllers/majorImageController').getMajorImages);

router.get('/faculties', facultyController.getAllFaculties);
router.get('/faculties/slug/:slug', facultyController.getFacultyBySlug);
router.get('/faculties/:id', facultyController.getFacultyById);

router.post('/applications', upload.array('documents', 5), applicationController.submitApplication);
router.post('/applications/:id/upload-document', upload.single('document'), applicationController.uploadDocument);

router.post('/chat', chatController.sendMessage);
router.get('/chat/history/:sessionId', chatController.getChatHistory);

router.post('/predict-admission', historicalScoreController.predictAdmission);

router.get('/posts', postController.getPublishedPosts);
router.get('/posts/slug/:slug', postController.getPostBySlug);
router.get('/posts/:id', postController.getPostById);

router.get('/categories', categoryController.getAllCategories);

router.get('/config', settingsController.getPublicConfig);

module.exports = router;
