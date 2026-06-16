import express from 'express';

import { showHomePage } from './controllers/index.js';
import { showOrganizationsPage, showOrganizationDetailsPage, showNewOrganizationform, processNewOrganizationForm,
    organizationValidation, showEditOrganizationForm, processEditOrganizationForm
} from './controllers/organizations.js';

import { showProjectsPage, showProjectDetailsPage,showNewProjectForm, processNewProjectForm, projectValidation } from './controllers/projects.js';
import { showCategoriesPage, showCategoryDetailsPage, showNewCategoryForm, processNewCategoryForm, 
    showEditCategoryForm, processEditCategoryForm, categoryValidation } from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';
import { 
    showUserRegistrationForm, 
    processUserRegistrationForm, 
    showLoginForm, 
    processLoginForm, 
    processLogout,
    requireLogin,
    showDashboard,
    requireRole
} from './controllers/users.js';
const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);
router.get('/new-category',requireLogin('admin'), showNewCategoryForm);
router.post('/new-category',requireLogin('admin'), categoryValidation, processNewCategoryForm);
router.get('/edit-category/:id',requireLogin('admin'), showEditCategoryForm);
router.post('/edit-category/:id',requireLogin('admin'), categoryValidation, processEditCategoryForm);
router.get('/new-organization',requireLogin('admin'), showNewOrganizationform);
// Route to display the edit organization form
router.get('/edit-organization/:id',requireLogin('admin'), showEditOrganizationForm);
// Route to handle the edit organization form submission
router.post('/edit-organization/:id',requireLogin('admin'), organizationValidation, processEditOrganizationForm);
// Route to handle new organization form submission
router.post('/new-organization',requireLogin('admin'), organizationValidation, processNewOrganizationForm);
// Route to handle the edit organization form submission
// Route for new project page
router.get('/new-project', requireLogin('admin'), showNewProjectForm);

// Route to handle new project form submission
router.post('/new-project', requireLogin('admin'), projectValidation, processNewProjectForm);
// User registration routes
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);

// User login routes
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);
// Protected dashboard route
router.get('/dashboard', requireLogin, showDashboard);




// error-handling routes
router.get('/test-error', testErrorPage);

export default router;