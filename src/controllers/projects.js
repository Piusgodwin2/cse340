// Import any needed model functions
import { getAllprojects, getProjectById, getCategoriesByProjectId } from '../models/projects.js';

// Define any controller functions
const showProjectsPage = async (req, res) => {
    const projects = await getAllprojects();
    const title = 'Service Projects';

    res.render('projects', { title, projects });
};

const showProjectDetailsPage = async (req, res) => {
    const projectId = req.params.id;
    const projectDetails = await getProjectById(projectId);
    const categories = await getCategoriesByProjectId(projectId);
    const title = 'Project Details';

    res.render('project', { title, projectDetails, categories });
};

// Export any controller functions
export { showProjectsPage, showProjectDetailsPage };