const { PrismaClient } = require('@prisma/client');

// This initializes the database client
const prisma = new PrismaClient();

module.exports = prisma;