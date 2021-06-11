import { DataTypes } from "sequelize";
import Seminar from "../seminar/seminar.model";
import Wasit from "../wasit/wasit.model";
import db from "../../config/database";

const Absensi = db.define(
	"absences",
	{
		seminar_id: {
			type: DataTypes.BIGINT,
			allowNull: false,
		},
		refee_id: {
			type: DataTypes.BIGINT,
			allowNull: false,
		},
		status: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		token: {
			type: DataTypes.STRING,
			allowNull: false,
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

Wasit.hasMany(Absensi, { foreignKey: "refee_id" });
Absensi.belongsTo(Wasit, { foreignKey: "refee_id" });

Seminar.hasMany(Absensi, { foreignKey: "seminar_id" });
Absensi.belongsTo(Seminar, { foreignKey: "seminar_id" });

export default Absensi;
