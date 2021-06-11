import type { NextApiRequest, NextApiResponse } from "next";
import { Create } from "../../../lib/wasit/wasit.controller";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === "POST") {
		await Create(req, res);
		return;
	}
	res.status(405).send("Method not supported !");
	return;
};
