const axios = require('axios');
const fs = require('fs');

const work_url =
	'https://schema.mau.se/setup/jsp/SchemaICAL.ics?slutDatum=2028-11-30&sprak=SV&sokMedAND=true&startDatum=2023-07-01&moment=philip&resurser=k.BIT%20-%20IT';

const work_out = 'calendarA.ics'; // Specify the path where you want to save the downloaded file

async function downloadICal(icalFileUrl, outputPath) {
	try {
		const response = await axios.get(icalFileUrl, {
			responseType: 'arraybuffer',
		});

		if (response.status !== 200) {
			throw new Error(
				`Failed to download iCal file. Status code: ${response.status}`
			);
		}

		fs.writeFileSync(outputPath, response.data);

		console.log(`iCal file downloaded and saved as ${outputPath}`);
	} catch (error) {
		console.error('Error downloading iCal file:', error);
	}
}

downloadICal(work_url, work_out);
