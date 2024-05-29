const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const profileController = {
    // Get profile by user ID
    getProfile: async (req, res) => {
        const { user_id } = req.params;

        try {
            const profile = await prisma.profile.findUnique({
                where: { id_utilisateur: parseInt(user_id) },
            });

            if (!profile) {
                return res.status(404).json({ error: "Profile not found" });
            }

            res.json(profile);
        } catch (error) {
            console.error("Error fetching profile:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    // Create profile
    createProfile: async (req, res) => {
        const { user_id } = req.params;
        const { sexe, pays, ville } = req.body;

        try {
            const newProfile = await prisma.profile.create({
                data: {
                    id_utilisateur: parseInt(user_id),
                    sexe,
                    pays,
                    ville,
                    date_creation: new Date(),
                    date_modification: new Date(),
                },
            });

            res.status(201).json(newProfile);
        } catch (error) {
            console.error("Error creating profile:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    // Update profile
    updateProfile: async (req, res) => {
        const { user_id } = req.params;
        const { sexe, pays, ville } = req.body;

        try {
            const updatedProfile = await prisma.profile.update({
                where: { id_utilisateur: parseInt(user_id) },
                data: {
                    sexe,
                    pays,
                    ville,
                    date_modification: new Date(),
                },
            });

            res.json(updatedProfile);
        } catch (error) {
            console.error("Error updating profile:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    // Delete profile
    deleteProfile: async (req, res) => {
        const { user_id } = req.params;

        try {
            await prisma.profile.delete({
                where: { id_utilisateur: parseInt(user_id) },
            });

            res.json({ message: "Profile deleted successfully" });
        } catch (error) {
            console.error("Error deleting profile:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
};

module.exports = profileController;
