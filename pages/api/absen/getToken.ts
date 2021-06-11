import type { NextApiRequest, NextApiResponse } from "next";
import { GetAbsenceToken } from "../../../lib/absensi/absensi.controller";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === "GET") {
		await GetAbsenceToken(req, res);
		return;
	}
	res.status(405).send("Method not supported !");
	return;
};
