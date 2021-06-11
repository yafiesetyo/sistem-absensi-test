import type { NextApiRequest, NextApiResponse } from "next";
import { Add } from "../../../lib/seminar/seminar.controller";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === "POST") {
		await Add(req, res);
		return;
	}
	res.status(405).send("Method not supported !");
	return;
};
