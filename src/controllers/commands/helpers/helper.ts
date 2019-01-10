export let formatDate = (dateToFormat: Date): string => {
	let hours: number = (dateToFormat.getHours() % 12);
	if (hours === 0) {
		hours = 12;
	}

	return (("0" + (dateToFormat.getMonth() + 1)).slice(-2) + "/"
		+ ("0" + dateToFormat.getDate()).slice(-2) + "/"
		+ dateToFormat.getFullYear() + " "
		+ ("0" + hours).slice(-2) + ":"
		+ ("0" + dateToFormat.getMinutes()).slice(-2) + " "
		+ ((dateToFormat.getHours() <= 12) ? "AM" : "PM"));
};
