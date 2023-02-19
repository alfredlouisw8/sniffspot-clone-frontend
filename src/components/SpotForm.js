import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
	title: Yup.string()
		.min(2, "Too Short!")
		.max(50, "Too Long!")
		.required("Required"),
	description: Yup.string()
		.min(2, "Too Short!")
		.max(50, "Too Long!")
		.required("Required"),
	price: Yup.number().required("Required"),
	images: Yup.mixed(),
});

function SpotForm({ spot, action }) {
	const navigate = useNavigate();
	return (
		<Formik
			initialValues={{
				title: spot ? spot.title : "",
				description: spot ? spot.description : "",
				price: spot ? spot.price : "",
				images: spot ? spot.images : "",
			}}
			enableReinitialize={true}
			validationSchema={validationSchema}
			onSubmit={(values) => {
				// same shape as initial values

				const formData = new FormData();

				Object.keys(values).forEach((key) => {
					if (key === "images") {
						if (spot && spot.images !== values.images) {
							for (let i = 0; i < values[key].length; i++) {
								formData.append("spot[images][]", values[key][i]);
							}
						}
					} else {
						formData.append(`spot[${key}]`, values[key]);
					}
				});

				if (action === "create") {
					axios.post("/spots", formData);
					//navigate("/");
				} else if (action === "update") {
					axios.put("/spots/" + spot.id, formData);
					navigate("/spots/" + spot.id);
				}
			}}
		>
			{({ errors, touched, setFieldValue }) => (
				<Form>
					<div className="my-5">
						<label htmlFor="title" className="w-24 inline-block">
							Title
						</label>
						<Field name="title" className="border mx-5 p-2" />
						{errors.title && touched.title ? (
							<div className="text-red-500">{errors.title}</div>
						) : null}
					</div>
					<div className="my-5">
						<label htmlFor="description" className="w-24 inline-block">
							Description
						</label>
						<Field name="description" className="border mx-5 p-2" />
						{errors.description && touched.description ? (
							<div className="text-red-500">{errors.description}</div>
						) : null}
					</div>
					<div className="my-5">
						<label htmlFor="price" className="w-24 inline-block">
							Price
						</label>
						<Field name="price" className="border mx-5 p-2" />
						{errors.price && touched.price ? (
							<div className="text-red-500">{errors.price}</div>
						) : null}
					</div>
					<div className="my-5">
						<label htmlFor="images" className="w-24 inline-block">
							Images
						</label>
						<input
							name="images"
							type="file"
							multiple
							className="border mx-5 p-2"
							onChange={(event) => {
								setFieldValue("images", event.currentTarget.files);
							}}
						/>
						{errors.images && touched.images ? (
							<div className="text-red-500">{errors.images}</div>
						) : null}

						<div className="flex items-center gap-5">
							{spot &&
								spot.images &&
								spot.images.map((image) => (
									<img
										src={image.url}
										alt={image.filename}
										key={image.id}
										className="rounded-lg h-48 w-48 object-cover"
									/>
								))}
						</div>
					</div>
					<button type="submit" className="p-3 bg-blue-500 text-white rounded">
						Submit
					</button>
				</Form>
			)}
		</Formik>
	);
}

export default SpotForm;
