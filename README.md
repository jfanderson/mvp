#ReInvent
Inventory management software that allows businesses with Shopify storefronts to easily synchronize product data from online and offline sales.

Store owners must add a config.js file inside the `server/` folder. The following info must be placed in the file:  
`exports.key = *API key*`  
`exports.pw = *password*`  
`exports.domain = *hostname*`

All asterisked items should be replaced with a value. Instructions on generating the API key and password can be found [here](https://docs.shopify.com/api/authentication/creating-a-private-app). The hostname should be of the form "your-store-name.myshopify.com."

To setup and run the server:  
`npm install`  
`bower install`  
`grunt`

This is a project I completed as a student at [hackreactor](http://hackreactor.com). (mvp)
