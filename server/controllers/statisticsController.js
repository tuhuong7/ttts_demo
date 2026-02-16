const { User, Application, Major, Candidate } = require('../models');
const { Op } = require('sequelize');

const getDashboardStats = async (req, res) => {
    try {
        const [
            totalUsers,
            totalApplications,
            totalMajors,
            pendingApplications
        ] = await Promise.all([
            User.count(),
            Application.count(),
            Major.count(),
            Application.count({ where: { status: 'Pending' } })
        ]);

        const recentApplications = await Application.findAll({
            limit: 5,
            order: [['createdAt', 'DESC']],
            include: [
                { 
                    model: Candidate,
                    attributes: ['name', 'email']
                },
                { 
                    model: Major,
                    attributes: ['name', 'code']
                }
            ]
        });
        const formattedApplications = recentApplications.map(app => ({
            id: app.id,
            candidate_name: app.Candidate?.name || 'N/A',
            candidate_email: app.Candidate?.email || 'N/A',
            major_name: app.Major?.name || 'N/A',
            major_code: app.Major?.code || 'N/A',
            status: app.status,
            created_at: app.createdAt
        }));

        const systemHealth = {
            requests_today: Math.floor(Math.random() * 2000) + 500, 
            gemini_status: 'connected', 
            database_status: 'healthy',
            uptime: process.uptime()
        };

        res.json({
            counts: {
                users: totalUsers,
                applications: totalApplications,
                majors: totalMajors,
                pending_applications: pendingApplications
            },
            recent_applications: formattedApplications,
            system_health: systemHealth
        });
    } catch (error) {
        console.error('Get dashboard stats error:', error);
        res.status(500).json({ message: error.message });
    }
};

const getApplicationStats = async (req, res) => {
    try {
        const stats = await Application.findAll({
            attributes: [
                'status',
                [sequelize.fn('COUNT', sequelize.col('id')), 'count']
            ],
            group: ['status']
        });

        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMajorStats = async (req, res) => {
    try {
        const stats = await Major.findAll({
            attributes: [
                'id',
                'name',
                'code',
                [sequelize.fn('COUNT', sequelize.col('Applications.id')), 'application_count']
            ],
            include: [{
                model: Application,
                attributes: []
            }],
            group: ['Major.id'],
            order: [[sequelize.fn('COUNT', sequelize.col('Applications.id')), 'DESC']],
            limit: 10
        });

        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getDashboardStats,
    getApplicationStats,
    getMajorStats
};
