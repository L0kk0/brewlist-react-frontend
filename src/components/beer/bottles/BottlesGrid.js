import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
	evenOrOdd,
	calculateCalories,
	calculateAbv,
	calculateBgRatio,
} from '../BeerUtils';
import { pourBottleAsync } from '../../../redux/bottleSlice';

export const BottlesGrid = (props) => {
	const settings = props.settings;
	const bottles = props.bottles;
	const dispatch = useDispatch();

	const pourBottle = (id) => {
		dispatch(pourBottleAsync(id));
	};

	return (
		<React.Fragment>
			{props.ip && (
				<div
					className={`brew-list-grid-${
						settings.displayRemaining ? 'bottle-5' : '4'
					} background-${settings.theme}`}
				>
					<div
						className={`brew-list-even-row-${settings.theme} brew-list-${settings.theme}`}
					>
						COLOR
					</div>
					<div
						className={`brew-list-even-row-${settings.theme} brew-list-${settings.theme}`}
					>
						BITTERNESS
					</div>
					<div
						className={`brew-list-even-row-${settings.theme} brew-list-${settings.theme}`}
					>
						BEER
					</div>
					<div
						className={`brew-list-even-row-${settings.theme} brew-list-${settings.theme}`}
					>
						DETAILS
					</div>
					{settings.displayRemaining && (
						<div
							className={`brew-list-even-row-${settings.theme} brew-list-${settings.theme}`}
						>
							REMAINING
						</div>
					)}
					{bottles &&
						bottles.map((bottle, index) => (
							<React.Fragment key={bottle._id}>
								{bottle.active && (
									<React.Fragment>
										<div
											className={`brew-list-${evenOrOdd(index)}-row-${
												settings.theme
											} brew-list-${settings.theme}`}
										>
											<div>
												<div className='bottle-container'>
													<div
														className='bottle-indicator'
														style={{ backgroundColor: `rgb(${bottle.rgb})` }}
													></div>
													<div
														className={`bottle-stroke-${settings.theme}`}
													></div>
												</div>
												<p className={`${settings.theme}`}>{bottle.srm} SRM</p>
											</div>
										</div>
										<div
											className={`brew-list-${evenOrOdd(index)}-row-${
												settings.theme
											} brew-list-${settings.theme}`}
										>
											<div>
												<div className='ibu-container'>
													<div className={`ibu-indicator-${settings.theme}`}>
														<div
															className={`ibu-full-${settings.theme}`}
															style={{
																height: `${
																	bottle.ibu > 100 ? 100 : bottle.ibu
																}%`,
															}}
														></div>
													</div>
												</div>
												<p className={`${settings.theme}`}>{bottle.ibu} IBU</p>
											</div>
										</div>
										<div
											className={`brew-list-${evenOrOdd(index)}-row-${
												settings.theme
											} brew-list-${settings.theme}`}
										>
											<div>
												<h2 className={`${settings.theme}`}>{bottle.name}</h2>
												<p className={`${settings.theme}`}>{bottle.style}</p>
												<p className={`${settings.theme}`}>{bottle.notes}</p>
											</div>
										</div>
										<div
											className={`brew-list-${evenOrOdd(index)}-row-${
												settings.theme
											} brew-list-${settings.theme}`}
										>
											<div>
												<p>{bottle.og.toFixed(3)} OG</p>
												<p>{calculateBgRatio(bottle.ibu, bottle.og)} BU:GU</p>
												<p>{calculateCalories(bottle.og, bottle.fg)} kCal</p>
												<p>{calculateAbv(bottle.og, bottle.fg)}% ABV</p>
											</div>
										</div>
										{settings.displayRemaining && (
											<div
												className={`brew-list-${evenOrOdd(index)}-row-${
													settings.theme
												} brew-list-${settings.theme}`}
											>
												<div className={`bottle-num-${settings.theme}`}>
													<div
														className={`bottle-circle ${settings.theme}`}
														onClick={(e) => pourBottle(bottle._id)}
													>
														{bottle.bottlesLeft}
													</div>
												</div>
											</div>
										)}
									</React.Fragment>
								)}
							</React.Fragment>
						))}
				</div>
			)}
		</React.Fragment>
	);
};

BottlesGrid.propTypes = {
	bottles: PropTypes.array,
};

export default BottlesGrid;
