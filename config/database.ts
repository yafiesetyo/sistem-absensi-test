import { Sequelize } from "sequelize";

const sequelize = new Sequelize("taekwondo_jateng", "postgres", "password", {
	host: "127.0.0.1",
	port: 5433,
	dialect: "postgres",
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
});

sequelize
	.authenticate()
	.then(() => {
		console.log("database connected");
	})
	.catch((err) => console.log({ error: err }));

export default sequelize;
