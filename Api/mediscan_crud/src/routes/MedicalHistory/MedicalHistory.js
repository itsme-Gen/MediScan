const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const MedicalHistory = require('../../Models/MedicalHistory');  

const router = express.Router()

router.use(express.json())
router.use(cors())

router.get("/medicalhistory/:patientId", async (req, res) => {
  try {
    const { patientId } = req.params;
    console.log("Received patientId:", patientId);


    if (!mongoose.Types.ObjectId.isValid(patientId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid patient ID format",
      });
    }

    const histories = await MedicalHistory.find({
      patientId: new mongoose.Types.ObjectId(patientId),
    })

    if (histories.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No medical history",
      });
    }

    res.status(200).json({ success: true, data: histories });
  } catch (error) {
    console.error("Error fetching medical histories:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
