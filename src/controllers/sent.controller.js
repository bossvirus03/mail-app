const db = require("./../configs/db");

const sentController = {
  getSentPage: (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
      return res.redirect("/login");
    }

    db.query(
      "SELECT * FROM emails WHERE sender = ? ORDER BY created_at DESC",
      [userId],
      (err, results) => {
        if (err) {
          console.error("Error when querying the database:", err);
          return res.render("error", {
            message: "An error occurred, please try again later.",
          });
        }

        res.render("sent", { emails: results });
      }
    );
  },
};

module.exports = sentController;
