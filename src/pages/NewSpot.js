import axios from "axios";
import { Formik, Form, Field } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import SpotForm from "../components/SpotForm";

function NewSpot() {
	return (
		<>
			<SpotForm action="create" />
		</>
	);
}

export default NewSpot;
