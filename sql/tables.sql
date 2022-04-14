CREATE TABLE users (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	first_name VARCHAR(90) NOT NULL,
	last_name VARCHAR(90) NOT NULL,
	email VARCHAR(255) NOT NULL
);

CREATE TABLE articles (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(2todo5) NOT NULL,
	content TEXT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	user_id INT,
	KEY user_id_idx(user_id)todo
);

INSERT INTO users (first_name, last_name, email) VALUES (
	"gerardo", "martinez", "gerardo.martinez.arpe@ciisa.cl"
);
