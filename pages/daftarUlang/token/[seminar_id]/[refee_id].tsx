import React from "react";
import Head from "next/head";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { Formik, Field, Form } from "formik";
import axios from "axios";

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { seminar_id, refee_id } = context.query;
	let data,
		error = null;
	try {
		let response = await axios.get(
			"http://localhost:3000/api/absen/getToken/",
			{ params: { seminar_id, refee_id } }
		);
		data = response.data;
	} catch (error) {
		error = error.response.data;
	}

	return {
		props: { data, error },
	};
};

export default function Token({ data, error }: any) {
	console.log(data);
	return (
		<div className="container">
			<Head>
				<title>Token Absen Anda</title>
			</Head>
			<div
				className="d-flex justify-content-center align-items-center "
				style={{ height: "100vh" }}>
				<div className="text-center">
					<h1 style={{ fontWeight: "lighter" }}>
						Token Absen Anda (Jangan Lupa Di Simpan !)
					</h1>
					<h5 className="text-info" style={{ fontWeight: "bolder" }}>
						{data.result.token}
					</h5>
					<Link href="/absen">Kesini buat absen ya</Link>
				</div>
			</div>
		</div>
	);
}
