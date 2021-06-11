import type { NextApiRequest, NextApiResponse } from "next";

import { SeminarStatus, AbsenceStatus } from "../../constants";
import Seminar from "./seminar.model";
import Wasit from "../wasit/wasit.model";
import Absensi from "../absensi/absensi.model";
import { Op } from "sequelize/types";

export const Add = async (req: NextApiRequest, res: NextApiResponse) => {
	let seminarId: any;
	let absenceData: any = [];
	const status = SeminarStatus.NEW; // seminar status
	const absenceStatus = AbsenceStatus.NEW; //absen status
	const { name, date, absence_start, absence_end, time_start } = req.body;

	//insert seminar data
	try {
		const seminar = await Seminar.create({
			name,
			date,
			absence_start,
			absence_end,
			status,
			time_start,
		});
		seminarId = seminar.id;
	} catch (error) {
		res.status(500).send(error.message);
		return;
	}

	//get all wasit data
	try {
		const wasit = await Wasit.findAll();
		wasit.map((wasit) => {
			const token = Math.random().toString(36).substring(7);
			absenceData.push({
				seminar_id: seminarId,
				refee_id: wasit.id,
				status: absenceStatus,
				token: token,
			});
		});
		await Promise.all(absenceData);
	} catch (error) {
		res.status(500).send(error.message);
		return;
	}

	//insert to absensi
	try {
		await Absensi.bulkCreate(absenceData, {
			fields: ["seminar_id", "refee_id", "status", "token"],
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
	const { id, absence } = req.query;
	if (id) {
		try {
			const data = await Seminar.findOne({
				where: {
					id: id,
				},
				include: { model: Absensi, include: Wasit },
			});
			res.status(200).json({ result: data });
			return;
		} catch (error) {
			res.status(500).send(error.message);
			return;
		}
	}

	if (absence && absence === "true") {
		try {
			const data = await Seminar.findAll({
				where: {
					status: SeminarStatus.STARTED,
				},
				include: { model: Absensi, include: Wasit },
			});
			res.status(200).json({ result: data });
			return;
		} catch (error) {
			res.status(500).send(error.message);
			return;
		}
	}

	try {
		const data = await Seminar.findAll({
			include: { model: Absensi, include: Wasit },
		});
		res.status(200).json({ result: data });
	} catch (error) {
		res.status(500).send(error.message);
	}
};

export const Update = async (req: NextApiRequest, res: NextApiResponse) => {
	const { id } = req.query;
	const data = req.body;
	if (!id) {
		res.status(400).send("bad request");
		return;
	}
	try {
		await Seminar.update(data, { where: { id: id } });
		res.status(200).send("ok");
	} catch (error) {
		res.status(500).send(error.message);
	}
};
