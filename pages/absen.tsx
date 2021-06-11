import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { Formik, Field, Form } from "formik";
import axios from "axios";

export const getServerSideProps: GetServerSideProps = async (context) => {
	let data,
		seminar,
		wasit,
		error = null;
	try {
		let response = await axios.get(
			"http://localhost:3000/api/seminar/get?absence=true"
		);
		seminar = response.data;
	} catch (error) {
		error = error.response.data;
	}

	try {
		let response = await axios.get("http://localhost:3000/api/wasit/getActive");
		wasit = response.data;
		data = { seminar, wasit };
	} catch (error) {
		error = error.response.data;
	}

	return {
		props: { data, error },
	};
};

export default function Absen({ data, error }: any) {
	const handleSubmit = async (values: any) => {
		try {
			const response = await axios.post("/api/absen", values);
			console.log(response.data);
		} catch (error) {
			console.log(error.response.data);
		}
	};

	return (
		<div className="container">
			<Head>
				<title>Absen</title>
			</Head>
			<h1>Absen Kehadiran</h1>
			<Formik
				onSubmit={handleSubmit}
				initialValues={{
					seminar_id: data.seminar.result[0].id,
					refee_id: data.wasit.result[0].id,
					token: "",
				}}>
				<Form>
					<div className="form-group">
						<label>Nama Seminar</label>
						<Field className="form-select" name="seminar_id" as="select">
							{!error &&
								data &&
								data.seminar &&
								data.seminar.result.length > 0 &&
								data.seminar.result.map((seminar: any, index: number) => {
									return (
										<option value={seminar.id} key={index}>
											{seminar.name}
										</option>
									);
								})}
						</Field>
					</div>
					<div className="form-group">
						<label>Nama Wasit</label>
						<Field className="form-select" name="refee_id" as="select">
							{!error &&
								data &&
								data.wasit &&
								data.wasit.result.length > 0 &&
								data.wasit.result.map((wasit: any, index: number) => {
									return (
										<option value={wasit.id} key={index}>
											{wasit.fullname}
										</option>
									);
								})}
						</Field>
					</div>
					<div className="form-group">
						<label>Token Absen</label>
						<Field className="form-control" name="token" />
					</div>

					<div className="my-3">
						<button className="btn btn-success">Absen</button>
					</div>
				</Form>
			</Formik>
		</div>
	);
}
