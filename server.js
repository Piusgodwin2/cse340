import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;


const app = express();

// set ejs as the view engine

app.set('view engine', 'ejs');
/**
 * Serve Static files from public directory 
 */
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Routes
 */
app.get('/',(req, res) => {
    const title = 'Home';
    res.render('home', { title });
});

app.get('/organizations', (req, res) => {
    const title = 'organizations';
    res.render('organizations', { title });
});

app.get('/projects',(req, res) => {
    const title = 'projects';
    res.render('projects', { title });
});



/**
 * Server
 */
app.listen(PORT, () => {
    console.log(`Server running at http://127.0.0.1:${PORT}`);
});