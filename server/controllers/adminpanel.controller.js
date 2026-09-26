const userModel = require("../models/user.model");
const courseModel = require("../models/course.model");

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await userModel.countDocuments();
    const totalCourses = await courseModel.countDocuments();
    
    return res.status(200).json({ 
      totalUsers, 
      totalCourses 
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    return res.status(500).json({ message: "Failed to fetch dashboard statistics." });
  }
};

module.exports = { getDashboardStats };