CREATE USER IF NOT EXISTS 'user'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON mydb.* TO 'user'@'%';
FLUSH PRIVILEGES;

CREATE TABLE IF NOT EXISTS random_numbers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  randomNumber INT,
  squaredRandomNumber INT,
  timestamp TIMESTAMP
);