const { authAdmin } = require("./fireBase");

async function createCustomToken(req, res) {
    try {
        const token = req.headers.authorization;
        const { uid } = await authAdmin.verifyIdToken(token);
        if (!uid) res.status(400).json({ error: "Invalid token" });

        const customToken = await authAdmin.createCustomToken(uid);

        res.status(200).json({ data: { customToken } });
    } catch (error) {
        console.log(error);
    }
}


module.exports = { createCustomToken };
