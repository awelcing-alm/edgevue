export default defineEventHandler((event) => {
    const query = getQuery(event);
  
    if (query.where && Array.isArray(query.where) && query.where[0]?._path === '/stats') {
      return { message: 'Data for stats' };
    }
  
    throw createError({ statusCode: 404, statusMessage: 'Not Found' });
  });
  