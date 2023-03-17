-- -----------------------------------------------------
-- Table `sportssocialmediadb`.`likes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sportssocialmediadb`.`likes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `user_post_id` INT NOT NULL,
  PRIMARY KEY (`id`, `user_id`, `user_post_id`),
  INDEX `fk_table1_user_post1_idx` (`user_post_id` ASC) VISIBLE,
  CONSTRAINT `fk_table1_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `sportssocialmediadb`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_table1_user_post1`
    FOREIGN KEY (`user_post_id`)
    REFERENCES `sportssocialmediadb`.`user_post` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)