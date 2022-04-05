module.exports = [
	{
		price: Math.floor(Math.random() * 20) + 1,
		waitTime: Math.floor(Math.random() * 60) + 1,
		wouldEatAgain: Math.random() < 0.5 ? true : false,
		wouldQueueAgain: Math.random() < 0.5 ? true : false
	}
];
