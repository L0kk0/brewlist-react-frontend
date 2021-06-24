import React from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
	evenOrOdd,
	calculateCalories,
	calculateCarbs,
	calculateAbv,
	calculateKegHeight,
	kegImageClass,
	calculateBgRatio,
} from '../BeerUtils';
import { pourTapAsync } from '../../../redux/tapSlice';
import KegButton from './KegButton';
import Keg from './Keg';

export const TapsGrid = (props) => {
	const settings = props.settings;
	const taps = props.taps;
	const pourSize = props.settings.pourSize;
	const dispatch = useDispatch();

	const pourTap = (tap, pourSize) => {
		if (tap.amtLeft > 0) {
			dispatch(pourTapAsync(tap._id, pourSize));
		}
	};

	return (
		<React.Fragment>
			{props.ip && (
				<div
					className={`brew-list-grid-${
						settings.displayRemaining ? '6' : 'tap-5'
					} background-${settings.theme}`}
				>
					<div
						className={`brew-list-even-row-${settings.theme} brew-list-${settings.theme}`}
					>
						#
					</div>
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

					{taps &&
						taps.map((tap, index) => (
							<React.Fragment key={tap._id}>
								{tap.active && (
									<React.Fragment>
										<div
											className={`brew-list-${evenOrOdd(index)}-row-${
												settings.theme
											} brew-list-${settings.theme}`}
										>
											<div className={`tap-circle ${settings.theme}`}>
												<p>{tap.tapNumber}</p>
											</div>
										</div>
										<div
											className={`brew-list-${evenOrOdd(index)}-row-${
												settings.theme
											} brew-list-${settings.theme}`}
										>
											<div>
												<div className='pint-container'>
													<div
														className='pint-indicator'
														style={{ backgroundColor: `rgb(${tap.rgb})` }}
													></div>
													<div
														className={`pint-stroke-${settings.theme}`}
													></div>
												</div>
												<p>{tap.srm} SRM</p>
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
																height: `${tap.ibu > 100 ? 100 : tap.ibu}%`,
															}}
														></div>
													</div>
												</div>
												<p className={settings.theme}>{tap.ibu} IBU</p>
											</div>
										</div>
										<div
											className={`brew-list-${evenOrOdd(index)}-row-${
												settings.theme
											} brew-list-${settings.theme}`}
										>
											<div>
												<h2>{tap.name}</h2>
												<p>{tap.style}</p>
												<p>{tap.notes}</p>
											</div>
										</div>
										<div
											className={`brew-list-${evenOrOdd(index)}-row-${
												settings.theme
											} brew-list-${settings.theme}`}
										>
											<div>
												<p>{tap.og.toFixed(3)} OG</p>
												<p>{calculateBgRatio(tap.ibu, tap.og)} BU:GU</p>
												<p>{calculateCalories(tap.og, tap.fg)} kCal</p>
												<p>{calculateCarbs(tap.og, tap.fg)} carbs</p>
												<p>{calculateAbv(tap.og, tap.fg)}% ABV</p>
											</div>
										</div>
										{settings.displayRemaining && (
											<div
												className={`brew-list-${evenOrOdd(index)}-row-${
													settings.theme
												} brew-list-${settings.theme}`}
											>
												<div className={`keg ${settings.theme}`}>
													<input type='hidden' value={`$brew->size`} />
													<p id={`pctLeft${tap._id}`}>
														{`${calculateKegHeight(
															tap.amtLeft,
															tap.kegSize,
															settings.theme
														)}%`}
													</p>
													{settings.allowTracking ? (
														<React.Fragment>
															{settings.pourPermissions ? (
																<React.Fragment>
																	{props.ip === settings.permittedIpAddress ? (
																		<KegButton
																			tap={tap}
																			settings={settings}
																			kegImageClass={kegImageClass}
																			calculateKegHeight={calculateKegHeight}
																			pourTap={pourTap}
																			pourSize={pourSize}
																		/>
																	) : (
																		<Keg
																			tap={tap}
																			settings={settings}
																			kegImageClass={kegImageClass}
																			calculateKegHeight={calculateKegHeight}
																		/>
																	)}
																</React.Fragment>
															) : (
																<KegButton
																	tap={tap}
																	settings={settings}
																	kegImageClass={kegImageClass}
																	calculateKegHeight={calculateKegHeight}
																	pourTap={pourTap}
																	pourSize={pourSize}
																/>
															)}
														</React.Fragment>
													) : (
														<Keg
															tap={tap}
															settings={settings}
															kegImageClass={kegImageClass}
															calculateKegHeight={calculateKegHeight}
														/>
													)}
												</div>
												<p>{(tap.amtLeft / pourSize).toFixed(0)} left</p>
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

TapsGrid.propTypes = {
	taps: PropTypes.array,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
	pourTapAsync,
};

export default connect(mapStateToProps, mapDispatchToProps)(TapsGrid);
