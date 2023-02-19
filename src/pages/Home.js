import axios from "axios";
import { useEffect, useState } from "react";
import SpotList from "../components/SpotList";

function Home() {
	const [spots, setSpots] = useState([]);
	const [sort, setSort] = useState("asc");

	async function getSpots() {
		axios
			.get(`/spots?sort=${sort}`)
			.then((response) => {
				setSpots(response.data);
			})
			.catch((error) => console.log(error));
	}

	function handleDelete(deletedSpotId) {
		axios
			.delete(`/spots/${deletedSpotId}`)
			.catch((error) => console.log(error));

		setSpots(spots.filter((spot) => spot.id != deletedSpotId));
	}

	useEffect(() => {
		getSpots();
	}, [sort]);

	return (
		<>
			<h1 className="text-3xl mb-8">
				Popular private dog parks near Seattle, Washington
			</h1>
			<div className="flex items-center my-5">
				<p>Sort by price:</p>
				<select onChange={(e) => setSort(e.target.value)}>
					<option value="asc">Ascending</option>
					<option value="desc">Descending</option>
				</select>
			</div>

			<SpotList spots={spots} handleDelete={handleDelete} />
		</>
	);
}
export default Home;
