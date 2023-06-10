const oldposts = require("../../models/oldJops.model");
const followModel = require("../../models/followCompanies");
const jobPostModel = require("../../models/jopPost.model");
const { options } = require("../../routes/user.Route");
const userModel = require("../../models/users.model");
function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}
const axios = require("axios");

class posts {
  static sendJobandCVtoModel = async (post, cvs, res) => {
    try {
      console.log(cvs);
      let data = await axios({
        method: "post",
        url: "  ",

        data: {
          description: post.description,
          skillsMustHave: post.skillsMustHave,
          users: cvs,
        },

        headers: { "Content-Type": "application/json" },
      });

      let finalcvs = await axios({
        method: "post",
        url: "http://127.0.0.1:8888/testing",

        data: { skills: data.data, users: cvs },

        headers: { "Content-Type": "application/json" },
      });
      res.send({
        status: true,
        data: finalcvs,
      });
    } catch (err) {
      res.status(400).send({
        apiStatus: false,
        message: err.message,
      });
    }
  };

  static calculateAge = async (birthdate) => {
    const now = new Date();
    const birth = new Date(birthdate);
    let age = now.getFullYear() - birth.getFullYear();
    const monthDiff = now.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
      age--;
    }

    return age;
  };
  static getCvs = async (jobPost, res) => {
    try {
      let cvs;
      if ((jobPost.workingType = "Remote")) {
        cvs = await userModel
          .find({ jobType: jobPost.jobType, industry: jobPost.industry })
          .select("_id cv languages birthdate public_id");
      } else {
        cvs = await userModel
          .find({
            country: jobPost.Country,
            city: jobPost.City,
            jobType: jobPost.jobType,
            industry: jobPost.industry,
          })
          .select("_id cv languages birthdate public_id");
      }
      if (jobPost.maxAge) {
        cvs = cvs.filter(async (e) => {
          (await this.calculateAge(e.birthdate)) <= jobPost.maxAge;
        });
        cvs = cvs.filter((e) => e.cv != null);
        console.log(cvs);
      }

      await this.sendJobandCVtoModel(jobPost, cvs, res);
      //await this.sendJobandCVtoModel(jobPost , cvs)
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
}
module.exports = posts;
