const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const profileController = {
    getProfileByID: async (req, res) => {
        const { user_id } = req.params;

        try {
            const profile = await prisma.profile.findUnique({
                where: { utilisateur_id: parseInt(user_id) },
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

    createProfile: async (req, res) => {
        const userId = req.userId;
        const { sexe, pays, ville } = req.body;

        try {
            const existingProfile = await prisma.profile.findFirst({
                where: {
                    utilisateur_id: userId // Assuming req.userId is set by your authentication middleware
                }
            });
    
            if (existingProfile) {
                return res.status(400).json({ error: 'User already has a profile' });
            }
            const newProfile = await prisma.profile.create({
                data: {
                    utilisateur_id: parseInt(userId),
                    sexe,
                    pays,
                    ville,
                    date_creation: new Date(),
                    date_modification: new Date(),
                },
            });

            await prisma.utilisateur.update({
                where: { id: parseInt(userId) },
                data: { profileId: newProfile.id },
            });

            res.status(201).json(newProfile);
        } catch (error) {
            console.error("Error creating profile:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    updateProfile: async (req, res) => {
        const { user_id } = req.params;
        const { sexe, pays, ville } = req.body;

        try {
            const updatedProfile = await prisma.profile.update({
                where: { utilisateur_id: parseInt(user_id) },
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

    deleteProfile: async (req, res) => {
        const { user_id } = req.params;

        try {
            await prisma.profile.delete({
                where: { utilisateur_id: parseInt(user_id) },
            });

            res.json({ message: "Profile deleted successfully" });
        } catch (error) {
            console.error("Error deleting profile:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
};

module.exports = profileController;
