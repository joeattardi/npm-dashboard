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

  const promises = packages.map(async pkg => {
    const result = await fetch(`https://api.npmjs.org/downloads/point/last-week/${pkg}`);
    const json = await result.json();
    downloads[pkg].lastWeek = json.downloads;
  }).concat(packages.map(async pkg => {
    const result = await fetch(`https://api.npmjs.org/downloads/point/last-month/${pkg}`);
    const json = await result.json();
    downloads[pkg].lastMonth = json.downloads;
  }));

  await Promise.all(promises);

  return downloads;
}

export async function packageExists(pkg) {
  const response = await fetch(`https://api.npmjs.org/downloads/point/last-day/${pkg}`);
  return response.status !== 404;
}