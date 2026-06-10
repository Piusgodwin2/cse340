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

export { getAllprojects, getProjectsByOrganizationId };