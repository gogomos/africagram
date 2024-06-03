/*
  Warnings:

  - A unique constraint covering the columns `[utilisateur_id,post_id]` on the table `aime` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `aime_utilisateur_id_post_id_key` ON `aime`(`utilisateur_id`, `post_id`);
