import React from 'react';

export default function Keg(props) {
	return (
		<div className='keg-container'>
			<div className={`keg-indicator-${props.settings.theme}`}>
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
