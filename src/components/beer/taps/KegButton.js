import React, { useState } from 'react';

export default function KegButton(props) {
	const [fade, setFade] = useState(false);

	const pourThisBeer = () => {
		setFade(true);
		props.pourTap(props.tap, props.pourSize);
		setTimeout(function () {
			setFade(false);
		}, 300);
	};

	return (
		<div className={`keg-container ${fade ? 'fade' : ''}`}>
			<div
				className={`keg-indicator-${props.settings.theme}  `}
				onClick={pourThisBeer}
			>
				<div
					className={`keg-full-${props.settings.theme} ${props.kegImageClass(
						props.tap.amtLeft,
						props.tap.kegSize,
						props.settings.theme
					)}`}
					style={{
						height: `${props.calculateKegHeight(
							props.tap.amtLeft,
							props.tap.kegSize
						)}%`,
					}}
				></div>
			</div>
		</div>
	);
}
