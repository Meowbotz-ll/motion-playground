"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function OrientationSquare() {
	const [orientation, setOrientation] = useState({
		alpha: 0,
		beta: 0,
		gamma: 0,
	});
	const [permissionGranted, setPermissionGranted] =
		useState(false);

	const handleOrientation = (
		event: DeviceOrientationEvent
	) => {
		setOrientation({
			alpha: event.alpha ?? 0,
			beta: event.beta ?? 0,
			gamma: event.gamma ?? 0,
		});
	};

	const enableOrientation = async () => {
		if (
			typeof DeviceOrientationEvent !== "undefined" &&
			typeof DeviceOrientationEvent.requestPermission ===
				"function"
		) {
			try {
				const response =
					await DeviceOrientationEvent.requestPermission();
				if (response === "granted") {
					window.addEventListener(
						"deviceorientation",
						handleOrientation
					);
					setPermissionGranted(true);
				}
			} catch (err) {
				console.error("Permission denied:", err);
			}
		} else {
			// Android/desktop – no permission needed
			window.addEventListener(
				"deviceorientation",
				handleOrientation
			);
			setPermissionGranted(true);
		}
	};

	const { alpha, beta, gamma } = orientation;

	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white text-black">
			{!permissionGranted ? (
				<button
					onClick={enableOrientation}
					className="px-6 py-3 mb-6 text-white bg-blue-600 rounded-xl"
				>
					Enable Motion Access
				</button>
			) : (
				<>
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
				</>
			)}
		</div>
	);
}
