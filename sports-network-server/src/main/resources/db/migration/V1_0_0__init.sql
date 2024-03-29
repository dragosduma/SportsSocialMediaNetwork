-- MySQL Script generated by MySQL Workbench
-- Fri Mar 10 19:12:19 2023
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema sportssocialmediadb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema sportssocialmediadb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `sportssocialmediadb` DEFAULT CHARACTER SET utf8 ;
USE `sportssocialmediadb` ;

-- -----------------------------------------------------
-- Table `sportssocialmediadb`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sportssocialmediadb`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `phone_number` VARCHAR(45) NULL,
  `password_hash` VARCHAR(45) NOT NULL,
  `registered_at` DATETIME NOT NULL,
  `last_login` DATETIME NULL,
  `profile` VARCHAR(45) NULL,
  `email` VARCHAR(45) NOT NULL,
  `user_image` BLOB NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sportssocialmediadb`.`user_post`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sportssocialmediadb`.`user_post` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `message` VARCHAR(45) NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  `user_id` INT NOT NULL,
  `image` LONGBLOB NOT NULL,
  PRIMARY KEY (`id`, `user_id`),
  INDEX `fk_user_post_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_post_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `sportssocialmediadb`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sportssocialmediadb`.`event`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sportssocialmediadb`.`event` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `event_name` VARCHAR(45) NULL,
  `event_details` VARCHAR(45) NULL,
  `event_datetime` DATETIME NULL,
  `event_duration` INT NULL,
  `sport_type` VARCHAR(45) NOT NULL,
  `user_id` INT NOT NULL,
  `latitude` DOUBLE NULL,
  `longitude` DOUBLE NULL,
  PRIMARY KEY (`id`, `user_id`),
  INDEX `fk_event_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_event_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `sportssocialmediadb`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sportssocialmediadb`.`training_plan`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sportssocialmediadb`.`training_plan` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(45) NOT NULL,
  `created_by` INT NOT NULL,
  `description` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sportssocialmediadb`.`event_has_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sportssocialmediadb`.`event_has_user` (
  `event_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`event_id`, `user_id`),
  INDEX `fk_event_has_user_user1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_event_has_user_event_idx` (`event_id` ASC) VISIBLE,
  CONSTRAINT `fk_event_has_user_event`
    FOREIGN KEY (`event_id`)
    REFERENCES `sportssocialmediadb`.`event` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_event_has_user_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `sportssocialmediadb`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sportssocialmediadb`.`training_plan_has_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sportssocialmediadb`.`training_plan_has_user` (
  `training_plan_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`training_plan_id`, `user_id`),
  INDEX `fk_training_plan_has_user_user1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_training_plan_has_user_training_plan1_idx` (`training_plan_id` ASC) VISIBLE,
  CONSTRAINT `fk_training_plan_has_user_training_plan1`
    FOREIGN KEY (`training_plan_id`)
    REFERENCES `sportssocialmediadb`.`training_plan` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_training_plan_has_user_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `sportssocialmediadb`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sportssocialmediadb`.`post_comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sportssocialmediadb`.`post_comments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `text` VARCHAR(45) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `user_id` INT NOT NULL,
  `user_post_id` INT NOT NULL,
  PRIMARY KEY (`id`, `user_id`, `user_post_id`),
  INDEX `fk_post_comments_user1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_post_comments_user_post1_idx` (`user_post_id` ASC) VISIBLE,
  CONSTRAINT `fk_post_comments_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `sportssocialmediadb`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_post_comments_user_post1`
    FOREIGN KEY (`user_post_id`)
    REFERENCES `sportssocialmediadb`.`user_post` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
