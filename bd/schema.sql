CREATE TABLE IF NOT EXISTS perguntas (
  id_pergunta INTEGER PRIMARY KEY AUTOINCREMENT,
  texto TEXT NOT NULL,
  id_usuario INTEGER
);

CREATE TABLE IF NOT EXISTS respostas (
  id_resposta INTEGER PRIMARY KEY AUTOINCREMENT,
  id_pergunta INTEGER NOT NULL,
  texto TEXT NOT NULL,
  FOREIGN KEY(id_pergunta) REFERENCES perguntas(id_pergunta)
);
