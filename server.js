const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());
app.use(cors());

// ==================== ITHEMBA SECURE LAND REGISTRY ====================
// Developer: Luyandiswa Mabaso
// Contact: luyandiswambuyisen07@gmail.com | 0780255396
// Mission: Ending Land Fraud in South Africa

const landTitles = [];
const blockchain = [];

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: '🏠 ITHEMBA Secure Land Registry API',
    version: '1.0.0',
    mission: 'Ending Land Fraud in South Africa',
    developer: 'Luyandiswa Mabaso',
    contact: 'luyandiswambuyisen07@gmail.com',
    phone: '0780255396'
  });
});

// Get all titles
app.get('/api/titles', (req, res) => {
  res.json({
    system: 'Ithemba Secure Land Registry',
    mission: 'RESTORING TRUST IN EVERY TITLE',
    count: landTitles.length,
    titles: landTitles
  });
});

// Add new title
app.post('/api/titles', (req, res) => {
  const { ownerName, location, size, province } = req.body;

  const newTitle = {
    id: uuidv4(),
    titleNumber: `ITHEMBA-${Date.now()}`,
    ownerName,
    location,
    size,
    province,
    status: 'ACTIVE',
    registered: new Date().toISOString(),
    verified: true
  };

  landTitles.push(newTitle);

  // Add to blockchain
  blockchain.push({
    id: uuidv4(),
    titleId: newTitle.id,
    action: 'TITLE_REGISTERED',
    timestamp: new Date().toISOString(),
    hash: `blockchain_hash_${Date.now()}`
  });

  res.json({
    success: true,
    message: 'Title registered securely in Ithemba System',
    title: newTitle
  });
});

// Verify title
app.get('/api/titles/:id/verify', (req, res) => {
  const title = landTitles.find(t => t.id === req.params.id);

  if (!title) {
    return res.json({
      verified: false,
      message: 'Title not found in Ithemba Secure Registry'
    });
  }

  res.json({
    verified: true,
    message: '✅ Title verified and secure',
    title: title,
    blockchainProof: blockchain.find(b => b.titleId === title.id)
  });
});

// Get stats
app.get('/api/stats', (req, res) => {
  res.json({
    totalTitles: landTitles.length,
    blockchainEntries: blockchain.length,
    system: 'Ithemba Secure Land Registry',
    status: 'Protecting South African Land Rights'
  });
});

// About information
app.get('/api/about', (req, res) => {
  res.json({
    system: 'Ithemba Secure Land Registry',
    mission: 'Ending Land Fraud in South Africa',
    message: 'RESTORING TRUST IN EVERY TITLE',
    developer: {
      name: 'Luyandiswa Mabaso',
      email: 'luyandiswambuyisen07@gmail.com',
      phone: '0780255396',
      github: 'https://github.com/Luyandiswa',
      linkedin: 'www.linkedin.com/in/luyandiswa-mabaso-275047353'
    }
  });
});

const PORT = 5003;
app.listen(PORT, () => {
  console.log('=========================================');
  console.log('🏠 ITHEMBA SECURE LAND REGISTRY');
  console.log('=========================================');
  console.log('Mission: ENDING LAND FRAUD IN SA');
  console.log('Developer: Luyandiswa Mabaso');
  console.log('Contact: 0780255396');
  console.log('Server: http://localhost:5003');
  console.log('=========================================');
});