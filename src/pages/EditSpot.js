import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SpotForm from "../components/SpotForm";

function EditSpot() {
	const { id } = useParams();

	const [spot, setSpot] = useState(null);

	async function getSpot() {
		axios
			.get("/spots/" + id)
			.then((response) => setSpot(response.data))
			.catch((error) => console.log(error));
	}

	useEffect(() => {
		getSpot();
	}, []);
	return <SpotForm action="update" spot={spot} />;
}

export default EditSpot;
