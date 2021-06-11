import React from "react";
import Link from "next/link";
import axios from "axios";
import { GetServerSideProps } from "next";

import Template from "../../components/common/template";
import { SeminarStatus } from "../../constants";

export const getServerSideProps: GetServerSideProps = async (context) => {
	let data,
		error = null;
	try {
		let response = await axios.get("http://localhost:3000/api/seminar/get");
		data = response.data;
	} catch (error) {
		error = error.response.data;
	}
	return {
		props: { data, error },
	};
};

export default function Index({ data }: any) {
	const handleStartSeminar = async (id: number) => {
		try {
			const response = await axios.post(`/api/seminar/update/${id}`, {
				status: SeminarStatus.STARTED,
			});
			console.log(response);
		} catch (error) {
			console.log(error.repsonse.data);
		}
	};
	return (
		<Template title="Seminar">
			<h1>Halo aku Page Utama Seminar</h1>
			<Link href="/seminar/add">
				<a className="btn btn-primary">Tambah Seminar</a>
			</Link>
			<table className="table caption-top">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Nama Seminar</th>
						<th scope="col">Tanggal</th>
						<th scope="col">Status</th>
						<th scope="col">Aksi</th>
					</tr>
				</thead>
				<tbody>
					{data &&
						data.result.length > 0 &&
						data.result.map((seminar: any, index: number) => {
							return (
								<tr key={index}>
									<th scope="row">{index + 1}</th>
									<td>{seminar.name}</td>
									<td>{seminar.date}</td>
									<td>
										{seminar.status === SeminarStatus.NEW && "Baru"}
										{seminar.status === SeminarStatus.STARTED &&
											"Telah Dimulai"}
										{seminar.status === SeminarStatus.FINISHED &&
											"Telah Berakhir"}
									</td>
									<td>
										<div className="d-flex">
											<div className="mx-2">
												<button className="btn btn-info">Detail</button>
											</div>
											<div className="mx-2">
												<Link href={`/seminar/edit/${seminar.id}`}>
													<a className="btn btn-warning">Edit</a>
												</Link>
											</div>
											<div className="mx-2">
												{seminar.status === SeminarStatus.NEW && (
													<button
														className="btn btn-danger"
														onClick={() => handleStartSeminar(seminar.id)}>
														Aktivasi Seminar
													</button>
												)}
											</div>
										</div>
									</td>
								</tr>
							);
						})}
				</tbody>
			</table>
		</Template>
	);
}
