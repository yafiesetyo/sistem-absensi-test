import React from "react";
import Link from "next/link";
import styled from "styled-components";

import Template from "../../components/common/template";

export default function Index() {
	return (
		<Template title="Seminar">
			<h1>Halo aku Page Utama Wasit</h1>
			<Link href="/wasit/add">
				<a className="btn btn-primary">Tambah Wasit</a>
			</Link>
			<table className="table caption-top">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Nama</th>
						<th scope="col">Kota</th>
						<th scope="col">Terakhir Seminar</th>
						<th scope="col">Status</th>
						<th scope="col">Aksi</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row">1</th>
						<td>Mark</td>
						<td>Otto</td>
						<td>Mark</td>
						<td>Otto</td>
						<td>
							<div className="d-flex">
								<div className="mx-2">
									<button className="btn btn-info">Detail</button>
								</div>
								<div className="mx-2">
									<button className="btn btn-warning">Edit</button>
								</div>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</Template>
	);
}
