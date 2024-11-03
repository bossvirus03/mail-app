const db = require("../configs/db");

const authController = {
  getLoginPage: (req, res) => {
    res.render("login", { message: null });
  },

  getRegisterPage: (req, res) => {
    res.render("register", { message: null });
  },

  postLogin: (req, res) => {
    const { email, password } = req.body;

    db.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password],
      (err, results) => {
        if (err) {
          console.error("Database query error:", err);
          return res
            .status(500)
            .send("An error occurred, please try again later.");
        }

        if (results.length > 0) {
          req.session.userId = results[0].id;
          const authToken = "true";
          res.cookie("isAuth", authToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
          });

          res.redirect("/inbox");
        } else {
          res.render("login", { message: "Email or password is incorrect" });
        }
      }
    );
  },
  postRegister: (req, res) => {
    const { fullname, email, password, confirmPassword } = req.body;

    if (!fullname || !email || !password || !confirmPassword) {
      return res.render("register", {
        message: "All fields are required",
      });
    }

    if (password.length < 6) {
      return res.render("register", {
        message: "Password needs at least 6 characters",
      });
    }

    if (password !== confirmPassword) {
      return res.render("register", {
        message: "Re-entered password does not match!",
      });
    }

    db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
      if (err) return res.status(500).send("Database error");

      if (results.length > 0) {
        return res.render("register", { message: "Email already exists!" });
      }

      db.query(
        "INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)",
        [fullname, email, password],
        (err) => {
          if (err) return res.status(500).send("Database error");
          res.render("login", {
            message: "Registered successfully! Please log in",
          });
        }
      );
    });
  },

  logout: (req, res) => {
    res.clearCookie("isAuth");
    res.redirect("/login");
  },
};

module.exports = authController;
