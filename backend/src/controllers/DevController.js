const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringToArray = require("../utils/parseStringToArray");
module.exports = {
  async index(request, response) {
    const devs = await Dev.find();
    return response.json(devs);
  },

  async store(request, response) {
    const { github_username, techs, latitude, longitude } = request.body;
    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const techsArray = parseStringToArray(techs);
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      };

      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

      const { name = login, avatar_url, company, bio } = apiResponse.data;

      dev = await Dev.create({
        name,
        github_username,
        avatar_url,
        bio,
        techs: techsArray,
        company,
        location
      });
    }
    return response.json(dev);
  }
}