const { Faculty, Major } = require('../models/index');
const { Op } = require('sequelize');

const generateSlug = (text) => {
    return text
        .toLowerCase()
        .normalize("NFD")  
        .replace(/[\u0300-\u036f]/g, "")  
        .replace(/[đĐ]/g, "d")  
        .replace(/[^a-z0-9]/g, "-")  
        .replace(/-+/g, "-")  
        .replace(/^-|-$/g, "");  
};

const getAllFaculties = async (req, res) => {
    try {
        const { page, limit, search } = req.query;
        
        let where = {};
        if (search) {
            where.name = { [Op.like]: `%${search}%` };
        }

        if (!limit && !page) {
            const faculties = await Faculty.findAll({
                where,
                include: [{ 
                    model: Major,
                    as: 'Majors'
                }],
                order: [['name', 'ASC']]
            });
            return res.json(faculties);
        }

        const offset = (page - 1) * limit;
        const { count, rows } = await Faculty.findAndCountAll({
            where,
            include: [{ model: Major }],
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['name', 'ASC']]
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

const getFacultyById = async (req, res) => {
    try {
        const faculty = await Faculty.findByPk(req.params.id, {
            include: [{ model: Major }]
        });
        
        if (!faculty) return res.status(404).json({ message: 'Faculty not found' });
        
        res.json(faculty);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createFaculty = async (req, res) => {
    try {
        const { name, code, introduction, logo_url } = req.body;
        
        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }

        const slug = generateSlug(name);

        const faculty = await Faculty.create({ 
            name, 
            code, 
            introduction, 
            logo_url,
            slug 
        });
        
        res.status(201).json(faculty);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateFaculty = async (req, res) => {
    try {
        const faculty = await Faculty.findByPk(req.params.id);
        if (!faculty) return res.status(404).json({ message: 'Faculty not found' });

        const { name, code, introduction, logo_url } = req.body;
        
        let slug = faculty.slug;
        
        if (!faculty.slug || (name && name !== faculty.name)) {
            const nameToUse = name || faculty.name;
            slug = generateSlug(nameToUse);
        }

        const updateData = {};
        if (name !== undefined) updateData.name = name;
        if (code !== undefined) updateData.code = code === '' ? null : code;
        if (introduction !== undefined) updateData.introduction = introduction === '' ? null : introduction;
        if (logo_url !== undefined) updateData.logo_url = logo_url === '' ? null : logo_url;
        if (slug !== faculty.slug) updateData.slug = slug;

        await faculty.update(updateData);

        res.json(faculty);
    } catch (error) {
        console.error('Update faculty error:', error);
        res.status(500).json({ message: error.message });
    }
};

const deleteFaculty = async (req, res) => {
    try {
        const faculty = await Faculty.findByPk(req.params.id);
        if (!faculty) return res.status(404).json({ message: 'Faculty not found' });

        const majorCount = await Major.count({ where: { faculty_id: faculty.id } });
        if (majorCount > 0) {
            return res.status(400).json({ message: 'Cannot delete faculty with existing majors' });
        }

        await faculty.destroy();
        res.json({ message: 'Faculty deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getFacultyBySlug = async (req, res) => {
    try {
        const faculty = await Faculty.findOne({
            where: { slug: req.params.slug },
            include: [{ model: Major }]
        });
        
        if (!faculty) return res.status(404).json({ message: 'Faculty not found' });
        
        res.json(faculty);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const fixSlugs = async (req, res) => {
    try {
        const faculties = await Faculty.findAll();
        const results = [];
        
        for (const faculty of faculties) {
            const slug = faculty.name
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[đĐ]/g, "d")
                .replace(/[^a-z0-9]/g, "-")
                .replace(/-+/g, "-")
                .replace(/^-|-$/g, "");
            
            await faculty.update({ slug });
            results.push({ id: faculty.id, name: faculty.name, slug });
        }
        
        res.json({ message: 'Slugs updated', results });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllFaculties,
    getFacultyById,
    getFacultyBySlug,
    createFaculty,
    updateFaculty,
    deleteFaculty,
    fixSlugs
};
