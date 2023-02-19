import SpotItem from "./SpotItem";

function SpotList({ spots, handleDelete }) {
	return (
		<main className="grid gap-8 grid-cols-3">
			{spots.map((spot) => (
				<SpotItem key={spot.id} spot={spot} handleDelete={handleDelete} />
			))}
		</main>
	);
}

export default SpotList;
