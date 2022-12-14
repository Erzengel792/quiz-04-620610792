export default function withdrawRoute(req, res) {
  if (req.method === "PUT") {
    //check authentication
    const user = checkToken(req);
    if (!user) {
      return res
        .status(403)
        .json({ ok: false, message: "You do not have permission to withdraw" });
    }

    const amount = req.body.amount;
    //validate body
    if (typeof amount !== "number")
      return res.status(400).json({ ok: false, message: "Invalid amount" });

    //check if amount < 1
    if (amount < 1)
      return res
        .status(400)
        .json({ ok: false, message: "Amount must be greater than 0" });

    //find and update money in DB (if user has enough money)
    const users = readUsersDB();
    const found = users.find((x) => x.username === user.username);
    if (amount > found.money)
      return res
        .status(400)
        .json({ ok: false, message: "You do not has enough money" });

    foundUser.money -= amount;
    writeUsersDB(users);
    //return response
    return res.json({ ok: true, money: found.money });
  } else {
    return res.status(400).json({ ok: false, message: "Invalid HTTP Method" });
  }
}
