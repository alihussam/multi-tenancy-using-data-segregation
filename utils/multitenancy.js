const { mongodb } = require('../config');

/**
 * Creating New MongoDb Connection obect by Switching DB
 */
const getTenantDB = (tenantId, modelName, schema) => {
    const dbName = `myApp_${tenantId}`;
    const connection = mongodb.connection;
    if (connection) {
        // useDb will return new connection
        const db = connection.useDb(dbName, { useCache: true });
        db.model(modelName, schema);
        return db;
    }
    throw Error('MongoDB Object not found');
};

/**
 * Return Model as per tenant
 */
exports.getModelByTenant = (tenantId, modelName, schema) => {
    const tenantDb = getTenantDB(tenantId, modelName, schema);
    return tenantDb.model(modelName);
};