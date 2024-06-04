-- DropForeignKey
ALTER TABLE `aime` DROP FOREIGN KEY `Aime_post_id_fkey`;

-- DropForeignKey
ALTER TABLE `aime` DROP FOREIGN KEY `Aime_utilisateur_id_fkey`;

-- DropForeignKey
ALTER TABLE `commentaire` DROP FOREIGN KEY `Commentaire_post_id_fkey`;

-- DropForeignKey
ALTER TABLE `commentaire` DROP FOREIGN KEY `Commentaire_utilisateur_id_fkey`;

-- DropForeignKey
ALTER TABLE `follower` DROP FOREIGN KEY `Follower_follower_id_fkey`;

-- DropForeignKey
ALTER TABLE `follower` DROP FOREIGN KEY `Follower_following_id_fkey`;

-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_utilisateur_id_fkey`;

-- DropForeignKey
ALTER TABLE `profile` DROP FOREIGN KEY `Profile_utilisateur_id_fkey`;

-- AddForeignKey
ALTER TABLE `aime` ADD CONSTRAINT `Aime_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `aime` ADD CONSTRAINT `Aime_utilisateur_id_fkey` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `commentaire` ADD CONSTRAINT `Commentaire_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `commentaire` ADD CONSTRAINT `Commentaire_utilisateur_id_fkey` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `follower` ADD CONSTRAINT `Follower_follower_id_fkey` FOREIGN KEY (`follower_id`) REFERENCES `utilisateur`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `follower` ADD CONSTRAINT `Follower_following_id_fkey` FOREIGN KEY (`following_id`) REFERENCES `utilisateur`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `post` ADD CONSTRAINT `Post_utilisateur_id_fkey` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profile` ADD CONSTRAINT `Profile_utilisateur_id_fkey` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
