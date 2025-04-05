const bd = require('../bd/bd_utils');

module.exports = {
  async recuperar_todas_perguntas() {
    return bd.queryAll('SELECT * FROM perguntas ORDER BY id_pergunta ASC', []);
  },

  async recuperar_pergunta(id) {
    return bd.query('SELECT * FROM perguntas WHERE id_pergunta = ?', [id]);
  },

  async criar_pergunta(texto) {
    const r = bd.exec('INSERT INTO perguntas (texto, id_usuario) VALUES (?, ?)', [texto, 1]);
    return r.lastInsertRowid;
  },

  async atualizar_pergunta(id_pergunta, novo_texto) {
    return bd.exec('UPDATE perguntas SET texto = ? WHERE id_pergunta = ?', [novo_texto, id_pergunta]);
  },

  async deletar_pergunta(id_pergunta) {
    bd.exec('DELETE FROM respostas WHERE id_pergunta = ?', [id_pergunta]);
    return bd.exec('DELETE FROM perguntas WHERE id_pergunta = ?', [id_pergunta]);
  },

  async recuperar_todas_respostas(id_pergunta) {
    return bd.queryAll('SELECT * FROM respostas WHERE id_pergunta = ?', [id_pergunta]);
  },

  async recuperar_num_respostas(id_pergunta) {
    const resultado = bd.query('SELECT count(*) FROM respostas WHERE id_pergunta = ?', [id_pergunta]);
    return resultado['count(*)'];
  },

  async criar_resposta(id_pergunta, texto) {
    const r = bd.exec('INSERT INTO respostas (id_pergunta, texto) VALUES (?, ?)', [id_pergunta, texto]);
    return r.lastInsertRowid;
  },

  async atualizar_resposta(id_resposta, novo_texto) {
    return bd.exec('UPDATE respostas SET texto = ? WHERE id_resposta = ?', [novo_texto, id_resposta]);
  },

  async deletar_resposta(id_resposta) {
    return bd.exec('DELETE FROM respostas WHERE id_resposta = ?', [id_resposta]);
  }
};
