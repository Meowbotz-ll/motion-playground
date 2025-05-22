"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function OrientationSquare() {
	const [orientation, setOrientation] = useState({
		alpha: 0,
		beta: 0,
		gamma: 0,
	});

	useEffect(() => {
		const handleOrientation = (
			event: DeviceOrientationEvent
		) => {
			setOrientation({
				alpha: event.alpha ?? 0,
				beta: event.beta ?? 0,
				gamma: event.gamma ?? 0,
			});
		};

		if (
			typeof window !== "undefined" &&
			"DeviceOrientationEvent" in window
		) {
			// Try to add listener immediately (works on Android)
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const requestPermission = (
				DeviceOrientationEvent as any
			).requestPermission;

			if (typeof requestPermission === "function") {
				// iOS: silently fail (no button)
				requestPermission()
					.then((response: string) => {
						if (response === "granted") {
							window.addEventListener(
								"deviceorientation",
								handleOrientation
							);
						}
					})
					.catch(() => {
						// Do nothing, or show warning if needed
					});
			} else {
				// Android / desktop: no permission needed
				window.addEventListener(
					"deviceorientation",
					handleOrientation
				);
			}
		}

		return () => {
			window.removeEventListener(
				"deviceorientation",
				handleOrientation
			);
		};
	}, []);

	const { alpha, beta, gamma } = orientation;

	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white text-black">
			<motion.div
				className="w-40 h-40 bg-blue-500 rounded-xl"
				animate={{
					rotateX: beta,
					rotateY: gamma,
					rotateZ: alpha,
				}}
				transition={{
					type: "spring",
					stiffness: 100,
					damping: 10,
				}}
				style={{ transformStyle: "preserve-3d" }}
			/>
			<div className="mt-8 text-center">
				<p>Alpha (Z): {alpha.toFixed(2)}°</p>
				<p>Beta (X): {beta.toFixed(2)}°</p>
				<p>Gamma (Y): {gamma.toFixed(2)}°</p>
			</div>
		</div>
	);
}
