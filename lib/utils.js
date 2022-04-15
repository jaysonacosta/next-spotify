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
export function millisToMinutesAndSeconds(millis) {
	var minutes = Math.floor(millis / 60000);
	var seconds = ((millis % 60000) / 1000).toFixed(0);
	return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}
