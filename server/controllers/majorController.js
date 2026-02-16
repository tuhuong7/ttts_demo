const { Major, Faculty, Specialization, SubjectGroup, HistoricalScore, AdmissionMethod, MajorSubjectMapping } = require('../models/index');
const { Op } = require('sequelize');

const getAllMajors = async (req, res) => {
    try {
        const { page = 1, limit = 10, search, faculty_id, min_tuition, max_tuition } = req.query;
        const offset = (page - 1) * limit;
        
        let where = {};
        
        if (search) {
            where[Op.or] = [
                { name: { [Op.like]: `%${search}%` } },
                { code: { [Op.like]: `%${search}%` } }
            ];
        }
        
        if (faculty_id) where.faculty_id = faculty_id;
        
        if (min_tuition || max_tuition) {
            where.tuition = {};
            if (min_tuition) where.tuition[Op.gte] = min_tuition;
            if (max_tuition) where.tuition[Op.lte] = max_tuition;
        }

        const { count, rows } = await Major.findAndCountAll({
            where,
            include: [
                { model: Faculty },
                { model: Specialization },
                { model: SubjectGroup },
                { model: HistoricalScore, include: [AdmissionMethod] }
            ],
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['createdAt', 'DESC']]
        });

        res.json({
            total: count,
            page: parseInt(page),
            totalPages: Math.ceil(count / limit),
            data: rows
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMajorById = async (req, res) => {
    try {
        const major = await Major.findByPk(req.params.id, {
            include: [
                { model: Faculty },
                { model: Specialization },
                { model: SubjectGroup },
                { model: HistoricalScore, include: [AdmissionMethod], order: [['year', 'DESC']] }
            ]
        });
        
        if (!major) return res.status(404).json({ message: 'Major not found' });
        
        res.json(major);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createMajor = async (req, res) => {
    try {
        const { code, name, faculty_id, tuition, quota, description, subject_group_ids } = req.body;
        
        if (!code || !name || !faculty_id) {
            return res.status(400).json({ message: 'Code, name, and faculty_id are required' });
        }

        const existing = await Major.findOne({ where: { code } });
        if (existing) {
            return res.status(400).json({ message: 'Major code already exists' });
        }

        const major = await Major.create({
            code,
            name,
            faculty_id,
            tuition,
            quota,
            description
        });

        if (subject_group_ids && Array.isArray(subject_group_ids)) {
            const mappings = subject_group_ids.map(sg_id => ({
                major_id: major.id,
                subject_group_id: sg_id
            }));
            await MajorSubjectMapping.bulkCreate(mappings);
        }

        res.status(201).json(major);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateMajor = async (req, res) => {
    try {
        const major = await Major.findByPk(req.params.id);
        if (!major) return res.status(404).json({ message: 'Major not found' });

        const { code, name, faculty_id, tuition, quota, description, subject_group_ids } = req.body;

        if (code && code !== major.code) {
            const existing = await Major.findOne({ where: { code } });
            if (existing) {
                return res.status(400).json({ message: 'Major code already exists' });
            }
        }

        await major.update({
            code: code || major.code,
            name: name || major.name,
            faculty_id: faculty_id || major.faculty_id,
            tuition: tuition !== undefined ? tuition : major.tuition,
            quota: quota !== undefined ? quota : major.quota,
            description: description || major.description
        });

        if (subject_group_ids && Array.isArray(subject_group_ids)) {
            await MajorSubjectMapping.destroy({ where: { major_id: major.id } });
            const mappings = subject_group_ids.map(sg_id => ({
                major_id: major.id,
                subject_group_id: sg_id
            }));
            await MajorSubjectMapping.bulkCreate(mappings);
        }

        res.json(major);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteMajor = async (req, res) => {
    try {
        const major = await Major.findByPk(req.params.id);
        if (!major) return res.status(404).json({ message: 'Major not found' });

        await MajorSubjectMapping.destroy({ where: { major_id: major.id } });
        await major.destroy();

        res.json({ message: 'Major deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMajorStatistics = async (req, res) => {
    try {
        const major = await Major.findByPk(req.params.id, {
            include: [
                { model: HistoricalScore },
                { 
                    model: require('../models/index').Application,
                    attributes: []
                }
            ]
        });

        if (!major) return res.status(404).json({ message: 'Major not found' });

        const Application = require('../models/index').Application;
        const applicationCount = await Application.count({ where: { major_id: major.id } });
        const approvedCount = await Application.count({ where: { major_id: major.id, status: 'Approved' } });

        res.json({
            major_id: major.id,
            major_name: major.name,
            total_applications: applicationCount,
            approved_applications: approvedCount,
            historical_scores: major.HistoricalScores,
            quota: major.quota,
            quota_filled_percentage: major.quota ? (approvedCount / major.quota * 100).toFixed(2) : 0
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllMajors,
    getMajorById,
    createMajor,
    updateMajor,
    deleteMajor,
    getMajorStatistics
};
