// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../pb_data/types.d.ts" />
/* global $http, $app, $apis, routerAdd */

// routerAdd(
//   "POST",
//   "/api/tramo/webhook",
//   (c) => {
//     c
    
    
//     link_id
    
    
    
//     return c.json(200);
//   },
//   $apis.activityLogger($app),
//   $apis.requireAdminOrRecordAuth(),
// );






// const BELVO_API_KEY = "27524567-c866-4ee1-b61f-e842e91a21cb";
// const BELVO_SECRET_KEY = "v@YGYfhh@nHKThC4IG-cC*Q5A_z_h1iosiV0*efeX2vlpaiWWZ2Ax2kGihUCKSWj";
// const BASE_URL = "https://sandbox.belvo.com";
// const url = `${BASE_URL}/api/token/`;

// const data = {
//   id: BELVO_API_KEY,
//   password: BELVO_SECRET_KEY,
//   scopes: "read_institutions,write_links",
//   fetch_resources: ["FINANCIAL_STATEMENTS", "INVOICES"],
//   credentials_storage: "store",
// };

// let accessToken;

// try {
//   const response = $http.send({
//     url: url,
//     method: "POST",
//     body: JSON.stringify(data),
//     headers: { "content-type": "application/json" },
//     timeout: 120, // in seconds
//   });

//   accessToken = response.json.access;
// } catch (error) {
//   console.log(error);
// }