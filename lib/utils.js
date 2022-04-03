export function truncateString(text) {
	if (text.length > 30) {
		return text.substring(0, 29) + '...';
	}
	return text;
}
