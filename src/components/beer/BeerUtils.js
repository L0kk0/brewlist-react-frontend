export const evenOrOdd = (index) => {
	if (index % 2 === 0) {
		return 'odd';
	} else {
		return 'even';
	}
};

export const calculateBgRatio = (ibu, og) => {
	return (ibu / ((og - 1) * 1000)).toFixed(2);
};

export const calculateCalories = (og, fg) => {
	const calfromalc = (1881.22 * (fg * (og - fg))) / (1.775 - og);
	const calfromcarbs = 3550.0 * fg * (0.1808 * fg + 0.8192 * fg - 1.0004);

	return (calfromalc + calfromcarbs).toFixed(0);
};

export const calculateCarbs = (og, fg) => {
	let OG = og;
	let FG = fg;
	let OGP = -463.37 + 668.72 * OG - 205.35 * OG * OG;
	let FGP = -463.37 + 668.72 * FG - 205.35 * FG * FG;
	let RE = 0.1808 * OGP + 0.8192 * FGP;
	let CARB = (RE - 0.1) * FG * 3.55;

	return (Math.round(CARB * 10) / 10).toFixed(1);
};

export const calculateAbv = (og, fg) => {
	return ((og - fg) * 131).toFixed(1);
};

export const calculateKegHeight = (amtleft, size) => {
	return ((amtleft / size) * 100).toFixed(0);
};

export const kegImageClass = (amtleft, size, themeColor) => {
	const percentRemaining = (amtleft / size) * 100;

	if (percentRemaining <= 5) return 'keg-empty-' + themeColor;
	else if (percentRemaining < 15) return 'keg-red-' + themeColor;
	else if (percentRemaining < 25) return 'keg-orange-' + themeColor;
	else if (percentRemaining < 45) return 'keg-yellow-' + themeColor;
	else if (percentRemaining < 100) return 'keg-green-' + themeColor;
	else if (percentRemaining >= 100) return 'keg-full-' + themeColor;
};
