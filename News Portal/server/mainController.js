const axios = require("axios");

const { newsApiUrl, newsApiToken } = require("./settings");

const { getIPAddress } = require("./ipAddress");

const { StatusCodes } = require("http-status-codes");

class MainController {
  constructor() {}
  search = async (req, res) => {
    const { query } = req.query;

    //CHECK parameter query and send bad respnonse if eligible
    if (query == "" || query == undefined || query == null) {
      res.status(StatusCodes.BAD_REQUEST).json({
        error: "There was no input provided to the query.",
      });
      return;
    }

    try {
      //Calling Endpoint NewsApi using accessToken and search term
      const { data } = await axios.get(`${newsApiUrl}/v2/everything`, {
        params: {
          q: query,
          apiKey: newsApiToken,
          language: "en",
        },
      });

      const response = await getIPAddress(data.articles);
      res.status(StatusCodes.OK).json(response);
    } catch (e) {
      console.error(e);
      res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  headlines = async (_, res) => {
    try {
      const { data } = await axios.get(`${newsApiUrl}/v2/top-headlines`, {
        params: {
          apiKey: newsApiToken,
          language: "en",
          pageSize: "15",
        },
      });

      const response = await getIPAddress(data.articles);
      res.status(StatusCodes.OK).json(response);
    } catch (e) {
      console.error(e);
      res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };
}

module.exports.mainController = new MainController();
