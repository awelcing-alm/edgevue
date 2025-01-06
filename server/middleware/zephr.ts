import { defineEventHandler, getRequestURL } from 'h3';

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event).pathname;

  if (url.startsWith('/protected')) {
    const authHeader = event.node.req.headers['authorization'];
    if (!authHeader) {
      throw createError({ statusCode: 401, statusMessage: 'Unauthorized: Missing JWT' });
    }
  }
});
