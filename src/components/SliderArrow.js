function SliderArrow(props) {
	const { className, style, onClick, direction } = props;

	style[direction] = "10px";

	return (
		<div
			className={className}
			style={{
				...style,
				display: "block",
				opacity: 0.8,
				zIndex: 1,
			}}
			onClick={onClick}
		/>
	);
}

export default SliderArrow;
