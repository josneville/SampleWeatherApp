module.exports = {
	mongo: process.env.MONGO_URL || 'localhost/weatherapp',
	port: process.env.PORT || 5000,
	weather_key: process.env.WEATHER_KEY || '267a0cd65512238c2fe7b88da9da4e92'
}
