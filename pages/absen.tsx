import React from "react";
import { Formik, Field, Form } from "formik";

export default function Absen() {
	return (
		<div className="container">
			<h1>Absen Kehadiran</h1>
			<Formik
				onSubmit={() => {}}
				initialValues={{
					name: "",
					date: "",
					absence_start: "",
					absence_end: "",
					time_start: "",
				}}>
				<Form>
					<div className="form-group">
						<label>Nama Seminar</label>
						<Field className="form-select" name="seminar_id" as="select">
							<option>1</option>
							<option>2</option>
						</Field>
					</div>
					<div className="form-group">
						<label>Nama Wasit</label>
						<Field className="form-select" name="seminar_id" as="select">
							<option>1</option>
							<option>2</option>
						</Field>
					</div>

					<div className="my-3">
						<button className="btn btn-success">Absen</button>
					</div>
				</Form>
			</Formik>
		</div>
	);
}
