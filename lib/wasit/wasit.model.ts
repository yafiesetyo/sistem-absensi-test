import { DataTypes } from "sequelize";
import db from "../../config/database";
import Absensi from "../absensi/absensi.model";

const Wasit = db.define(
	"refees",
	{
		fullname: {
			type: DataTypes.STRING(120),
			allowNull: false,
		},
		refresh_ref: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		city: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		sabuk: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		notes: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		status: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		edited_at: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		deleted_at: {
			type: DataTypes.DATE,
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

export default Wasit;
