/*import dotenv from 'dotenv';
dotenv.config();*/

import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { testConnection } from './src/models/db.js';
import { getAllOrganizations } from './src/models/organizations.js';
import { getAllCategories } from './src/models/categories.js';
import { getAllprojects } from './src/models/projects.js';

const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;

const app = express();

/**
 * Serve static files
 */
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Set EJS
 */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

/**
 * Routes
 */
app.get('/', async (req, res) => {
    const title = 'Home';
    res.render('home', { title });
});

app.get('/organizations', async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Our Partner Organizations';

    res.render('organizations', { title, organizations });
});

app.get('/projects', async (req, res) => {
  const projects = await getAllprojects();
    const title = 'Projects';
    res.render('projects', { title, projects });
});

app.get('/categories', async (req, res) => {
  const categories = await getAllCategories();
    const title = 'Categories';
    res.render('categories', { title, categories });
});

/**
 * Server
 */
app.listen(PORT, async () => {
  try {
    await testConnection();
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
});
