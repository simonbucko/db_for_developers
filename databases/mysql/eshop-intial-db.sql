-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema eshop
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `eshop` ;

-- -----------------------------------------------------
-- Schema eshop
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `eshop` DEFAULT CHARACTER SET latin1 ;
USE `eshop` ;

-- -----------------------------------------------------
-- Table `eshop`.`address`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `eshop`.`address` ;

CREATE TABLE IF NOT EXISTS `eshop`.`address` (
  `id` CHAR(36) NOT NULL,
  `state` VARCHAR(45) NOT NULL,
  `postalCode` VARCHAR(15) NOT NULL,
  `city` VARCHAR(45) NOT NULL,
  `street` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf16;


-- -----------------------------------------------------
-- Table `eshop`.`customer`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `eshop`.`customer` ;

CREATE TABLE IF NOT EXISTS `eshop`.`customer` (
  `id` CHAR(36) NOT NULL,
  `lastName` VARCHAR(50) NOT NULL,
  `firstName` VARCHAR(50) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `addressId` CHAR(36) NOT NULL,
  PRIMARY KEY (`id`, `addressId`),
  INDEX `fk_customer_address1_idx` (`addressId` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  CONSTRAINT `fk_customer_address1`
    FOREIGN KEY (`addressId`)
    REFERENCES `eshop`.`address` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf16;


-- -----------------------------------------------------
-- Table `eshop`.`office`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `eshop`.`office` ;

CREATE TABLE IF NOT EXISTS `eshop`.`office` (
  `id` CHAR(36) NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `addressId` CHAR(36) NOT NULL,
  PRIMARY KEY (`id`, `addressId`),
  INDEX `fk_office_address1_idx` (`addressId` ASC) VISIBLE,
  CONSTRAINT `fk_office_address1`
    FOREIGN KEY (`addressId`)
    REFERENCES `eshop`.`address` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf16;


-- -----------------------------------------------------
-- Table `eshop`.`job`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `eshop`.`job` ;

CREATE TABLE IF NOT EXISTS `eshop`.`job` (
  `id` CHAR(36) NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `title_UNIQUE` (`title` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf16;


-- -----------------------------------------------------
-- Table `eshop`.`employee`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `eshop`.`employee` ;

CREATE TABLE IF NOT EXISTS `eshop`.`employee` (
  `id` CHAR(36) NOT NULL,
  `lastName` VARCHAR(50) NOT NULL,
  `firstName` VARCHAR(50) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `addressId` CHAR(36) NOT NULL,
  `officeId` CHAR(36) NOT NULL,
  `jobId` CHAR(36) NOT NULL,
  PRIMARY KEY (`id`, `addressId`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  INDEX `fk_employee_address1_idx` (`addressId` ASC) VISIBLE,
  INDEX `fk_employee_office1_idx` (`officeId` ASC) VISIBLE,
  INDEX `fk_employee_jobTitle1_idx` (`jobId` ASC) VISIBLE,
  CONSTRAINT `fk_employee_address1`
    FOREIGN KEY (`addressId`)
    REFERENCES `eshop`.`address` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_employee_office1`
    FOREIGN KEY (`officeId`)
    REFERENCES `eshop`.`office` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_employee_jobTitle1`
    FOREIGN KEY (`jobId`)
    REFERENCES `eshop`.`job` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf16;


-- -----------------------------------------------------
-- Table `eshop`.`orderStatus`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `eshop`.`orderStatus` ;

CREATE TABLE IF NOT EXISTS `eshop`.`orderStatus` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `status` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `status_UNIQUE` (`status` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf16;


-- -----------------------------------------------------
-- Table `eshop`.`order`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `eshop`.`order` ;

CREATE TABLE IF NOT EXISTS `eshop`.`order` (
  `id` CHAR(36) NOT NULL,
  `orderDate` DATE NOT NULL,
  `shippedDate` DATE NULL DEFAULT NULL,
  `comments` TEXT NULL DEFAULT NULL,
  `customerId` CHAR(36) NOT NULL,
  `orderStatusId` INT NOT NULL,
  PRIMARY KEY (`id`, `orderStatusId`),
  INDEX `customerNumber` (`customerId` ASC) VISIBLE,
  INDEX `fk_order_orderStatus1_idx` (`orderStatusId` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  CONSTRAINT `orders_ibfk_1`
    FOREIGN KEY (`customerId`)
    REFERENCES `eshop`.`customer` (`id`),
  CONSTRAINT `fk_order_orderStatus1`
    FOREIGN KEY (`orderStatusId`)
    REFERENCES `eshop`.`orderStatus` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf16;


-- -----------------------------------------------------
-- Table `eshop`.`product`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `eshop`.`product` ;

CREATE TABLE IF NOT EXISTS `eshop`.`product` (
  `id` CHAR(36) NOT NULL,
  `name` VARCHAR(70) NOT NULL,
  `description` TEXT NOT NULL,
  `quantityInStock` SMALLINT NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf16;


-- -----------------------------------------------------
-- Table `eshop`.`orderdetail`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `eshop`.`orderdetail` ;

CREATE TABLE IF NOT EXISTS `eshop`.`orderdetail` (
  `orderId` CHAR(36) NOT NULL,
  `productId` CHAR(36) NOT NULL,
  `quantityOrdered` INT NOT NULL,
  PRIMARY KEY (`orderId`, `productId`),
  INDEX `productCode` (`productId` ASC) VISIBLE,
  CONSTRAINT `orderdetails_ibfk_1`
    FOREIGN KEY (`orderId`)
    REFERENCES `eshop`.`order` (`id`),
  CONSTRAINT `orderdetails_ibfk_2`
    FOREIGN KEY (`productId`)
    REFERENCES `eshop`.`product` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf16;


-- -----------------------------------------------------
-- Table `eshop`.`payment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `eshop`.`payment` ;

CREATE TABLE IF NOT EXISTS `eshop`.`payment` (
  `id` CHAR(36) NOT NULL,
  `customerId` CHAR(36) NOT NULL,
  `paymentDate` DATE NOT NULL,
  `amount` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `payments_ibfk_1`
    FOREIGN KEY (`customerId`)
    REFERENCES `eshop`.`customer` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf16;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
