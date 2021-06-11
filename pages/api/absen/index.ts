import type { NextApiRequest, NextApiResponse } from "next";
import { Absen } from "../../../lib/absensi/absensi.controller";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === "POST") {
		await Absen(req, res);
		return;
	}
	res.status(405).send("Method not supported !");
	return;
};
