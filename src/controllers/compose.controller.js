const db = require("./../configs/db");

const composeController = {
  getComposePage: (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      return res.redirect("/login");
    }

    db.query(
      "SELECT id, email FROM users WHERE id != ?",
      [userId],
      (err, results) => {
        if (err) {
          console.error("Error when querying the database:", err);
          return res.render("error", {
            message: "An error occurred, please try again later.",
          });
        }

        res.render("compose", { users: results, message: null });
      }
    );
  },

  postCompose: (req, res) => {
    const { receiverId, subject, body } = req.body;
    const senderId = req.session.userId;

    if (!senderId) {
      return res.redirect("/login");
    }

    db.query(
      "INSERT INTO emails (sender, receiver, subject, body, created_at) VALUES (?, ?, ?, ?, NOW())",
      [senderId, receiverId, subject, body],
      (err) => {
        if (err) {
          console.error("Lỗi khi gửi email:", err);
          return res.render("compose", {
            users: [],
            message: "An error occurred, please try again later.",
          });
        }

        res.redirect("/sent");
      }
    );
  },
};

module.exports = composeController;
