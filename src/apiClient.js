import addDays from 'date-fns/addDays';
import format from 'date-fns/format';

const DATE_FORMAT = 'yyyy-MM-dd';

export async function getPackageData(packages) {
  const result = await fetch('https://api.npms.io/v2/package/mget', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(packages)
  });

  return await result.json();
}

export async function getDownloadStatistics(packages) {
  const downloads = {};
  packages.forEach(pkg => downloads[pkg] = {});

  const now = new Date();
  const lastWeek = addDays(now, -7);
  const previousWeek = addDays(lastWeek, -7);

  const lastMonth = addDays(now, -30);
  const previousMonth = addDays(lastMonth, -30);

  const promises = packages.map(async pkg => {
    const result = await fetch(`https://api.npmjs.org/downloads/point/${format(lastWeek, DATE_FORMAT)}:${format(now, DATE_FORMAT)}/${pkg}`);
    const json = await result.json();
    downloads[pkg].lastWeek = json.downloads;
  }).concat(packages.map(async pkg => {
    const result = await fetch(`https://api.npmjs.org/downloads/point/${format(previousWeek, DATE_FORMAT)}:${format(lastWeek, DATE_FORMAT)}/${pkg}`);
    const json = await result.json();
    downloads[pkg].previousWeek = json.downloads;
  })).concat(packages.map(async pkg => {
    const result = await fetch(`https://api.npmjs.org/downloads/point/${format(lastMonth, DATE_FORMAT)}:${format(now, DATE_FORMAT)}/${pkg}`);
    const json = await result.json();
    downloads[pkg].lastMonth = json.downloads;
  })).concat(packages.map(async pkg => {
    const result = await fetch(`https://api.npmjs.org/downloads/point/${format(previousMonth, DATE_FORMAT)}:${format(lastMonth, DATE_FORMAT)}/${pkg}`);
    const json = await result.json();
    downloads[pkg].previousMonth = json.downloads;
  }));

  await Promise.all(promises);

  return downloads;
}

export async function packageExists(pkg) {
  const result = await getPackageData([pkg]);
  return pkg in result;
}