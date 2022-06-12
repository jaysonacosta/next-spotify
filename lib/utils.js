export function truncateString(text, length) {
	if (text.length > length) {
		return text.substring(0, length - 1) + '...';
	}
	return text;
}
export function convertDate(dateISO) {
	const date = new Date(dateISO);
	const month = date.toLocaleDateString('en-gb', {
		month: 'short',
	});
	const day = date.toLocaleDateString('en-gb', {
		day: 'numeric',
	});
	const year = date.toLocaleDateString('en-gb', {
		year: 'numeric',
	});
	const readableDate = `${month} ${day}, ${year}`;
	return readableDate;
}
export function dateToString(unformattedDate) {
	const [year, month, day] = unformattedDate.split('-');
	return `${getMonth(month)} ${day}, ${year}`;
}
function getMonth(monthNum) {
	switch (parseInt(monthNum)) {
		case 1:
			return 'January';

		case 2:
			return 'February';

		case 3:
			return 'March';

		case 4:
			return 'April';

		case 5:
			return 'May';

		case 6:
			return 'June';

		case 7:
			return 'July';

		case 8:
			return 'August';

		case 9:
			return 'September';

		case 10:
			return 'October';

		case 11:
			return 'November';

		case 12:
			return 'December';
	}
}
export function millisToMinutesAndSeconds(millis) {
	var minutes = Math.floor(millis / 60000);
	var seconds = ((millis % 60000) / 1000).toFixed(0);
	return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}
