-- My ID Card / Tomorrow's Identity — database schema
CREATE DATABASE IF NOT EXISTS my_id_card;

USE my_id_card;

CREATE TABLE IF NOT EXISTS id_cards (
    id INT AUTO_INCREMENT PRIMARY KEY,

    given_name VARCHAR(100) NOT NULL,
    nickname VARCHAR(100),
    age VARCHAR(50),
    pronouns VARCHAR(100),
    species VARCHAR(100),
    birthday DATE NULL,
    favorite_things TEXT,
    short_bio TEXT,
    image_url TEXT,

    theme VARCHAR(50) DEFAULT 'pink',
    primary_color VARCHAR(20),
    secondary_color VARCHAR(20),
    accent_color VARCHAR(20),
    decoration VARCHAR(50) DEFAULT 'minimal',
    personal_symbol VARCHAR(20) DEFAULT '★',
    photo_frame VARCHAR(50) DEFAULT 'square',

    card_number VARCHAR(50) UNIQUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
