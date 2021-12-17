module.exports = (res, token) => {
  res.cookie("jid", token, {
    httpOnly: true,
    path: "/",
    sameSite: "None",
    secure: true,
  });
};
