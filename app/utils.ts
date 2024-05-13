export const regions = [
	"Andijon",
	"Buxoro",
	"Farg'ona",
	"Jizzax",
	"Xorazm",
	"Namangan",
	"Navoiy",
	"Qashqadaryo",
	"Samarqand",
	"Sirdaryo",
	"Surxondaryo",
	"Toshkent viloyati",
];

export const formatDate = (str: string) => {
	const date = new Date(str);
	const day = date.getDate();
	const month = date.getMonth();
	const year = date.getFullYear();
	return `${day < 10 ? "0" : ""}${day}-${month < 9 ? "0" : ""}${
		month + 1
	}-${year}`;
};

// --------------------------------- UZBEK LATIN TEXT TO CYRILLIC ---------------------------------

const LATIN_TO_CYRILLIC_MAP: { [key: string]: string } = {
	a: "а",
	A: "А",
	b: "б",
	B: "Б",
	d: "д",
	D: "Д",
	e: "е",
	E: "Е",
	f: "ф",
	F: "Ф",
	g: "г",
	G: "Г",
	h: "ҳ",
	H: "Ҳ",
	i: "и",
	I: "И",
	j: "ж",
	J: "Ж",
	k: "к",
	K: "К",
	l: "л",
	L: "Л",
	m: "м",
	M: "М",
	n: "н",
	N: "Н",
	o: "о",
	O: "О",
	"o'": "ў",
	"O'": "Ў",
	p: "п",
	P: "П",
	q: "қ",
	Q: "Қ",
	r: "р",
	R: "Р",
	s: "с",
	S: "С",
	t: "т",
	T: "Т",
	u: "у",
	U: "У",
	v: "в",
	V: "В",
	x: "х",
	X: "Х",
	y: "й",
	Y: "Й",
	z: "з",
	Z: "З",
	sh: "ш",
	Sh: "Ш",
	ch: "ч",
	Ch: "Ч",
	ng: "нг",
	Ng: "Нг",
	gh: "ғ",
	Gh: "Ғ",
	ts: "ц",
	Ts: "Ц",
	yo: "ё",
	Yo: "Ё",
	ya: "я",
	Ya: "Я",
	yu: "ю",
	Yu: "Ю",
	ye: "е",
	Ye: "Е",
	yi: "и",
	Yi: "И",
	"g'": "ғ",
	"G'": "Ғ",
};

export const latinToCyrillicUzbek = (text: string): string => {
	let result = "";
	let i = 0;

	while (i < text.length) {
		let currentChar = text[i];
		let nextChar = text[i + 1];
		let potentialDoubleChar = currentChar + nextChar;

		if (LATIN_TO_CYRILLIC_MAP.hasOwnProperty(potentialDoubleChar)) {
			result += LATIN_TO_CYRILLIC_MAP[potentialDoubleChar];
			i += 2;
		} else if (LATIN_TO_CYRILLIC_MAP.hasOwnProperty(currentChar)) {
			result += LATIN_TO_CYRILLIC_MAP[currentChar];
			i += 1;
		} else {
			result += currentChar;
			i += 1;
		}
	}
	return result;
};

// --------------------------------- EXPERIENCE CALCULATOR ---------------------------------

export const getDateDifference = (selectedDate: string): string => {
	const currentDate = new Date();
	const date = new Date(selectedDate);
	const yearsDiff = currentDate.getFullYear() - date.getFullYear();
	const monthsDiff = currentDate.getMonth() - date.getMonth();
	const daysDiff = currentDate.getDate() - date.getDate();

	let years = yearsDiff;
	let months = monthsDiff;
	let days = daysDiff;

	if (days < 0) {
		months--;
		days += new Date(
			currentDate.getFullYear(),
			currentDate.getMonth(),
			0
		).getDate();
	}
	if (months < 0) {
		years--;
		months += 12;
	}

	return (
		(years ? `${years} ` : "") +
		(years ? "yil " : "") +
		(months ? `${months} ` : "") +
		(months ? "oy " : "") +
		(days ? `${days} ` : "") +
		(days ? "kun" : "")
	);
};
