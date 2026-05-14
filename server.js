import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;


const app = express();

// set ejs as the view engine

/**
 * Serve Static files from public directory 
 */
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Tell Express where to find your templates
app.set('views', path.join(__dirname, 'src/views'));



/**
 * Routes
 */
app.get('/',async(req, res) => {
    const title = 'Home';
    res.render('home', { title });
});

app.get('/organizations',async (req, res) => {
    const title = 'organizations';
    res.render('organizations', { title });
});

app.get('/projects', async(req, res) => {
    const title = 'projects';
    res.render('projects', { title });
});



/**
 * Server
 */
app.listen(PORT, () => {
    console.log(`Server running at http://127.0.0.1:${PORT}`);
});