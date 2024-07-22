export function replaceNine(number: string) {
	if (!isBrazilian(number)) return number;
	if (number.length === 13)
		return number.substring(0, 4) + number.substring(5);
	if (number.length === 12)
		return number.substring(0, 4) + "9" + number.substring(4);
	return number;
}

export function isBrazilian(number: string) {
	return (
		!number.startsWith("55") ||
		(number.length !== 13 && number.length !== 12)
	);
}
