const express = require('express');
const bodyParser = require('body-parser');
const { PORT, DB_SYNC } = require('./config/serverConfig');
const app = express();
const db = require('./models/index');
const { User, Role } = require('./models/index');
const apiRoutes = require('./routes/index');

const prepareAndStartServer = async () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/api', apiRoutes);

    app.listen(PORT, async () => {
        console.log(`server started at ${PORT}`);
        if (DB_SYNC) {
            await db.sequelize.sync({ alter: true });
        }

        // Use a valid user ID and role ID
        const u1 = await User.findByPk(1); // Change this to an existing user ID
        const u2 = await Role.findByPk(2); // Ensure this role ID exists

        if (u1 && u2) {
            await u1.addRole(u2);
            console.log(`Role ${u2.name} added to user ${u1.email}`);
        } else {
            if (!u1) {
                console.log('User with ID 1 not found');
            }
            if (!u2) {
                console.log('Role with ID 2 not found');
            }
        }
    });
};

prepareAndStartServer();