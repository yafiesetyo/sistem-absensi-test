import { DataTypes } from "sequelize";
import db from "../../config/database";
import Absensi from "../absensi/absensi.model";

const Seminar = db.define(
	"seminars",
	{
		name: {
			type: DataTypes.STRING(120),
			allowNull: false,
		},
		date: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		absence_start: {
			type: DataTypes.TIME,
			allowNull: false,
		},
		absence_end: {
			type: DataTypes.TIME,
			allowNull: false,
		},
		status: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		time_start: {
			type: DataTypes.TIME,
			allowNull: true,
		},
	},
	{
		// don't add the timestamp attributes (updatedAt, createdAt)
		timestamps: false,

		// If don't want createdAt
		createdAt: false,

		// If don't want updatedAt
		updatedAt: false,

		// your other configuration here
	}
);

export default Seminar;
