module.exports = (res, token) => {
  res.cookie("jid", token, {
    httpOnly: true,
    path: "/refresh_token",
  });
};
