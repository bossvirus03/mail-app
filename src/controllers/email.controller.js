const db = require("./../configs/db");

const emailController = {
  deleteEmail: (req, res) => {
    const emailId = req.params.id;

    db.query("DELETE FROM emails WHERE id = ?", [emailId], (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Database query error" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Email does not exist" });
      }

      res.json({ message: "The email has been successfully deleted" });
    });
  },
  getEmailDetail: (req, res) => {
    const emailId = req.params.id;

    const query = `SELECT emails.*, users.fullname AS senderName 
                   FROM emails 
                   JOIN users ON emails.sender = users.id 
                   WHERE emails.id = ?`;

    db.query(query, [emailId], (err, results) => {
      if (err) {
        return res.status(500).send("Database query error");
      }

      if (results.length === 0) {
        return res.status(404).send("Email does not exist");
      }

      const email = results[0];
      res.render("emailDetail", { email });
    });
  },
};

module.exports = emailController;
