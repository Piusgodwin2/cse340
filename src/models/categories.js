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


const createCategory = async (name) => {
    const query = `
        INSERT INTO categories (name)
        VALUES ($1)
        RETURNING id;
    `;
    const queryParams = [name];
    const result = await db.query(query, queryParams);
    return result.rows[0].id;
};

const updateCategory = async (categoryId, name) => {
    const query = `
        UPDATE categories
        SET name = $1
        WHERE id = $2;
    `;
    const queryParams = [name, categoryId];
    await db.query(query, queryParams);
};

export {getAllCategories, getCategoryById,
    createCategory, updateCategory
}