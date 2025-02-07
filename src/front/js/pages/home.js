import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Card } from "../component/card";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="col-md">
			<div className="container-fluid">
				<h1>Productos nuevos</h1>
				<p>
				</p>
				<div className="row">
					<div className="col-12 col-md-4">
						<Card />
					</div>
					<div className="col-12 col-md-4">
						<Card />
					</div>
					<div className="col-12 col-md-4">
						<Card />
					</div>
				</div>
			</div>
		</div>
	);
};
