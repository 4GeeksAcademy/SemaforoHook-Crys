import React from "react";
import Titulo from "./Titulo";
import PaloSemaforo from "./PaloSemaforo";
import Footer from "./Footer";
import Semaforo from "./Semaforo"


//create your first component
const Home = () => {
	return (
		<div>
			<Titulo/>
			<PaloSemaforo/>
			<Semaforo/>
			<Footer/>
		</div>
	);
};

export default Home;