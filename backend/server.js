const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./src/config/database");
const usuariosRoutes = require("./src/routes/users");
const oportunidadesRoutes = require("./src/routes/vagas");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();

const PORT = process.env.PORT || 3000;

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Job Finder API",
      version: "1.0.0",
      description: "API para gerenciar perfis de usuários e oportunidades de trabalho",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(bodyParser.json());

sequelize
  .sync()
  .then(() => {
    console.log("Conexão com o banco de dados realizada com sucesso!");
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
  });

app.use("/perfis", usuariosRoutes);
app.use("/oportunidades", oportunidadesRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
