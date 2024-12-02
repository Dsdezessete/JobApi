const sequelize = require("./database");
const User = require("./models/User");
const Job = require("./models/Job");

(async () => {
  try {
    await sequelize.sync({ force: true }); // Sincroniza os modelos com o banco de dados
    console.log("Modelos sincronizados com sucesso!");

    // Adiciona registros iniciais
    await User.create({
      name: "Admin",
      email: "admin@example.com",
      password: "password123",
    });

    await Job.create({
      title: "Desenvolvedor Full Stack",
      description: "Node.js, React e PostgreSQL.",
      stats: true,
      phone: "5511999999999",
    });

    console.log("Registros iniciais criados.");
  } catch (error) {
    console.error("Erro ao sincronizar os modelos:", error);
  } finally {
    await sequelize.close();
  }
})();
