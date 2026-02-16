const { AdmissionMethod, HistoricalScore, Application } = require('../models/index');
const { Op } = require('sequelize');

const getAllAdmissionMethods = async (req, res) => {
    try {
        const { page = 1, limit = 20 } = req.query;
        const offset = (page - 1) * limit;

        const { count, rows } = await AdmissionMethod.findAndCountAll({
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

const getAdmissionMethodById = async (req, res) => {
    try {
        const method = await AdmissionMethod.findByPk(req.params.id, {
            include: [
                { model: HistoricalScore },
                { model: Application }
            ]
        });
        
        if (!method) return res.status(404).json({ message: 'Admission method not found' });
        
        res.json(method);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createAdmissionMethod = async (req, res) => {
    try {
        const { name, description } = req.body;
        
        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }

        const method = await AdmissionMethod.create({ name, description });
        res.status(201).json(method);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateAdmissionMethod = async (req, res) => {
    try {
        const method = await AdmissionMethod.findByPk(req.params.id);
        if (!method) return res.status(404).json({ message: 'Admission method not found' });

        const { name, description } = req.body;
        await method.update({ name, description });

        res.json(method);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteAdmissionMethod = async (req, res) => {
    try {
        const method = await AdmissionMethod.findByPk(req.params.id);
        if (!method) return res.status(404).json({ message: 'Admission method not found' });

        const applicationCount = await Application.count({ where: { method_id: method.id } });
        const scoreCount = await HistoricalScore.count({ where: { method_id: method.id } });
        
        if (applicationCount > 0 || scoreCount > 0) {
            return res.status(400).json({ message: 'Cannot delete admission method that is in use' });
        }

        await method.destroy();
        res.json({ message: 'Admission method deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllAdmissionMethods,
    getAdmissionMethodById,
    createAdmissionMethod,
    updateAdmissionMethod,
    deleteAdmissionMethod
};
