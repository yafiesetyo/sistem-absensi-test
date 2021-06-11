import React from "react";
import Link from "next/link";
import Head from "next/head";

type Props = {
	title: string;
};

const Template: React.FC<Props> = ({ children, title }) => {
	return (
		<div className="container">
			{/* Navbar */}
			<Head>
				<title>{title}</title>
			</Head>
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<div className="container-fluid">
					<a className="navbar-brand" href="#">
						Navbar
					</a>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarNav"
						aria-controls="navbarNav"
						aria-expanded="false"
						aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav">
							<li className="nav-item">
								<Link href="/seminar">
									<a className="nav-link active" aria-current="page">
										Seminar
									</a>
								</Link>
							</li>
							<li className="nav-item">
								<Link href="/wasit">
									<a className="nav-link">Wasit</a>
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
			<div>{children}</div>
		</div>
	);
};

export default Template;
