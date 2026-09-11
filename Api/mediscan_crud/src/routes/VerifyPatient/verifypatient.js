const express = require("express");
const cors = require("cors");
const Patient = require("../../Models/Patient.js");

const router  = express.Router();

router.use(cors());
router.use(express.json());


router.post("/patient", async (req, res) => {
  try {
    const { idNumber } = req.body;
    

    if (!idNumber) {
      return res
        .status(200)
        .json({ success: false, message: "Missing ID Number" });
    }

    const patient = await Patient.findOne({id_number: idNumber});

    if (!patient) {
      return res
        .status(200)
        .json({ success:false, message: "Patient not found" });
    }

    res.status(200).json({ success: true, message:"Patient found", patient });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
