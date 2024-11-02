function authMiddleware(req, res, next) {
  const authToken = req.cookies.isAuth;

  if (!authToken) {
    if (req.path !== "/login" && req.path !== "/register") {
      return res.redirect("/login");
    }
  } else {
    if (req.path === "/login" || req.path === "/register") {
      return res.redirect("/inbox");
    }
  }

  next();
}

module.exports = authMiddleware;
