import { PencilSquareIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import Review from "../components/Review";
import ReviewForm from "../components/ReviewForm";
import SliderArrow from "../components/SliderArrow";
import { NO_IMAGE_URL } from "../helper/consts";

function SpotDetail() {
	let { id } = useParams();
	const [spot, setSpot] = useState(null);
	const [reviews, setReviews] = useState(null);
	const [showReviewForm, setShowReviewForm] = useState(false);

	const settings = {
		infinite: true,
		lazyLoad: true,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	async function getSpotDetail() {
		axios
			.get("/spots/" + id)
			.then((response) => {
				setSpot(response.data);
				setReviews(response.data.reviews);
			})
			.catch((error) => console.log(error));
	}

	function handleReviewCreate(newReview) {
		setReviews([...reviews, newReview]);
	}

	function handleReviewUpdate(updatedReview) {
		const newReviews = reviews.map((review) => {
			if (review.id === updatedReview.id) {
				return { ...updatedReview };
			}
			return review;
		});
		setReviews(newReviews);
	}

	function handleReviewDelete(deletedReviewId) {
		axios
			.delete(`/spots/${spot.id}/reviews/${deletedReviewId}`)
			.catch((error) => console.log(error));

		setReviews(reviews.filter((review) => review.id != deletedReviewId));
	}

	useEffect(() => {
		getSpotDetail();
	}, []);

	return (
		<>
			{spot && (
				<div>
					<div className="flex items-center gap-5">
						<p className="text-2xl my-4">{spot.title}</p>
						<Link to={`/spots/${spot.id}/edit`}>
							<PencilSquareIcon className="h-6 w-6" />
						</Link>
					</div>
					<div className="my-4">
						<div className="flex items-center gap-5">
							{spot.images &&
								spot.images.map((image) => (
									<img
										src={image.url}
										alt={image.filename}
										key={image.id}
										className="rounded-lg h-48 w-48 object-cover"
									/>
								))}
							{!spot.images && (
								<img
									src={NO_IMAGE_URL}
									alt={spot.title}
									className="object-cover h-48 w-48 rounded-lg"
								/>
							)}
						</div>
					</div>
					<p className="text-xl text-gray-600 my-4">{spot.title}</p>
					<p className="text-lg text-gray-500 my-4">{spot.description}</p>
					<p className="text-lg text-black my-4">${spot.price}</p>

					<button
						type="button"
						className="bg-blue-500 p-3 text-white rounded"
						onClick={(e) => setShowReviewForm(!showReviewForm)}
					>
						Add Review
					</button>

					{showReviewForm && (
						<ReviewForm
							spot_id={spot.id}
							setShowReviewForm={setShowReviewForm}
							action="create"
							handleReviewCreate={handleReviewCreate}
						/>
					)}

					<p className="text-xl">Reviews</p>

					{reviews.map((review) => (
						<Review
							review={review}
							key={review.id}
							spot_id={spot.id}
							handleReviewUpdate={handleReviewUpdate}
							handleReviewDelete={handleReviewDelete}
						/>
					))}
				</div>
			)}
		</>
	);
}

export default SpotDetail;
