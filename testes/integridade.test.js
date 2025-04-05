const modelo = require('../modelo');
const repositorio = require('../repositorio/sqlite');
const bd = require('../bd/bd_utils');

beforeEach(() => {
  modelo.reconfig_repositorio(repositorio);
  bd.reconfig('./bd/esmforum.db');
  bd.exec('DELETE FROM respostas', []);
  bd.exec('DELETE FROM perguntas', []);
});

test('cadastrar e listar pergunta no banco', async () => {
  await modelo.cadastrar_pergunta('Pergunta no SQLite');
  const perguntas = await modelo.listar_perguntas();
  expect(perguntas.length).toBe(1);
});

test('editar pergunta no banco', async () => {
  const id = await modelo.cadastrar_pergunta('Texto original');
  const ok = await modelo.atualizar_pergunta(id, 'Texto atualizado');
  expect(ok.changes).toBe(1);
});

test('cadastrar e listar resposta no banco', async () => {
  const id_pergunta = await modelo.cadastrar_pergunta('Pergunta com resposta');
  await modelo.cadastrar_resposta(id_pergunta, 'Resposta no SQLite');
  const respostas = await modelo.get_respostas(id_pergunta);
  expect(respostas.length).toBe(1);
});

test('editar resposta no banco', async () => {
  const id_pergunta = await modelo.cadastrar_pergunta('Pergunta');
  const id_resposta = await modelo.cadastrar_resposta(id_pergunta, 'Resposta antiga');
  const ok = await modelo.atualizar_resposta(id_resposta, 'Resposta nova');
  expect(ok.changes).toBe(1);
});

test('deletar resposta no banco', async () => {
  const id_pergunta = await modelo.cadastrar_pergunta('Pergunta com resposta');
  const id_resposta = await modelo.cadastrar_resposta(id_pergunta, 'Resposta');
  const ok = await modelo.deletar_resposta(id_resposta);
  expect(ok.changes).toBe(1);
});

test('deletar pergunta no banco', async () => {
  const id = await modelo.cadastrar_pergunta('Pergunta a deletar');
  const ok = await modelo.deletar_pergunta(id);
  expect(ok.changes).toBe(1);
});
