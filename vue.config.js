process.env.NODE_ENV === "production";
module.exports = {
  transpileDependencies: ["vuetify"],
  publicPath: process.env.NODE_ENV === "production" ? "/seekster/" : "/",
  
};
