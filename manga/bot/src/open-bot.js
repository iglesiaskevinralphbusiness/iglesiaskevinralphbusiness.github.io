const puppeteer = require("puppeteer");
const expect = require("chai").expect;
const fs = require("fs");

//https://free-proxy-list.net/
//https://www.proxynova.com/proxy-server-list/country-sg/

(async () => {

	///let working_proxies = JSON.parse(await fs.readFileSync(__dirname + "/proxies_working.json", "utf8"));

	let total = 1000;
	let done = 0;
	for (let start = 0; start < total; start++) {

		let working_proxies = JSON.parse(await fs.readFileSync(__dirname + "/proxies_working.json", "utf8"));
		const proxies = JSON.parse(JSON.stringify(working_proxies));

		for (let i = 0; i < proxies.length; i++) {

			const browser = await puppeteer.launch({
				headless: true, //for debuging
				args: [`--proxy-server=http://${proxies[i]}`]
			});

			const page = await browser.newPage();
			try {
				await page.goto('http://adfoc.us/50994974442794', { waitUntil: "domcontentloaded", timeout: 0 });

				const elements_total = await page.evaluate(() => {
					const elements = Array.from(document.querySelectorAll("div"));
					return elements.length;
				});

				if(elements_total > 0){
					await page.waitFor(35000);
					console.log('done 0' + proxies[i]);

					await page.goto('http://adfoc.us/50994974441339', { waitUntil: "domcontentloaded", timeout: 0 });
					await page.waitFor(35000);
					console.log('done 1' + proxies[i]);

					await page.goto('http://adfoc.us/50994974442794', { waitUntil: "domcontentloaded", timeout: 0 });
					await page.waitFor(35000);
					console.log('done 2' + proxies[i]);

					await page.goto('http://adfoc.us/50994974448509', { waitUntil: "domcontentloaded", timeout: 0 });
					await page.waitFor(35000);
					console.log('done 3' + proxies[i]);
	
					await page.goto('http://adfoc.us/50994974448510', { waitUntil: "domcontentloaded", timeout: 0 });
					await page.waitFor(35000);
					console.log('done 4' + proxies[i]);
					
					await page.goto('http://adfoc.us/50994974448511', { waitUntil: "domcontentloaded", timeout: 0 });
					await page.waitFor(35000);
					console.log('done 5' + proxies[i]);

					await page.goto('http://adfoc.us/50994974448512', { waitUntil: "domcontentloaded", timeout: 0 });
					await page.waitFor(35000);
					console.log('done 6' + proxies[i]);

					await page.goto('http://adfoc.us/50994974455399', { waitUntil: "domcontentloaded", timeout: 0 });
					await page.waitFor(35000);

					await page.goto('http://adfoc.us/50994974455400', { waitUntil: "domcontentloaded", timeout: 0 });
					await page.waitFor(35000);
					console.log('done 7' + proxies[i]);

					await page.goto('http://adfoc.us/50994974455401', { waitUntil: "domcontentloaded", timeout: 0 });
					await page.waitFor(35000);
					console.log('done 8' + proxies[i]);

					await page.goto('http://adfoc.us/50994974455402', { waitUntil: "domcontentloaded", timeout: 0 });
					await page.waitFor(35000);
					console.log('done 9' + proxies[i]);

					await page.goto('http://adfoc.us/50994974455403', { waitUntil: "domcontentloaded", timeout: 0 });
					await page.waitFor(35000);
					console.log('done 10' + proxies[i]);

					await page.goto('http://adfoc.us/50994974455404', { waitUntil: "domcontentloaded", timeout: 0 });
					await page.waitFor(35000);
					console.log('done 11' + proxies[i]);

					await page.goto('http://adfoc.us/50994974455405', { waitUntil: "domcontentloaded", timeout: 0 });
					await page.waitFor(35000);
					console.log('done 12' + proxies[i]);

					done++;
					total = total - 1;
					console.log(done + '/' + total + ' - ' + proxies[i]);

					const working_find = working_proxies.find(proxy => proxy == proxies[i]);
					if (!working_find) {
						working_proxies.push(proxies[i]);
						fs.writeFileSync(`src/proxies_working.json`, JSON.stringify(working_proxies));
						console.log('saved ' + proxies[i]);
					}
				}
				else {
					const working_filter = working_proxies.filter(proxy => proxy != proxies[i]);
					fs.writeFileSync(`src/proxies_working.json`, JSON.stringify(working_filter));
					console.log('removed ' + proxies[i]);
				}


			} catch (err) {
				const working_filter = working_proxies.filter(proxy => proxy != proxies[i]);
				fs.writeFileSync(`src/proxies_working.json`, JSON.stringify(working_filter));
				console.log('removed ' + proxies[i]);
				//console.log(err);
			}



			await browser.close();

		}




	}

})();