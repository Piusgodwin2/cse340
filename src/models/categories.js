import db from './db.js'

const getAllCategories = async() => {
    const query = `
        SELECT id, name
      FROM public.categories;
    `;

    const result = await db.query(query);

    return result.rows;
}

const getCategoryById = async (categoryId) => {
    const query = `
        SELECT id AS category_id, name
        FROM categories
        WHERE id = $1;
    `;
    const queryParams = [categoryId];
    const result = await db.query(query, queryParams);

    return result.rows.length > 0 ? result.rows[0] : null;
};

export {getAllCategories, getCategoryById}