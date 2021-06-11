import React, { useState } from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";

import Template from "../../components/common/template";
import { Wasit } from "../../interfaces/wasit";
import axios from "axios";

export default function Add() {
	const handleSubmit = async (values: Wasit) => {
		try {
			const response = await axios.post("/api/wasit/create", values);
			console.log(response);
		} catch (error) {
			console.log(error.response.data);
		}
	};

	return (
		<Template title="Tambah Wasit Baru">
			<h1>Tambah Wasit Baru</h1>
			<Formik
				onSubmit={handleSubmit}
				initialValues={{
					fullname: "",
					city: "",
					sabuk: "",
					notes: "",
				}}>
				<Form>
					<div className="form-group">
						<label>Nama</label>
						<Field className="form-control" name="fullname" />
					</div>
					<div className="form-group">
						<label>Kota</label>
						<Field className="form-control" name="city" />
					</div>
					<div className="form-group">
						<label>Sabuk</label>
						<Field className="form-control" name="sabuk" />
					</div>
					<div className="form-group">
						<label>Catatan</label>
						<Field className="form-control" name="notes" as="textarea" />
					</div>
					<div className="my-3">
						<button className="btn btn-success" type="submit">
							Tambah
						</button>
					</div>
				</Form>
			</Formik>
		</Template>
	);
}
