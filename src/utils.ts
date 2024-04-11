export function formatYear(
	yearOrRange: number | readonly [start: number, end?: number]
): string {
	return Array.isArray(yearOrRange)
		? `${yearOrRange[0]}—${yearOrRange[1] ?? ''}`
		: yearOrRange.toString();
}
