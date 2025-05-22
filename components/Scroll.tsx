"use client";
import React, { useEffect, useRef } from "react";
import { useScroll, motion, useSpring } from "motion/react";
function Scroll() {
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end end"],
	});
	useEffect(() => {
		console.log(
			"scrollYProgress",
			scrollYProgress.hasAnimated.valueOf()
		);
	}, [scrollYProgress.hasAnimated.valueOf()]);
	return (
		<div className="flex w-full h-full relative">
			<motion.div
				style={{ scaleX: scrollYProgress }}
				className="w-full fixed bg-red-500 h-2 top-0 z-10 origin-left"
			></motion.div>
			<div className="space-y-4">
				<div className="size-150 bg-red-300 "></div>
				<div className="size-150 bg-red-300 "></div>
				<div className="size-150 bg-red-300 "></div>
				<div
					ref={ref}
					className="size-150 bg-teal-300 "
				></div>
				<div className="size-150 bg-red-300 "></div>
			</div>
		</div>
	);
}

export default Scroll;
