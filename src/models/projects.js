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
        ORDER BY p.date;
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
export { getAllprojects, getProjectsByOrganizationId, getProjectsByCategoryId, getCategoriesByProjectId, getProjectById };