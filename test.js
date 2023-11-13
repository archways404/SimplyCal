const { firefox } = require('playwright');

require('dotenv').config();

console.log(`${process.env.EMAIL}`);
console.log(`${process.env.PASSWORD}`);

async function main() {
	const browser = await firefox.launch({
		headless: false,
		args: ['--disable-web-security'], // Disable web security (not recommended for production)
	});
	const page = await browser.newPage();
	await page.goto('https://calendar.google.com/');
	await page.click(
		'xpath=//html/body/main/section[1]/div[1]/header/div/div[2]/a'
	);

	// Wait for the input field to appear
	const inputElement = await page.waitForSelector(
		'xpath=//html/body/div[1]/div[1]/div[2]/div/c-wiz/div/div[2]/div/div[1]/div/form/span/section/div/div/div[1]/div/div[1]/div/div[1]/input',
		{ state: 'visible' }
	);

	if (inputElement) {
		// Type text into the input field
		await inputElement.type(process.env.EMAIL);
		await page.click('text=Next');
	} else {
		console.log('Element not found.');
	}
	const inputElement2 = await page.waitForSelector('input[type="password"]');
	if (inputElement2) {
		await inputElement2.type(process.env.PASSWORD);
		await page.click('text=Next');
	} else {
		console.log('Element not found.');
	}

	await page.waitForSelector('[aria-label="Add other calendars"]');
	await page.click('[aria-label="Add other calendars"]');

	await page.click('text=Import');

	await page.waitForSelector('.VfPpkd-StrnGf-rymPhb', { visible: true });

	await page.click(
		'.VfPpkd-StrnGf-rymPhb .VfPpkd-StrnGf-rymPhb-ibnC6b:nth-child(5)'
	); // 5th item is "Import"

	// Locate the file input element and attach the file
	const fileInput = await page.$('input[type="file"]');
	if (fileInput) {
		// Provide the path to the file you want to upload
		const filePath = 'test1.ical'; // Replace with the actual file path

		// Set the file input's value to the file path
		await fileInput.setInputFiles(filePath);

		console.log(`File '${filePath}' selected.`);
	} else {
		console.error('File input element not found.');
		await browser.close();
		return;
	}
}


main();
