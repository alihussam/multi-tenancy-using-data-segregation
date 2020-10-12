require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const { getModelByTenant } = require('./utils/multitenancy');
const signatureSchema = require('./models/signature');

const app = express();

// setup middlewares
app.use((bodyParser.json({ limit: '50mb' })));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));

/**
 * Create a new signature in tenants db
 * @param {Object} signaturesBody signature object body
 * @param {String} tenantId tenant id to switch db
 */
const addSignature = async (signaturesBody, tenantId) => {
    try {
        const Signature = getModelByTenant(tenantId, 'signature', signatureSchema);
        const signature = await Signature.create(signaturesBody);
        return signature;
    } catch (error) {
        throw error;
    }
};

app.post('/createSignature', async (req, res) => {
    try {
        const { tenantId } = req.body;
        const signature = await addSignature(req.body, tenantId);
        res.send(signature);
    } catch (error) {
        console.error(error);
    }
});

// start server
app.listen(3000, () => {
    console.info(`Multi-Tenancy POC Server running at PORT: 3000`);
}); 