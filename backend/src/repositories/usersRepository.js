const Usuario = require("../models/users");

async function findOne(email, password) {
  try {
    const user = await Usuario.findOne({ where: { email } });
    if (!user) {
      return { success: false, message: "Usuário não encontrado" };
    }

    const isPasswordValid = await user.authenticate(password);
    if (!isPasswordValid) {
      return { success: false, message: "Senha inválida" };
    }

    return { success: true, user };
  } catch (error) {
    return { success: false, message: "Erro ao buscar usuário", error };
  }
}

async function findAll() {
  try {
    const users = await Usuario.findAll();
    return { success: true, users };
  } catch (error) {
    return { success: false, message: "Erro ao buscar usuários", error };
  }
}

async function create({ name, email, password }) {
  try {
    const user = await Usuario.create({ name, email, password });
    return { success: true, user };
  } catch (error) {
    return { success: false, message: "Erro ao criar usuário", error };
  }
}

async function deleteUser(id) {
  try {
    const user = await Usuario.findByPk(id);
    if (!user) {
      return { success: false, message: "Usuário não encontrado" };
    }
    await user.destroy();
    return { success: true, message: "Usuário excluído com sucesso" };
  } catch (error) {
    return { success: false, message: "Erro ao excluir usuário", error };
  }
}

async function update(id, data) {
  try {
    const user = await Usuario.findByPk(id);
    if (!user) {
      return { success: false, message: "Usuário não encontrado" };
    }
    await user.update(data); // Atualização dinâmica
    return { success: true, user };
  } catch (error) {
    return { success: false, message: "Erro ao atualizar usuário", error };
  }
}

module.exports = {
  findOne,
  create,
  findAll,
  deleteUser,
  update,
};
