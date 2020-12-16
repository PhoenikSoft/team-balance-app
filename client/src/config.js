const prod_url = "";
const dev_url = "http://localhost:8080";

export default {
    apiUrl: process.env.NODE_ENV !== 'production' ? dev_url : prod_url
}
