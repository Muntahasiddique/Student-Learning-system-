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

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({}).select('-password');
    return res.status(200).json(users);
  } catch (error) {
    console.error("Fetch Users Error:", error);
    return res.status(500).json({ message: "Failed to fetch users." });
  }
};

const getAllCourses = async (req, res) => {
  try {
    // Fetch all courses. We use populate to grab the instructor's actual name, not just their ID.
    const courses = await courseModel.find({}).populate('instructor', 'name email');
    return res.status(200).json(courses);
  } catch (error) {
    console.error("Admin Fetch Courses Error:", error);
    return res.status(500).json({ message: "Failed to fetch courses." });
  }
};
const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCourse = await courseModel.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found." });
    }

    return res.status(200).json({ message: "Course deleted successfully." });
  } catch (error) {
    console.error("Admin Delete Course Error:", error);
    return res.status(500).json({ message: "Failed to delete course." });
  }
};
const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    // { new: true } returns the updated document instead of the old one
    const updatedCourse = await courseModel.findByIdAndUpdate(id, req.body, { new: true }).populate('instructor', 'name email');
    
    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found." });
    }

    return res.status(200).json(updatedCourse);
  } catch (error) {
    console.error("Admin Update Course Error:", error);
    return res.status(500).json({ message: "Failed to update course." });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await userModel.findByIdAndUpdate(id, req.body, { new: true }).select('-password');
    
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Admin Update User Error:", error);
    return res.status(500).json({ message: "Failed to update user." });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find the user first to check their role
    const userToDelete = await userModel.findById(id);
    if (!userToDelete) {
      return res.status(404).json({ message: "User not found." });
    }

    // SAFETY GUARD: Prevent deleting teachers or admins
    if (userToDelete.role === 'teacher' || userToDelete.role === 'admin' || userToDelete.role === 'Teacher' || userToDelete.role === 'Admin') {
      return res.status(403).json({ message: "Action prohibited: Cannot suspend a teacher or administrator." });
    }

    await userModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "User suspended successfully." });
  } catch (error) {
    console.error("Admin Delete User Error:", error);
    return res.status(500).json({ message: "Failed to suspend user." });
  }
};
module.exports = { getDashboardStats, getAllUsers, getAllCourses , deleteCourse ,updateCourse , updateUser , deleteUser };