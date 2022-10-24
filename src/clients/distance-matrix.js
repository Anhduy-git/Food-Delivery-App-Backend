const fetch = require('node-fetch');
const config = require('../config');

module.exports = function DistanceMatrixClient() {
	// const distanceMatrix = async(origin, destination) => {
	// 	const originStr = origin.lat.toString() + ',' + origin.lng.toString();
	// 	const destinationStr = destination.lat.toString() + ',' + destination.lng.toString();
	// 	//send API
	// 	const url = `https://rsapi.goong.io/DistanceMatrix?origins=${originStr}&destinations=${destinationStr}&vehicle=bike&api_key=${process.env.GOONG_API_KEY}`;
	// 	const response = await fetch(url);
	// 	const data = await response.json();
	// 	const distance = data.rows[0].elements[0].distance.value / 1000; //convert from m to km
	// 	console.log(distance);
	// 	return distance;
	// }
	const distanceMatrixMultipleDestinations = async (origin, destinations) => {
		const originStr = `${origin.lat.toString()},${origin.lng.toString()}`;
		let destinationStr = '';
		destinations.forEach((destination) => {
			destinationStr = `${
				destinationStr + destination.lat.toString()
			},${destination.lng.toString()}|`;
		});
		// remove last '|' from destination string
		destinationStr = destinationStr.slice(0, -1);
		// URI encoding
		destinationStr = encodeURIComponent(destinationStr);

		// send API
		const url = `https://rsapi.goong.io/DistanceMatrix?origins=${originStr}&destinations=${destinationStr}&vehicle=bike&api_key=${config.goong_api_key}`;
		const response = await fetch(url);
		const data = await response.json();

		const distances = [];
		data.rows[0].elements.forEach((item) => {
			distances.push(item.distance.value / 1000); // convert from m to km
		});
		return distances;
	};
	return {
		// distanceMatrix,
		distanceMatrixMultipleDestinations
	};
};
