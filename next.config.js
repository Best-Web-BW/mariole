const { i18n } = require("./next-i18next.config");
const runtimeCaching = require('next-pwa/cache');
const withPWA = require("next-pwa");

module.exports = withPWA({
    i18n,
    pwa: {
        dest: "public",
        runtimeCaching
    }
})