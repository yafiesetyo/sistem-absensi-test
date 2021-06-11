import type { NextApiRequest, NextApiResponse } from "next";
import Wasit from "./wasit.model";
import Absensi from "../absensi/absensi.model";
import { WasitStatus } from "../../constants";

export const Create = async (req: NextApiRequest, res: NextApiResponse) => {
	const { fullname, city, sabuk, notes } = req.body;
	const status = WasitStatus.ACTIVE;
	try {
		await Wasit.create({
			fullname: fullname,
			city: city,
			sabuk: sabuk,
			notes: notes,
			status: status,
		});
		res.status(200).send("ok");
		return;
	} catch (error) {
		console.log(error);
		res.status(500).send(error.message);
		return;
	}
};

export const Get = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const data = await Wasit.findAll();
		res.status(200).json({ result: data });
	} catch (error) {
		res.status(500).send(error.message);
	}
};

export const GetActive = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const data = await Wasit.findAll({ where: { status: WasitStatus.ACTIVE } });
		res.status(200).json({ result: data });
	} catch (error) {
		res.status(500).send(error.message);
	}
};
