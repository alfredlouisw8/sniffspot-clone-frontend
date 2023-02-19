import { TrashIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { NO_IMAGE_URL } from "../helper/consts";
import SliderArrow from "./SliderArrow";
import Star from "./Star";

function SpotItem({ spot, handleDelete }) {
	const settings = {
		infinite: true,
		lazyLoad: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		nextArrow: <SliderArrow direction="right" />,
		prevArrow: <SliderArrow direction="left" />,
	};

	function calculateReviewAvg() {
		if (spot.reviews.length === 0) {
			return 0;
		}
		const points = spot.reviews.map((review) => review.point);
		return parseFloat(
			points.reduce((a, b) => a + b, 0) / points.length
		).toFixed(1);
	}

	return (
		<div className="w-full">
			<Link to={`/spots/${spot.id}`}>
				{spot.images && (
					<Slider {...settings}>
						{spot.images.map((image) => (
							<div key={image.id} className="rounded-lg overflow-hidden h-56">
								<img
									src={image.url}
									alt={image.filename}
									className="object-cover object-center rounded-lg m-auto"
								/>
							</div>
						))}
					</Slider>
				)}
				{!spot.images && (
					<div className="rounded-lg object-cover">
						<img
							src={NO_IMAGE_URL}
							alt={spot.title}
							className="object-cover object-center"
						/>
					</div>
				)}
			</Link>
			<div className="flex items-center gap-5">
				<Link to={`/spots/${spot.id}`}>
					<p className="text-sm text-gray-600">{spot.title}</p>
				</Link>
				<TrashIcon className="w-5 h-5" onClick={() => handleDelete(spot.id)} />
			</div>

			<p className="text-xs text-gray-500">{spot.description}</p>

			<div className="flex justify-between items-center">
				<p className="text-sm text-gray-600">
					<span className="text-md font-bold text-black">${spot.price}</span>{" "}
					dog/hour
				</p>
				<div className="flex items-center">
					<Star fill />
					<p>{calculateReviewAvg()}</p>
					<p>({spot.reviews.length})</p>
				</div>
			</div>
		</div>
	);
}

export default SpotItem;
