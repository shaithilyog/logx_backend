Expected structure

```
└── backend/
    ├── server.js
    ├── package.json
    ├── .env.example
    ├── src/
    │   ├── config/
    │   │   ├── db.js
    │   │   ├── middleware.js
    │   │   └── passport.js
    │   ├── api/
    │   │   ├── routes/
    │   │   │   ├── auth.routes.js
    │   │   │   ├── user.routes.js
    │   │   │   ├── workout.routes.js
    │   │   │   └── nutrition.routes.js
    │   │   ├── controllers/
    │   │   │   ├── auth.controller.js
    │   │   │   ├── user.controller.js
    │   │   │   ├── workout.controller.js
    │   │   │   └── nutrition.controller.js
    │   │   ├── middleware/
    │   │   │   ├── auth.middleware.js
    │   │   │   ├── validation.middleware.js
    │   │   │   └── rate-limiter.middleware.js
    │   │   └── validators/
    │   │       ├── auth.validator.js
    │   │       ├── user.validator.js
    │   │       ├── workout.validator.js
    │   │       └── nutrition.validator.js
    │   ├── models/
    │   │   ├── user.model.js
    │   │   ├── workout.model.js
    │   │   ├── exercise.model.js
    │   │   ├── food.model.js
    │   │   └── nutrition.model.js
    │   ├── services/
    │   │   ├── auth.service.js
    │   │   ├── user.service.js
    │   │   ├── workout.service.js
    │   │   ├── nutrition.service.js
    │   │   ├── usda-api.service.js
    │   │   └── notification.service.js
    │   └── utils/
    │       ├── logger.js
    │       ├── error-handler.js
    │       ├── api-response.js
    │       └── helpers.js
    └── tests/
        ├── unit/
        ├── integration/
        └── e2e/
```
