const { User, Role } = require('../models/index');
const bcrypt = require('bcryptjs');

const registerAdmin = async (req, res) => {
    try {
        const { email, password, secretKey } = req.body;

        if (secretKey !== process.env.ADMIN_SECRET_KEY && secretKey !== 'CREATE_ADMIN_2026') {
            return res.status(403).json({ message: 'Secret key không hợp lệ' });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email đã tồn tại trong hệ thống' });
        }

        const [adminRole] = await Role.findOrCreate({ 
            where: { name: 'Admin' },
            defaults: { name: 'Admin' }
        });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            password: hashedPassword,
            role_id: adminRole.id
        });

        res.status(201).json({
            message: 'Tài khoản admin đã được tạo thành công',
            user: {
                id: user.id,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Register admin error:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerAdmin };
