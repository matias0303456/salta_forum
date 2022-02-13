/*
  Warnings:

  - You are about to drop the column `lastUpdate` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the column `lastUpdate` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `commentId` on the `response` table. All the data in the column will be lost.
  - You are about to drop the column `lastUpdate` on the `response` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `response` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `lastUpdate` on the `user` table. All the data in the column will be lost.
  - Added the required column `last_update` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_id` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_update` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comment_id` to the `Response` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_update` to the `Response` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Response` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_update` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Comment_postId_fkey` ON `comment`;

-- DropIndex
DROP INDEX `Comment_userId_fkey` ON `comment`;

-- DropIndex
DROP INDEX `Post_userId_fkey` ON `post`;

-- DropIndex
DROP INDEX `Response_commentId_fkey` ON `response`;

-- DropIndex
DROP INDEX `Response_userId_fkey` ON `response`;

-- AlterTable
ALTER TABLE `comment` DROP COLUMN `lastUpdate`,
    DROP COLUMN `postId`,
    DROP COLUMN `userId`,
    ADD COLUMN `last_update` DATETIME(3) NOT NULL,
    ADD COLUMN `post_id` INTEGER NOT NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `post` DROP COLUMN `lastUpdate`,
    DROP COLUMN `userId`,
    ADD COLUMN `last_update` DATETIME(3) NOT NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `response` DROP COLUMN `commentId`,
    DROP COLUMN `lastUpdate`,
    DROP COLUMN `userId`,
    ADD COLUMN `comment_id` INTEGER NOT NULL,
    ADD COLUMN `last_update` DATETIME(3) NOT NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `firstName`,
    DROP COLUMN `lastName`,
    DROP COLUMN `lastUpdate`,
    ADD COLUMN `first_name` VARCHAR(100) NOT NULL,
    ADD COLUMN `last_name` VARCHAR(100) NOT NULL,
    ADD COLUMN `last_update` DATETIME(3) NOT NULL;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Response` ADD CONSTRAINT `Response_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Response` ADD CONSTRAINT `Response_comment_id_fkey` FOREIGN KEY (`comment_id`) REFERENCES `Comment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
