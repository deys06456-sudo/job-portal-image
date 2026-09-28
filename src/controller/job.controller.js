const Job = require('../models/job.model');

class JobController {
    async CreateJob(req, res) {

        // Get data from Postman request body
        //console.log(req.file);
        try {
            console.log(req.body, req.file);
            const { title, description, companyName, location, salary, experience, employmentType, skills, qualification, applicationDeadline, status } = req.body;

            if (!title || !description || !companyName || !location || !salary || !experience || !employmentType || !skills || !qualification || !applicationDeadline || !status) {
                return res.status(400).json({
                    success: false,
                    message: "All Fields are required"
                });
            }

            // Create employee object
            const jobdata = new Job({
                title, description, companyName, location, salary, experience, employmentType, skills, qualification, applicationDeadline, status
            });

            if (req.file) {
                jobdata.image = req.file.path.replace(/\\/g, "/");
            }

            // Save employee into MongoDB
            const data = await jobdata.save();

            // Send success response
            return res.status(201).json({
                success: true,
                message: "job created successfully",
                data: data,
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    // GET ALL JOB

    async GetAllJob(req, res) {
        try {
            const data = await Job.find();
            return res.status(200).json({
                success: true, message: "All job fetched successfully",
                total: data.length,
                data: data
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // GET SINGLE JOB

        // GET SINGLE JOB

    async GetSingleJob(req, res) {
        try {
            const id = req.params.id;
            const getSingleData = await Job.findById(id);
            if (!getSingleData) {
                return res.status(404).json({
                    success: false,
                    message: "Job not found"
                });
            }
            return res.status(200).json({
                success: true,
                message: "Job fetched successfully",
                data: getSingleData
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }


    // UPDATE JOB
    async UpdateJob(req, res) {
        try {
            const id = req.params.id;
            const { title, description, companyName, location, salary, experience, employmentType, skills, qualification, applicationDeadline, status } = req.body;

            const updateData = {
                title, description, companyName,
                location, salary, experience,
                employmentType, skills,
                qualification, applicationDeadline,
                status
            };

            // Remove fields that were not sent
            Object.keys(updateData).forEach(
                (key) => updateData[key] === undefined && delete updateData[key]
            );

            // Save new image path if a file was uploaded
            if (req.file) {
                updateData.image = req.file.path.replace(/\\/g, "/");
            }

            const updatejob = await Job.findByIdAndUpdate(id, updateData, {
                new: true,
                runValidators: true
            });

            if (!updatejob) {
                return res.status(404).json({
                    success: false,
                    message: "Job not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Job updated successfully",
                data: updatejob
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // DELETE JOB

    async DeleteJob(req, res) {
        try {
            const id = req.params.id;
            const deletejob = await Job.findByIdAndDelete(id);
            if (!deletejob) {
                return res.status(404).json({
                    success: false,
                    message: "Job not found"
                });
            } return res.status(200).json({
                success: true, message: "Job deleted successfully",
                data: deletejob
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}


module.exports = new JobController();






