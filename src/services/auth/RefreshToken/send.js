module.exports = (res, token) => {
  res.cookie("jid", token, {
    httpOnly: true,
    path: "/api/refresh-token",
  });
};
