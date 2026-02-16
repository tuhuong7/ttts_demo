const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/roleMiddleware');

const applicationController = require('../controllers/applicationController');
const majorController = require('../controllers/majorController');
const facultyController = require('../controllers/facultyController');
const subjectGroupController = require('../controllers/subjectGroupController');
const admissionMethodController = require('../controllers/admissionMethodController');
const historicalScoreController = require('../controllers/historicalScoreController');
const userController = require('../controllers/userController');
const roleController = require('../controllers/roleController');
const postController = require('../controllers/postController');
const categoryController = require('../controllers/categoryController');
const chatController = require('../controllers/chatController');
const candidateController = require('../controllers/candidateController');
const statisticsController = require('../controllers/statisticsController');
const settingsController = require('../controllers/settingsController');
const applicationDocumentController = require('../controllers/applicationDocumentController');
const majorSubjectMappingController = require('../controllers/majorSubjectMappingController');
const ragController = require('../controllers/ragController');

router.use(authMiddleware);

router.get('/applications', applicationController.getAllApplications);
router.get('/applications/:id', applicationController.getApplicationById);
router.patch('/applications/:id/status', checkRole(['Admin', 'Staff']), applicationController.updateApplicationStatus);
router.post('/applications/:id/approve', checkRole(['Admin', 'Staff']), applicationController.approveApplication);
router.post('/applications/:id/reject', checkRole(['Admin', 'Staff']), applicationController.rejectApplication);
router.post('/applications/:id/request-supplement', checkRole(['Admin', 'Staff']), applicationController.requestSupplement);
router.get('/applications/export/excel', checkRole(['Admin']), applicationController.exportToExcel);
router.delete('/applications/:id', checkRole(['Admin']), applicationController.deleteApplication);

router.get('/majors', majorController.getAllMajors);
router.get('/majors/:id', majorController.getMajorById);
router.post('/majors', majorController.createMajor);
router.put('/majors/:id', majorController.updateMajor);
router.delete('/majors/:id', checkRole(['Admin']), majorController.deleteMajor);
router.get('/majors/:id/statistics', majorController.getMajorStatistics);

const majorImageController = require('../controllers/majorImageController');
const majorUpload = require('../utils/majorUpload');
router.post('/majors/:id/images', majorUpload.array('images', 20), majorImageController.uploadMajorImages);
router.delete('/images/:imageId', majorImageController.deleteMajorImage);
router.patch('/images/:imageId/order', majorImageController.updateImageOrder);

router.get('/faculties', facultyController.getAllFaculties);
router.get('/faculties/:id', facultyController.getFacultyById);
router.post('/faculties', facultyController.createFaculty);
router.put('/faculties/:id', facultyController.updateFaculty);
router.delete('/faculties/:id', checkRole(['Admin']), facultyController.deleteFaculty);
router.post('/faculties/fix-slugs', checkRole(['Admin']), facultyController.fixSlugs);

router.get('/subject-groups', subjectGroupController.getAllSubjectGroups);
router.get('/subject-groups/:id', subjectGroupController.getSubjectGroupById);
router.post('/subject-groups', subjectGroupController.createSubjectGroup);
router.put('/subject-groups/:id', subjectGroupController.updateSubjectGroup);
router.delete('/subject-groups/:id', subjectGroupController.deleteSubjectGroup);

router.get('/admission-methods', admissionMethodController.getAllAdmissionMethods);
router.get('/admission-methods/:id', admissionMethodController.getAdmissionMethodById);
router.post('/admission-methods', admissionMethodController.createAdmissionMethod);
router.put('/admission-methods/:id', admissionMethodController.updateAdmissionMethod);
router.delete('/admission-methods/:id', admissionMethodController.deleteAdmissionMethod);

router.get('/historical-scores', historicalScoreController.getAllHistoricalScores);
router.get('/historical-scores/:id', historicalScoreController.getHistoricalScoreById);
router.post('/historical-scores', historicalScoreController.createHistoricalScore);
router.put('/historical-scores/:id', historicalScoreController.updateHistoricalScore);
router.delete('/historical-scores/:id', historicalScoreController.deleteHistoricalScore);
router.get('/historical-scores/calculate-threshold/:major_id', historicalScoreController.calculateThreshold);

router.get('/users', checkRole(['Admin']), userController.getAllUsers);
router.get('/users/me', userController.getCurrentUser);
router.get('/users/:id', userController.getUserById);
router.post('/users', checkRole(['Admin']), userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', checkRole(['Admin']), userController.deleteUser);
router.patch('/users/:id/change-password', userController.changePassword);
router.patch('/users/:id/lock', checkRole(['Admin']), userController.lockUser);
router.patch('/users/:id/unlock', checkRole(['Admin']), userController.unlockUser);
router.patch('/users/:id/assign-role', checkRole(['Admin']), userController.assignRole);

router.get('/roles', roleController.getAllRoles);
router.get('/roles/:id', roleController.getRoleById);
router.post('/roles', roleController.createRole);
router.put('/roles/:id', roleController.updateRole);
router.delete('/roles/:id', roleController.deleteRole);

router.get('/posts', postController.getAllPosts);
router.get('/posts/:id', postController.getPostById);
router.post('/posts', postController.createPost);
router.put('/posts/:id', postController.updatePost);
router.delete('/posts/:id', postController.deletePost);
router.patch('/posts/:id/publish', postController.publishPost);
router.patch('/posts/:id/unpublish', postController.unpublishPost);

router.get('/categories', categoryController.getAllCategories);
router.get('/categories/:id', categoryController.getCategoryById);
router.post('/categories', categoryController.createCategory);
router.put('/categories/:id', categoryController.updateCategory);
router.delete('/categories/:id', categoryController.deleteCategory);

router.get('/chat-sessions', chatController.getAllChatSessions);
router.get('/chat-sessions/:id', chatController.getChatSessionById);
router.delete('/chat-sessions/:id', chatController.deleteChatSession);
router.delete('/chat-sessions/cleanup/old', chatController.cleanupOldSessions);
router.get('/chat/statistics', chatController.getChatStatistics);

router.get('/candidates', candidateController.getAllCandidates);
router.get('/candidates/:id', candidateController.getCandidateById);
router.post('/candidates', candidateController.createCandidate);
router.put('/candidates/:id', candidateController.updateCandidate);
router.delete('/candidates/:id', candidateController.deleteCandidate);


router.get('/application-documents', applicationDocumentController.getAllDocuments);
router.get('/application-documents/:id', applicationDocumentController.getDocumentById);
router.get('/applications/:application_id/documents', applicationDocumentController.getDocumentsByApplication);
router.post('/application-documents', applicationDocumentController.createDocument);
router.put('/application-documents/:id', applicationDocumentController.updateDocument);
router.delete('/application-documents/:id', applicationDocumentController.deleteDocument);
router.get('/application-documents/:id/download', applicationDocumentController.downloadDocument);
router.get('/application-documents/statistics/by-type', applicationDocumentController.getDocumentStatistics);
router.post('/application-documents/bulk-create', applicationDocumentController.bulkCreateDocuments);

router.get('/major-subject-mappings', majorSubjectMappingController.getAllMappings);
router.get('/major-subject-mappings/:major_id/:subject_group_id', majorSubjectMappingController.getMappingById);
router.get('/majors/:major_id/subject-groups', majorSubjectMappingController.getSubjectGroupsByMajor);
router.get('/subject-groups/:subject_group_id/majors', majorSubjectMappingController.getMajorsBySubjectGroup);
router.post('/major-subject-mappings', majorSubjectMappingController.createMapping);
router.delete('/major-subject-mappings/:major_id/:subject_group_id', majorSubjectMappingController.deleteMapping);
router.post('/major-subject-mappings/bulk-create', majorSubjectMappingController.bulkCreateMappings);
router.delete('/majors/:major_id/subject-groups', majorSubjectMappingController.deleteAllMappingsByMajor);
router.put('/majors/:major_id/subject-groups', majorSubjectMappingController.replaceMajorSubjectGroups);
router.get('/major-subject-mappings/statistics', majorSubjectMappingController.getMappingStatistics);

const specializationController = require('../controllers/specializationController');
router.get('/specializations', specializationController.getAllSpecializations);
router.get('/specializations/:id', specializationController.getSpecializationById);
router.post('/specializations', specializationController.createSpecialization);
router.put('/specializations/:id', specializationController.updateSpecialization);
router.delete('/specializations/:id', specializationController.deleteSpecialization);

const newsController = require('../controllers/newsController');
const upload = require('../utils/generalUpload');
router.get('/news', newsController.getAllNews);
router.get('/news/:id', newsController.getNewsById);
router.post('/news', upload.single('featured_image'), newsController.createNews);
router.put('/news/:id', upload.single('featured_image'), newsController.updateNews);
router.delete('/news/:id', newsController.deleteNews);

const eventController = require('../controllers/eventController');
router.get('/events', eventController.getAllEvents);
router.get('/events/:id', eventController.getEventById);
router.post('/events', upload.single('image'), eventController.createEvent);
router.put('/events/:id', upload.single('image'), eventController.updateEvent);
router.delete('/events/:id', eventController.deleteEvent);

const bannerController = require('../controllers/bannerController');
router.get('/banners', bannerController.getAllBanners);
router.get('/banners/:id', bannerController.getBannerById);
router.post('/banners', upload.single('image_url'), bannerController.createBanner);
router.put('/banners/:id', upload.single('image_url'), bannerController.updateBanner);
router.delete('/banners/:id', bannerController.deleteBanner);
router.patch('/banners/:id/order', bannerController.updateBannerOrder);

router.get('/settings', checkRole(['Admin']), settingsController.getAllSettings);
router.get('/settings/:key', checkRole(['Admin']), settingsController.getSetting);
router.put('/settings', checkRole(['Admin']), settingsController.updateSettings);
router.put('/settings/:key', checkRole(['Admin']), settingsController.updateSetting);
router.post('/settings', checkRole(['Admin']), settingsController.createSetting);
router.delete('/settings/:key', checkRole(['Admin']), settingsController.deleteSetting);

router.get('/stats/dashboard', statisticsController.getDashboardStats);
router.get('/stats/applications', statisticsController.getApplicationStats);
router.get('/stats/majors', statisticsController.getMajorStats);

router.post('/chat-data/ingest', checkRole(['Admin']), ragController.ingestData);

router.get('/chat-data', checkRole(['Admin']), ragController.getAllKnowledge);
router.put('/chat-data/:id', checkRole(['Admin']), ragController.updateKnowledge);
router.delete('/chat-data/:id', checkRole(['Admin']), ragController.deleteKnowledge);

module.exports = router;
