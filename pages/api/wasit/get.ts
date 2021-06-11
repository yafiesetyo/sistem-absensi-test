import type { NextApiRequest, NextApiResponse } from "next";
import { Get } from "../../../lib/wasit/wasit.controller";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === "GET") {
		await Get(req, res);
		return;
	}
	res.status(405).send("Method not supported !");
	return;
};
