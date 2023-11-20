CREATE USER `application`@`%` IDENTIFIED WITH 'mysql_native_password' AS '*25650E2BC68974CA662A0A2079085B8EC0BD99F0' REQUIRE NONE PASSWORD EXPIRE DEFAULT ACCOUNT UNLOCK PASSWORD HISTORY DEFAULT PASSWORD REUSE INTERVAL DEFAULT PASSWORD REQUIRE CURRENT DEFAULT;
GRANT USAGE ON *.* TO `application`@`%`;
GRANT SELECT, INSERT, UPDATE, DELETE, EXECUTE ON `eshop`.* TO `application`@`%`;
CREATE USER `hrmanager`@`%` IDENTIFIED WITH 'mysql_native_password' AS '*E491627F86AC22E2B2FC148E7A4757DF615207CA' REQUIRE NONE PASSWORD EXPIRE DEFAULT ACCOUNT UNLOCK PASSWORD HISTORY DEFAULT PASSWORD REUSE INTERVAL DEFAULT PASSWORD REQUIRE CURRENT DEFAULT;
GRANT USAGE ON *.* TO `hrmanager`@`%`;
GRANT SELECT ON `eshop`.`employee` TO `hrmanager`@`%`;
CREATE USER `readonly`@`%` IDENTIFIED WITH 'mysql_native_password' AS '*922A4B420903CAD4E7FC56A23122AB927E051FE3' REQUIRE NONE PASSWORD EXPIRE DEFAULT ACCOUNT UNLOCK PASSWORD HISTORY DEFAULT PASSWORD REUSE INTERVAL DEFAULT PASSWORD REQUIRE CURRENT DEFAULT;
GRANT USAGE ON *.* TO `readonly`@`%`;
GRANT SELECT ON `eshop`.* TO `readonly`@`%`;
CREATE USER `sibu`@`%` IDENTIFIED WITH 'mysql_native_password' AS '*44357C85E05131AC1CB45E34A1A986D4E3473A85' REQUIRE NONE PASSWORD EXPIRE DEFAULT ACCOUNT UNLOCK PASSWORD HISTORY DEFAULT PASSWORD REUSE INTERVAL DEFAULT PASSWORD REQUIRE CURRENT DEFAULT;
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, RELOAD, PROCESS, REFERENCES, INDEX, ALTER, SHOW DATABASES, CREATE TEMPORARY TABLES, LOCK TABLES, EXECUTE, REPLICATION SLAVE, REPLICATION CLIENT, CREATE VIEW, SHOW VIEW, CREATE ROUTINE, ALTER ROUTINE, CREATE USER, EVENT, TRIGGER, CREATE ROLE, DROP ROLE ON *.* TO `sibu`@`%` WITH GRANT OPTION;
GRANT APPLICATION_PASSWORD_ADMIN,REPLICATION_APPLIER,ROLE_ADMIN,SESSION_VARIABLES_ADMIN,SET_USER_ID,SHOW_ROUTINE,XA_RECOVER_ADMIN ON *.* TO `sibu`@`%` WITH GRANT OPTION;
