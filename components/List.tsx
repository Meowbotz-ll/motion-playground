"use client";
import React, { useEffect, useRef } from "react";
import {
	useScroll,
	motion,
	useAnimate,
} from "motion/react";
function List() {
	const { scrollYProgress } = useScroll();
	const ref = useRef(null);
	const [scope, animate] = useAnimate();
	useEffect(() => {
		animate("li", { opacity: 1 }, { duration: 0.5 });
	});
	return (
		<div className="flex w-full h-full relative">
			<motion.div
				style={{ scaleX: scrollYProgress }}
				className="w-full fixed bg-red-500 h-2 top-0 z-10 origin-left"
			></motion.div>
			<ul ref={scope} className="space-y-4 w-full">
				{Array.from({ length: 100 }).map((_, i) => (
					<motion.li
						initial={{ opacity: 0, y: 100 }}
						whileInView={{ opacity: 1, y: 0 }}
						key={i}
						className="w-full h-20 bg-red-300 "
					></motion.li>
				))}
			</ul>
		</div>
	);
}

export default List;
