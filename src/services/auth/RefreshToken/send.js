module.exports = (res, token) => {
  res.cookie("jid", token, {
    httpOnly: true,
    path: "/",
    /// Must be set to Strict when deploying to the actual domain for security
    /// is set to None for heroku
    /// because heroku is a public domain, so cookie will not be set for subdomains
    /// read https://security.stackexchange.com/a/223477
    sameSite: "None",
    secure: true,
    // setting maxAge to 7 days
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};
