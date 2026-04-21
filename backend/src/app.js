const express = require('express');
const cors = require('cors');
const auditRoutes = require('./routes/auditRoutes');
const reportRoutes = require('./routes/reportRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/audit', auditRoutes);
app.use('/api/report', reportRoutes);

app.get('/', (req, res) => {
  res.send('Lead Audit System API');
});

module.exports = app;
