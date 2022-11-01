## You are the  ![Visitors](https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fgithub.com%2FAnhduygit%2FHanbai&countColor=%230096ff&style=flat) ! Thanks for your visit!



# Order management application (Back-end)

Back-end of a food delivery application.

There are 3 types of user in the web:
+ Customer: User who will order food.
+ Chef: User who will cook and sell food.
+ Shipper: User who will delivery food.


## Contributors
Here is our team, you can connect us through our Linkedin:
- [Nguyen Tran Anh Duy (Backend Developper)](https://www.linkedin.com/in/duy-nguyen-tran-anh/).


## Tech Stack

**Programming Language:** Javascript.

**Frameworks:** NodeJS, ExpressJS.

**Database:** MongoDB.

**Cloud Database:** MongoDB Atlas.

**Web server:** Heroku.

**Third-party services:** Cloudinary (image storage), Twilio (SMS sending), Goong (map & distance APIs).

**Documentation:** OpenAPI, Swagger.


## Features
- Login/Logout user.
- Register new customer.
- Register new chef.
- Register new shipper.
- Create new dish (chef).
- Buy dishes (customer).
- Delivery order (shipper).
- Create new order.
- Create new delivery.
- Logging registration informations (RabbitMQ).


## Installation & Running
```bash
  - Development 
  1. npm install
  2. docker-compose -f docker-compose.yml up
  3. npm run start:dev
  
  - Production
  1. npm install
  2. npm run start
```
## Documentation

[Documentation](https://app.swaggerhub.com/apis-docs/Anhduy-git/OrderApp/1.0.0)



