const path = require('path');
const express = require('express');
const routes = require('./controllers');
const session = require('express-session');
const swaggerJsDoc = require('swagger-jsdoc');
const { clog } = require('./middleware/clog');
const swaggerUi = require('swagger-ui-express');


// import sequelize connection

const app = express();
const PORT = process.env.PORT || 3001;
app.use(clog);

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "E-commerce API",
      description: "Internet retail, also known as e-commerce, is the largest sector of the electronics industry, generating an estimated $29 trillion in 2019. E-commerce platforms like Shopify and WooCommerce provide a suite of services to businesses of all sizes. It describes the aforementioned API",
      contact: {
        name: "MVPie"
      },
      servers: [`http://localhost:${PORT}`]
    }
  },
  apis: ["routes/api/*-routes.js"]
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 1*1000*60*20 // 1*1000(1sec)*60(1 min)*20 (20min) = 20 min for session.
  },
  resave: false,
  rolling: false,
  saveUninitialized: false
};




app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for feedback page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.use(routes);
// Force false so data doesn't get dropped on every sync
// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
// });
app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});