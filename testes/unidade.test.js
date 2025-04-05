const modelo = require('../modelo');
const memoria = require('../repositorio/memoria');

beforeEach(() => {
  modelo.reconfig_repositorio(memoria);
});

test('listar perguntas da memória', async () => {
  const perguntas = await modelo.listar_perguntas();
  expect(perguntas.length).toBeGreaterThan(0);
});

test('cadastrar nova pergunta', async () => {
  const id = await modelo.cadastrar_pergunta('Nova pergunta unitária');
  expect(typeof id).toBe('number');
});

test('listar respostas de pergunta existente', async () => {
  const respostas = await modelo.get_respostas(1);
  expect(Array.isArray(respostas)).toBe(true);
});

test('cadastrar nova resposta', async () => {
  const id = await modelo.cadastrar_resposta(1, 'Resposta unitária');
  expect(typeof id).toBe('number');
});

test('editar pergunta existente', async () => {
  const resultado = await modelo.atualizar_pergunta(1, 'Pergunta alterada');
  expect(resultado).toBe(true);
});

test('editar resposta existente', async () => {
  const id = await modelo.cadastrar_resposta(1, 'Antiga resposta');
  const atualizado = await modelo.atualizar_resposta(id, 'Nova resposta');
  expect(atualizado).toBe(true);
});

test('deletar resposta existente', async () => {
  const id = await modelo.cadastrar_resposta(1, 'Resposta a ser deletada');
  const ok = await modelo.deletar_resposta(id);
  expect(ok).toBe(true);
});

test('deletar pergunta existente', async () => {
  const id = await modelo.cadastrar_pergunta('Pergunta a ser deletada');
  const ok = await modelo.deletar_pergunta(id);
  expect(ok).toBe(true);
});
