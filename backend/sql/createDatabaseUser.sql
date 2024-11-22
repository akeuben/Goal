CREATE USER 'username'@localhost IDENTIFIED BY "password";
GRANT ALL PRIVILEGES ON goal.* TO 'username'@localhost IDENTIFIED BY "password";
GRANT ALL PRIVILEGES ON login_schema.* TO 'username'@localhost IDENTIFIED BY "password";
FLUSH PRIVILEGES;
