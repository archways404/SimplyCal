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
		await inputElement.type('test@gmail.com');
		await page.click(
			'xpath=//html/body/main/section[1]/div[1]/header/div/div[2]/a'
		);
	} else {
		console.log('Element not found.');
	}
}

//main();
