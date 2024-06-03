/*
  Warnings:

  - A unique constraint covering the columns `[follower_id,following_id]` on the table `follower` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `follower_follower_id_following_id_key` ON `follower`(`follower_id`, `following_id`);
