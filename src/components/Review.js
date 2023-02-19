import { useState } from "react";
import ReviewForm from "./ReviewForm";
import Star from "./Star";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

function Review({ review, spot_id, handleReviewDelete, handleReviewUpdate }) {
	const [showReviewForm, setShowReviewForm] = useState(false);

	return (
		<div className="my-4 border-b">
			{!showReviewForm && (
				<>
					<div className="flex items-center gap-5 ite">
						<p className="font-bold text-lg my-3">{review.name}</p>

						<PencilSquareIcon
							onClick={(e) => setShowReviewForm(true)}
							className="h-6 w-6"
						/>
						<TrashIcon
							onClick={(e) => handleReviewDelete(review.id)}
							className="h-6 w-6"
						/>
					</div>
					<div className="flex items-center">
						{[...Array(5)].map((el, index) => (
							<Star key={index} fill={index < review.point} />
						))}
					</div>
					<p className="text-md">{review.comment}</p>
				</>
			)}
			{showReviewForm && (
				<ReviewForm
					spot_id={spot_id}
					action="update"
					review={review}
					setShowReviewForm={setShowReviewForm}
					handleReviewUpdate={handleReviewUpdate}
				/>
			)}
		</div>
	);
}

export default Review;
