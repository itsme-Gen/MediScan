const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const express = require('express');
const connectDB = require('./dbconnection/db.js');
const auth = require('./routes/Authentication/auth.js');
const fetchUser = require("./routes/DIsplayUser/fetchuser.js");
const verifyPatient = require("./routes/VerifyPatient/verifypatient.js");
const RegisterPatient = require('./routes/RegisterPatient/Register.js');
const MedicalHistory = require('./routes/MedicalHistory/MedicalHistory.js');

const app = express();

app.use(express.json());

// Connect to the database
connectDB();

app.get('/', (req, res) => {
  res.json({ success: true , message: "Database Connected Successfully" });
});


//Authentication routes
app.use('/auth', auth);

//Display User routes
app.use('/fetchuser', fetchUser);

//Verify Patient routes
app.use('/verify', verifyPatient);

//Register Patient routes
app.use('/api',RegisterPatient);

//Patient Medical History routes
app.use('/api',MedicalHistory);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
