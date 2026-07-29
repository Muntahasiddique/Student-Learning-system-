// auth.controller.js
function getsignup(req, res) {
    res.render("auth/signup", { title: "Signup" });
}

function signup(req, res) {
    // Handle POST /signup logic here
    res.send("Signup POST handler");
}

function getLogin(req, res) {
    res.render("auth/login", { title: "Login" });
}

function login(req, res) {
    // Handle POST /login logic here
    res.send("Login POST handler");
}

// Export all functions
module.exports = {
    getsignup,
    signup,   // <-- Make sure this is exported
    getLogin,
    login     // <-- Make sure this is exported
};