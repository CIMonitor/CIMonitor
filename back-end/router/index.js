const express = require('express');
const app = (module.exports = express());
const path = require('path');

app.use(require('./authorization.js'));

// Dashboard
app.use('/', require('./route/dashboard.js'));

// API routes
app.use('/status', require('./route/status.js'));
app.use('/webhook', require('./route/webhook.js'));
app.use('/debug', require('./route/debug.js'));
app.use('/contributors', require('./route/contributors.js'));
app.use('/version', require('./route/version.js'));
app.use('/trigger', require('./route/trigger.js'));
app.use('/password', require('./route/password.js'));

// Expose static files
app.use(express.static(path.join(__dirname, '../public')));
