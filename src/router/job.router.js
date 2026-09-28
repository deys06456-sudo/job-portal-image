const express = require("express");

const router = express.Router();

const JobController = require("../controller/job.controller");

const upload = require("../utils/multer");

// CREATE JOB
router.post(
    "/job/create",
    upload.single('image'),
    JobController.CreateJob
);


// router.post(
//     "/job",
//     JobController.CreateJob
// );


// GET ALL JOB
router.get(
    "/job/get",
    JobController.GetAllJob
);


// GET SINGLE JOB
router.get(
    "/job/:id",
    JobController.GetSingleJob
);


// UPDATE JOB
router.put(
    "/job/update/:id",
    upload.single('image'),
    JobController.UpdateJob
);


// DELETE JOB
router.delete(
    "/job/delete/:id",
    JobController.DeleteJob
);


module.exports = router;