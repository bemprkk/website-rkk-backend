const https = require('https');

const data = JSON.stringify({
  email: 'backend.bemprkk@unj.ac.id',
  password: 'AdminBemprkk.123',
  recaptchaToken: 'test_token'
});

const options = {
  hostname: 'website-rkk-backend-production.up.railway.app',
  port: 443,
  path: '/api/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = https.request(options, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  
  let body = '';
  res.on('data', (d) => {
    body += d;
  });
  
  res.on('end', () => {
    console.log('Response Body:', body);
  });
});

req.on('error', (error) => {
  console.error('Request Error:', error);
});

req.write(data);
req.end();
