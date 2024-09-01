/*
  Warnings:

  - You are about to drop the `tagsonnotes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `tagsonnotes` DROP FOREIGN KEY `TagsOnNotes_noteId_fkey`;

-- DropForeignKey
ALTER TABLE `tagsonnotes` DROP FOREIGN KEY `TagsOnNotes_tagId_fkey`;

-- DropTable
DROP TABLE `tagsonnotes`;

-- CreateTable
CREATE TABLE `_NoteToTag` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_NoteToTag_AB_unique`(`A`, `B`),
    INDEX `_NoteToTag_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Tag_name_idx` ON `Tag`(`name`);

-- AddForeignKey
ALTER TABLE `_NoteToTag` ADD CONSTRAINT `_NoteToTag_A_fkey` FOREIGN KEY (`A`) REFERENCES `Note`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_NoteToTag` ADD CONSTRAINT `_NoteToTag_B_fkey` FOREIGN KEY (`B`) REFERENCES `Tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `note` RENAME INDEX `Note_userId_fkey` TO `Note_userId_idx`;
