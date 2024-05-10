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
