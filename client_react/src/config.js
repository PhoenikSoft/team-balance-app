const prod_url = "http://teambalanceapp-env.eba-pv93a9qx.eu-central-1.elasticbeanstalk.com";
const dev_url = "http://192.168.0.103:8080";

export default {
    apiUrl: process.env.NODE_ENV !== 'production' ? dev_url : prod_url
}