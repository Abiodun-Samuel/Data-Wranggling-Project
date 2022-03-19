const axios = require("axios");
const cheerio = require("cheerio");
const { validationResult } = require("express-validator");

const homePage = (req, res) => {
  res.render("index");
};
const successPage = (req, res) => {
  res.render("success");
};

const postData = (req, res) => {
  let error = validationResult(req);

  if (!error.isEmpty()) {
    error = error.array();
    const { msg: error_msg } = error[0];
    res.json(error_msg);
  } else {
    const url = req.body.url;
    const getHtml = async () => {
      try {
        const table = [];
        const response = await axios(url);
        const html = response.data;
        const $ = cheerio.load(html);
        let allTables = $("table");
        if (allTables.length > 0) {
          allTables.each((i, el) => {
            const title = $(el)
              .find("tbody td")
              .text()
              .trim()
              .replace(/\s+/g, " ");
            table.push(title);
          });
        }
        res.json(table);
      } catch (error) {
        res.json(error);
      }
    };
    getHtml();
  }
};

module.exports = { postData, homePage, successPage };
