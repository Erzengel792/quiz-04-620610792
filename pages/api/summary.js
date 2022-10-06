export default function summaryRoute(req, res) {
  if (req.method === "GET") {
    //check authentication
    const user = checkToken(req);
    if (!user) {
      return res.status(403).json({ ok: false, message: "Permission denied" });
    }

    //compute DB summary
    const users = readUsersDB();
    let userCount, adminCount, totalMoney;
    for (const key of users) {
      if (key.isAdmin) {
        adminCount++;
      } else {
        userCount++;
        if (key.money > 0) {
          totalMoney += key.money;
        }
      }
    }
    //return response
    return res.json({ ok: true, userCount, adminCount, totalMoney });
  } else {
    return res.status(400).json({ ok: false, message: "Invalid HTTP Method" });
  }
}
