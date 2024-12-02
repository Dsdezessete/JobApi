const vagasRepository = require("./src/repositories/vagasRepository");
const sequelize = require("./src/config/database");

const vagas = [
  {
    descricao: "Desenvolvimento de APIs e integração com sistemas de terceiros.",
    titulo: "Desenvolvedor Back-End",
    dataCadastro: new Date(),
    telefone: "11987654321",
    empresa: "CodeCraft",
    stats: true,
  },
  {
    descricao: "Análise de dados para gerar insights estratégicos.",
    titulo: "Analista de Dados",
    dataCadastro: new Date(),
    telefone: "21987654321",
    empresa: "DataWorks",
    stats: true,
  },
  {
    descricao: "Planejamento e execução de estratégias de SEO.",
    titulo: "Especialista em SEO",
    dataCadastro: new Date(),
    telefone: "31987654321",
    empresa: "Web Growth",
    stats: false,
  },
  {
    descricao: "Atendimento ao cliente e resolução de dúvidas técnicas.",
    titulo: "Consultor de Suporte",
    dataCadastro: new Date(),
    telefone: "41987654321",
    empresa: "Help Desk Solutions",
    stats: true,
  },
  {
    descricao: "Gerenciamento de projetos e equipes multidisciplinares.",
    titulo: "Gerente de Projetos",
    dataCadastro: new Date(),
    telefone: "51987654321",
    empresa: "PM Professionals",
    stats: true,
  },
  {
    descricao: "Desenvolvimento e manutenção de sistemas de segurança cibernética.",
    titulo: "Especialista em Segurança da Informação",
    dataCadastro: new Date(),
    telefone: "61987654321",
    empresa: "SecureTech",
    stats: false,
  },
  {
    descricao: "Design de soluções inovadoras para aplicativos móveis.",
    titulo: "Designer de Aplicativos",
    dataCadastro: new Date(),
    telefone: "71987654321",
    empresa: "AppVision",
    stats: true,
  },
];

const seedVagas = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Database synchronized.");

    await Promise.all(
      vagas.map(async (vaga) => {
        await vagasRepository.create(vaga);
        console.log(`Vaga inserida: ${vaga.titulo}`);
      })
    );

    console.log("Seed de vagas criada com sucesso!");
  } catch (error) {
    console.error("Erro ao criar seed de vagas:", error);
  }
};

seedVagas();
