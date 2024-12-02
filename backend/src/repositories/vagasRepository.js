const Vagas = require("../models/vagas");

async function create(data) {
  try {
    const vaga = await Vagas.create(data);
    return { success: true, vaga };
  } catch (error) {
    return { success: false, message: "Erro ao criar vaga.", error };
  }
}

async function remove(id) {
  try {
    const vaga = await Vagas.findByPk(id);
    if (!vaga) {
      return { success: false, message: "Vaga não encontrada." };
    }
    await vaga.destroy();
    return { success: true, message: "Vaga removida com sucesso." };
  } catch (error) {
    return { success: false, message: "Erro ao remover vaga.", error };
  }
}

async function update(id, data) {
  try {
    const vaga = await Vagas.findByPk(id);
    if (!vaga) {
      return { success: false, message: "Vaga não encontrada." };
    }
    Object.assign(vaga, data); // Atualiza apenas os campos fornecidos
    await vaga.save();
    return { success: true, vaga };
  } catch (error) {
    return { success: false, message: "Erro ao atualizar vaga.", error };
  }
}

async function findAll() {
  try {
    const vagas = await Vagas.findAll();
    return { success: true, vagas };
  } catch (error) {
    return { success: false, message: "Erro ao buscar vagas.", error };
  }
}

async function toggleStats(id) {
  try {
    const vaga = await Vagas.findByPk(id);
    if (!vaga) {
      return { success: false, message: "Vaga não encontrada." };
    }
    vaga.stats = !vaga.stats;
    await vaga.save();
    return { success: true, vaga };
  } catch (error) {
    return { success: false, message: "Erro ao alternar status da vaga.", error };
  }
}

module.exports = {
  create,
  remove,
  update,
  findAll,
  toggleStats,
};
