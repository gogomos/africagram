const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

const updateUser = async (req, res) => {
    const userIdFromToken = req.userId;
    const userIdFromParams = parseInt(req.params.id);
    const { firstname, lastname, email, password } = req.body;

    if (userIdFromToken !== userIdFromParams) {
        return res.status(403).json({ error: 'You can only update your own account' });
    }

    try {
        const data = {};

        if (firstname) data.firstname = firstname;
        if (lastname) data.lastname = lastname;
        if (email) data.email = email;
        if (password) data.password = await bcrypt.hash(password, 10);

        const updatedUser = await prisma.utilisateur.update({
            where: { id: userIdFromToken },
            data,
        });

        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteUser = async (req, res) => {
    const userIdFromToken = req.userId;
    const userIdFromParams = parseInt(req.params.id);

    if (userIdFromToken !== userIdFromParams) {
        return res.status(403).json({ error: 'You can only delete your own account' });
    }

    try {
        await prisma.utilisateur.delete({
            where: { id: userIdFromToken },
        });

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { updateUser, deleteUser };
