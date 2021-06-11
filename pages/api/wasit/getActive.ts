import type { NextApiRequest, NextApiResponse } from "next";
import { GetActive } from "../../../lib/wasit/wasit.controller";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === "GET") {
		await GetActive(req, res);
		return;
	}
	res.status(405).send("Method not supported !");
	return;
};
