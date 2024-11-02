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
          console.error("Lỗi khi truy vấn cơ sở dữ liệu:", err);
          return res.render("error", {
            message: "Đã xảy ra lỗi, vui lòng thử lại sau.",
          });
        }

        res.render("sent", { emails: results });
      }
    );
  },
};

module.exports = sentController;
