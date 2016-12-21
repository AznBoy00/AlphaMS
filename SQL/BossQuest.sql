ALTER TABLE `archonms`.`characters` 
ADD COLUMN `bosspoints` INT(11) NOT NULL DEFAULT '0' AFTER `PQPoints`;
