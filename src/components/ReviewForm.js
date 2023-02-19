import axios from "axios";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
	name: Yup.string()
		.min(2, "Too Short!")
		.max(50, "Too Long!")
		.required("Required"),
	comment: Yup.string()
		.min(2, "Too Short!")
		.max(100, "Too Long!")
		.required("Required"),
	point: Yup.number()
		.min(1, "Min is 0")
		.max(5, "Max is 5")
		.required("Required"),
});

function ReviewForm({
	spot_id,
	setShowReviewForm,
	method,
	review,
	handleReviewUpdate,
	handleReviewCreate,
}) {
	return (
		<>
			<Formik
				initialValues={{
					name: review ? review.name : "",
					comment: review ? review.comment : "",
					point: review ? review.point : "",
				}}
				validationSchema={validationSchema}
				onSubmit={async (values, { resetForm }) => {
					// same shape as initial values
					let newReview;
					if (action === "create") {
						newReview = await axios.post(`/spots/${spot_id}/reviews`, values);
						handleReviewCreate(newReview.data);
					} else if (action === "update") {
						newReview = await axios.put(
							`/spots/${spot_id}/reviews/${review.id}`,
							values
						);
						handleReviewUpdate(newReview.data);
					}

					resetForm();
					setShowReviewForm(false);
				}}
			>
				{({ errors, touched, isSubmitting, resetForm }) => (
					<Form>
						<div className="my-5">
							<label htmlFor="name" className="w-24 inline-block">
								Name
							</label>
							<Field name="name" className="border mx-5 p-2" />
							{errors.name && touched.name ? (
								<div className="text-red-500">{errors.name}</div>
							) : null}
						</div>
						<div className="my-5">
							<label htmlFor="point" className="w-24 inline-block">
								Point
							</label>
							<Field name="point" className="border mx-5 p-2" />
							{errors.point && touched.point ? (
								<div className="text-red-500">{errors.point}</div>
							) : null}
						</div>
						<div className="my-5">
							<label htmlFor="comment" className="w-24 inline-block">
								Comment
							</label>
							<Field name="comment" className="border mx-5 p-2" />
							{errors.comment && touched.comment ? (
								<div className="text-red-500">{errors.comment}</div>
							) : null}
						</div>

						<button
							type="button"
							className="p-3 bg-blue-500 text-white rounded mr-4"
							onClick={(e) => {
								e.preventDefault();
								setShowReviewForm(false);
							}}
						>
							Cancel
						</button>
						<button
							type="submit"
							className="p-3 bg-blue-500 text-white rounded"
							disabled={isSubmitting}
						>
							Submit
						</button>
					</Form>
				)}
			</Formik>
		</>
	);
}

export default ReviewForm;
