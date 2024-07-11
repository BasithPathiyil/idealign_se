const { mailService } = require("../services");
const { tryCatch } = require("../utils/tryCatch");

const sendContactMail = tryCatch(async (req, res, next) => {
  await mailService.sendContactMail(req.body, res);
});

module.exports = {
  sendContactMail,
};
