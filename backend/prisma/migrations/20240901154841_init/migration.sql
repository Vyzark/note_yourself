-- DropIndex
DROP INDEX `Tag_name_idx` ON `tag`;

-- RenameIndex
ALTER TABLE `tag` RENAME INDEX `Tag_userId_fkey` TO `Tag_userId_idx`;
