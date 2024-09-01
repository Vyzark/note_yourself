/*
  Warnings:

  - Made the column `noteId` on table `tags` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `tags` DROP FOREIGN KEY `Tags_noteId_fkey`;

-- AlterTable
ALTER TABLE `tags` MODIFY `noteId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `tagsOnNotes` (
    `noteId` INTEGER NOT NULL,
    `tagId` INTEGER NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`noteId`, `tagId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tagsOnNotes` ADD CONSTRAINT `tagsOnNotes_noteId_fkey` FOREIGN KEY (`noteId`) REFERENCES `Note`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tagsOnNotes` ADD CONSTRAINT `tagsOnNotes_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tags`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
