CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS instructor (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS student (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS question_bank (
    id SERIAL PRIMARY KEY,
    subject VARCHAR(100) NOT NULL,
    owner_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY(owner_id) REFERENCES instructor(id)
)

CREATE TABLE IF NOT EXISTS questions (
    id INTEGER NOT NULL,
    question_no NOT NULL,
    question VARCHAR(255) NOT NULL,
    answer VARCHAR(255) NOT NULL,
    marks INT NOT NULL,
    FOREIGN KEY(id) REFERENCES question_bank(id)
)

CREATE TABLE IF NOT EXISTS exam (
    id SERIAL PRIMARY KEY,
    qid INTEGER NOT NULL,
    iid INTEGER NOT NULL,
    total_marks INTEGER NOT NULL,
    FOREIGN KEY(qid) REFERENCES question_bank(id),
    FOREIGN KEY(iid) REFERENCES instructor(id)
)

CREATE TABLE IF NOT EXISTS results (
    id SERIAL PRIMARY KEY,
    eid INTEGER NOT NULL,
    sid INTEGER NOT NULL,
    iid INTEGER NOT NULL,
    final_marks INTEGER NOT NULL,
    total_marks INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY(eid) REFERENCES exam(id),
    FOREIGN KEY(sid) REFERENCES student(id),
    FOREIGN KEY(iid) REFERENCES instructor(id)
)