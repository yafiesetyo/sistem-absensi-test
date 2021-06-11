import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Template from "../../components/common/template";
import axios from "axios";

function convertDate(str: any) {
	var date = new Date(str),
		mnth = ("0" + (date.getMonth() + 1)).slice(-2),
		day = ("0" + date.getDate()).slice(-2),
		h = `${date.getHours() < 10 ? "0" : ""}${date.getHours()}`,
		m = `${date.getMinutes() < 10 ? "0" : ""}${date.getMinutes()}`;
	return `${date.getFullYear()}-${mnth}-${day} ${h}:${m}:00`;
}

function convertTime(str: any) {
	const date = new Date(str),
		h = `${date.getHours() < 10 ? "0" : ""}${date.getHours()}`,
		m = `${date.getMinutes() < 10 ? "0" : ""}${date.getMinutes()}`;
	return [h, m].join(":");
}

export default function Add() {
	const handleSubmit = async (values: any) => {
		const date = convertDate(values.date);
		const timeStart = convertTime(values.time_start);
		const start = convertTime(values.absence_start);
		const end = convertTime(values.absence_end);
		const payload = {
			name: values.name,
			date: date,
			absence_start: start,
			absence_end: end,
			time_start: timeStart,
		};

		try {
			await axios.post("/api/seminar/create", payload);
		} catch (error) {
			console.log(error.response.data);
		}
	};
	return (
		<Template title="Tambah Seminar Baru">
			<h1>Tambah Seminar Baru</h1>
			<Formik
				onSubmit={handleSubmit}
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
						<Field className="form-control" name="name" />
					</div>
					<div className="form-group">
						<label htmlFor="date">Tanggal Pelaksanaan</label>
						<div className="d-flex w-100">
							<Field name="date">
								{({ form, field }: any) => {
									const { setFieldValue } = form;
									const { value } = field;
									return (
										<DatePicker
											showTimeSelect
											selected={value}
											onChange={(val: any) => setFieldValue("date", val)}
											className="form-control"
											dateFormat="yyyy-MM-dd"
										/>
									);
								}}
							</Field>
						</div>
					</div>
					<div className="form-group">
						<label>Jam Mulai Seminar</label>
						<div className="d-flex w-100">
							<Field className="form-control" name="time_start">
								{({ form, field }: any) => {
									const { setFieldValue } = form;
									const { value } = field;
									return (
										<DatePicker
											showTimeSelect
											showTimeSelectOnly={true}
											selected={value}
											onChange={(val) => setFieldValue("time_start", val)}
											className="form-control"
											dateFormat="HH:mm"
										/>
									);
								}}
							</Field>
						</div>
					</div>
					<div className="form-group">
						<label>Jam Mulai Absensi</label>
						<div className="d-flex w-100">
							<Field className="form-control" name="absence_start">
								{({ form, field }: any) => {
									const { setFieldValue } = form;
									const { value } = field;
									return (
										<DatePicker
											showTimeSelect
											showTimeSelectOnly={true}
											selected={value}
											onChange={(val) => setFieldValue("absence_start", val)}
											className="form-control"
											dateFormat="HH:mm"
										/>
									);
								}}
							</Field>
						</div>
					</div>
					<div className="form-group">
						<label>Jam Selesai Absensi</label>
						<div className="d-flex w-100">
							<Field className="form-control" name="absence_end">
								{({ form, field }: any) => {
									const { setFieldValue } = form;
									const { value } = field;
									return (
										<DatePicker
											showTimeSelect
											showTimeSelectOnly={true}
											selected={value}
											onChange={(val) => setFieldValue("absence_end", val)}
											className="form-control"
											dateFormat="HH:mm"
										/>
									);
								}}
							</Field>
						</div>
					</div>
					<div className="my-3">
						<button className="btn btn-success">Tambah</button>
					</div>
				</Form>
			</Formik>
		</Template>
	);
}
