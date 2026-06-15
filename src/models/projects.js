import db from './db.js'

const getAllprojects = async () => {
    const query = `
        SELECT name, description
        FROM public.projects;
    `;
    const result = await db.query(query);
    
    return result.rows;
};

const getProjectsByOrganizationId = async (organizationId) => {
    const query = `
        SELECT
            id,
            organization_id,
            name,
            description,
            location
        FROM public.projects
        WHERE organization_id = $1;
    `;
    const queryParams = [organizationId];
    const result = await db.query(query, queryParams);

    return result.rows;
};
const getProjectsByCategoryId = async (categoryId) => {
    const query = `
        SELECT
            p.id AS project_id,
            p.name,
            p.description,
            p.location
        FROM projects p
        JOIN project_categories pc ON p.id = pc.project_id
        WHERE pc.category_id = $1
    `;
    const queryParams = [categoryId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

const getProjectById = async (projectId) => {
    const query = `
        SELECT
            id AS project_id,
            name,
            description,
            location,
            organization_id
        FROM projects
        WHERE id = $1;
    `;
    const queryParams = [projectId];
    const result = await db.query(query, queryParams);

    return result.rows.length > 0 ? result.rows[0] : null;
};

const getCategoriesByProjectId = async (projectId) => {
    const query = `
        SELECT
            c.id AS category_id,
            c.name
        FROM categories c
        JOIN project_categories pc ON c.id = pc.category_id
        WHERE pc.project_id = $1;
    `;
    const queryParams = [projectId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

const createProject = async (title, description, location, date, organizationId) => {
    const query = `
      INSERT INTO project (title, description, location, date, organization_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING project_id;
    `;

    const queryParams = [title, description, location, date, organizationId];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create project');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new project with ID:', result.rows[0].project_id);
    }

    return result.rows[0].project_id;
}

export { getAllprojects, getProjectsByOrganizationId, getProjectsByCategoryId, getCategoriesByProjectId, getProjectById, createProject };