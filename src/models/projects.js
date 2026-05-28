import db from './db.js'

const getAllprojects = async () => {
    const query = `
        SELECT name, description
        FROM public.projects;
    `;
    const result = await db.query(query);
    
    return result.rows;
};

export { getAllprojects }