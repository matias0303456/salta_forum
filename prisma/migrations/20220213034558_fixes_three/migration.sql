/*
  Warnings:

  - You are about to drop the column `post_id` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `comment_id` on the `response` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `response` table. All the data in the column will be lost.
  - Added the required column `postId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `commentId` to the `Response` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Response` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Comment_post_id_fkey` ON `comment`;

-- DropIndex
DROP INDEX `Comment_user_id_fkey` ON `comment`;

-- DropIndex
DROP INDEX `Post_user_id_fkey` ON `post`;

-- DropIndex
DROP INDEX `Response_comment_id_fkey` ON `response`;

-- DropIndex
DROP INDEX `Response_user_id_fkey` ON `response`;

-- AlterTable
ALTER TABLE `comment` DROP COLUMN `post_id`,
    DROP COLUMN `user_id`,
    ADD COLUMN `postId` INTEGER NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `post` DROP COLUMN `user_id`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `response` DROP COLUMN `comment_id`,
    DROP COLUMN `user_id`,
    ADD COLUMN `commentId` INTEGER NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Response` ADD CONSTRAINT `Response_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Response` ADD CONSTRAINT `Response_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `Comment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
