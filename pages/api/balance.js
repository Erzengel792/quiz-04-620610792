import { checkToken } from "../../backendLibs/checkToken";
import { readUsersDB } from "../../backendLibs/dbLib";

export default function balanceRoute(req, res) {
  if (req.method === "GET") {
    //check authentication
    const user = checkToken(req);
    if (!user) {
      return res
        .status(403)
        .json({
          ok: false,
          message: "You do not have permission to check balance",
        });
    }
    const users = readUsersDB();
    //find user in DB and get their money value
    const value = users.map((x) => {
      return { money: x.money };
    });
    //return response
    return res.status(200).json({ ok: true, money: value });
  } else {
    return res.status(400).json({ ok: false, message: "Invalid HTTP Method" });
  }
}
