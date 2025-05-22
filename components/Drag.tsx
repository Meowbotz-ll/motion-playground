"use client";
import React from "react";
import { motion, useDragControls } from "motion/react";
function Drag() {
	const controls = useDragControls();
	return (
		<div>
			<motion.div
				drag="y"
				dragConstraints={{ top: -120, bottom: 120 }}
				dragControls={controls}
				className="size-100 bg-teal-400"
			></motion.div>
			<button
				onPointerDown={(e) =>
					controls.start(e, { snapToCursor: false })
				}
				className="p-4 rounded-3xl bg-amber-300"
			>
				Press me
			</button>
		</div>
	);
}

export default Drag;
