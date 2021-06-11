import type { NextApiRequest, NextApiResponse } from "next";
import moment from "moment";
import { Op } from "sequelize";

import { SeminarStatus, AbsenceStatus, WasitStatus } from "../../constants";
import Seminar from "../seminar/seminar.model";
import Wasit from "../wasit/wasit.model";
import Absensi from "./absensi.model";

export const GetAbsenceToken = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	const { seminar_id, refee_id } = req.query;
	if (!seminar_id || !refee_id) {
		res.status(400).send("bad request");
		return;
	}
	const data = await Absensi.findOne({
		where: { [Op.and]: [{ seminar_id: seminar_id }, { refee_id: refee_id }] },
		include: Wasit,
	}).catch((err) => {
		res.status(500).send(err.message);
		return;
	});
	res.status(200).json({ result: data });
};

export const DaftarUlang = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	const { refee_id, seminar_id } = req.body;
	if (!refee_id || !seminar_id) {
		res.status(400).send("bad request");
		return;
	}

	try {
		await Absensi.update(
			{ status: AbsenceStatus.PENDING },
			{
				where: {
					[Op.and]: [{ refee_id: refee_id }, { seminar_id: seminar_id }],
				},
			}
		);
		res.status(200).send("ok");
	} catch (error) {
		res.status(500).send(error.message);
		return;
	}
};

export const Absen = async (req: NextApiRequest, res: NextApiResponse) => {
	const { refee_id, seminar_id, token } = req.body;

	if (!refee_id || !seminar_id) {
		res.status(400).send("bad request");
		return;
	}
	const seminar = await Seminar.findOne({ where: { id: seminar_id } }).catch(
		(err) => {
			res.status(500).send(err.message);
		}
	);

	const absen = await Absensi.findOne({
		where: {
			[Op.and]: [
				{
					token: token,
				},
				{ seminar_id: seminar_id },
				{ refee_id: refee_id },
			],
		},
	}).catch((err) => {
		res.status(500).send(err.message);
	});

	if (!absen) {
		res.status(404).send("token yang anda masukkan salah !");
		return;
	}

	//Date comparison
	const now = moment();
	const date = moment(seminar.date),
		y = date.year(),
		m = `${date.month() < 10 ? "0" : ""}${date.month()}`,
		d = `${date.month() < 10 ? "0" : ""}${date.month()}`;
	const absenceStart = moment(`${y}-${m}-${d}T${seminar.absence_start}`);
	const absenceEnd = moment(`${y}-${m}-${d}T${seminar.absence_start}`);

	if (now < absenceStart) {
		res.status(403).send("absen belum dibuka");
		return;
	}

	if (now > absenceEnd) {
		res.status(403).send("absen sudah ditutup");
		return;
	}
	await Absensi.update(
		{ status: AbsenceStatus.PRESENT },
		{
			where: {
				[Op.and]: [{ refee_id: refee_id }, { seminar_id: seminar_id }],
			},
		}
	).catch((err) => {
		res.status(500).send(err.message);
		return;
	});
	res.status(200).json({ result: seminar });
	// try {
	// 	await Absensi.update(
	// 		{ status: AbsenceStatus.PRESENT },
	// 		{ where: { refee_id: refee_id } }
	// 	);
	// 	res.status(200).send("ok");
	// } catch (error) {}
};
