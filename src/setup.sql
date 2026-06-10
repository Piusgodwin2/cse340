-- ========================================
-- Organization Table
-- ========================================
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);


-- ========================================
-- Insert sample data: Organizations
-- ========================================
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'bright.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'green.jpeg'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unity.png');


-- ============================================================
-- CATEGORIES TABLE
-- Each category has a unique ID and name
-- ============================================================
CREATE TABLE IF NOT EXISTS categories (
    id   SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE  -- UNIQUE ensures no duplicate category names
);

-- ============================================================
-- Step 4: Insert at least 3 categories
-- ============================================================
INSERT INTO categories (name) VALUES
    ('Environmental'),
    ('Education & Tutoring'),
    ('Community Outreach'),
    ('Food Security'),
    ('Health & Wellness');

	-- Create the projects table
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    organization_id INT,
    location VARCHAR(255),
    date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Populate projects with data
INSERT INTO projects (name, description, organization_id, location, date) VALUES ('Park Cleanup', 'Join us to clean up local parks and make them beautiful!', 1, 'Central Park', '2026-06-15');
INSERT INTO projects (name, description, organization_id, location, date) VALUES ('Food Drive', 'Help collect and distribute food to those in need.', 2, 'Community Center', '2026-06-20');
INSERT INTO projects (name, description, organization_id, location, date) VALUES ('Community Tutoring', 'Volunteer to tutor students in various subjects.', 3, 'Public Library', '2026-06-25');

ALTER TABLE projects
ADD COLUMN location VARCHAR(255);

SELECT id, name, location, description,organization_id FROM public.projects ORDER BY name;

UPDATE projects SET location = 'Lagos, Nigeria' WHERE id = 1;
UPDATE projects SET location = 'Abuja, Nigeria' WHERE id = 2;
UPDATE projects SET location = 'Port Harcourt, Nigeria' WHERE id = 3;

update projects set organization_id = 1 where id = 4;
update projects set organization_id = 2 where id = 5;
update projects set organization_id = 3 where id = 6;
SELECT organization_id, name FROM organization;

ALTER TABLE projects
ADD COLUMN organization_id INT;

ALTER TABLE projects
ADD CONSTRAINT fk_organization
FOREIGN KEY (organization_id)
REFERENCES organization(organization_id);

-- ============================================================
-- JUNCTION TABLE: project_categories
-- Resolves the many-to-many relationship between
-- service_projects and categories
-- ============================================================
CREATE TABLE IF NOT EXISTS project_categories (
    project_id  INT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    category_id INT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, category_id)
);
INSERT INTO project_categories (project_id, category_id) VALUES
    (1, 1),  -- Park Cleanup → Environmental
    (1, 3),  -- Park Cleanup → Community Outreach
    (2, 4),  -- Food Drive → Food Security
    (2, 3),  -- Food Drive → Community Outreach
    (3, 2),  -- Community Tutoring → Education & Tutoring
    (3, 3);  -- Community Tutoring → Community Outreach

SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'projects';