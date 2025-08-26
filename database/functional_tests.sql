-- Script para teste funcional do banco de dados "guia_republicas_db"
-- Execute este script APÓS ter criado as tabelas com o script principal.

-- Limpa os dados das tabelas para garantir um teste limpo toda vez que rodar.
-- A ordem é importante para não violar as chaves estrangeiras.
DELETE FROM fotos_republica;
DELETE FROM republicas;
DELETE FROM usuarios;


-- CENÁRIO 1: Cadastro de usuários e uma república (H06, H04)
-- Inserindo um usuário 'morador' que será morador da república
INSERT INTO usuarios (nome_completo, email, senha_hash, telefone_contato, tipo_usuario)
VALUES ('João da Silva', 'joao.silva@email.com', 'hash_super_seguro_123', '31999998888', 'morador')
RETURNING id; -- O "RETURNING id" é útil para ver o ID que foi gerado.

INSERT INTO usuarios (nome_completo, email, senha_hash, telefone_contato, tipo_usuario)
VALUES ('Paulo Armani', 'paulo@email.com', 'hash_super_seguro_321', '28999998888', 'morador')
RETURNING id; -- O "RETURNING id" é útil para ver o ID que foi gerado.

-- Inserindo um usuário 'estudante'
INSERT INTO usuarios (nome_completo, email, senha_hash, tipo_usuario)
VALUES ('Mariana Costa', 'mariana.costa@email.com', 'outro_hash_seguro_456', 'estudante')
RETURNING id;

-- Inserindo uma república, associando ao ID do usuário 'João da Silva' (que deve ser 5, se o teste for limpo)
INSERT INTO republicas (nome, descricao, endereco_completo, tipo, preco_medio_mensal, vagas_disponiveis, id_usuario_responsavel)
VALUES ('República do Sossego', 'Ambiente tranquilo e focado nos estudos. Perto do IFMG.', 'Rua das Dores, 150, Bauxita, Ouro Preto - MG', 'mista', 650.00, 2, 5);

-- Inserindo uma república, associando ao ID do usuário 'João da Silva' (que deve ser 5, se o teste for limpo)
INSERT INTO republicas (nome, descricao, endereco_completo, tipo, preco_medio_mensal, vagas_disponiveis, id_usuario_responsavel)
VALUES ('República Quinta Negra', 'Ambiente tranquilo, focado nos estudos e nos esportes', 'Rua Domingos Barroso, 145, Vila dos Engenheiros, Ouro Preto - MG', 'masculina', 600.00, 3, 8);

-- Inserindo fotos para a república recém-criada (ID 1)
INSERT INTO fotos_republica (url_imagem, descricao_alt, id_republica)
VALUES ('https://site.com/foto1.jpg', 'Vista da sala de estar', 1),
       ('https://site.com/foto2.jpg', 'Quarto com duas camas', 1);

-- CENÁRIO 2: Consulta de dados (H01, H02, H03)
-- H01: Visualizando repúblicas disponíveis
SELECT * FROM republicas WHERE ativa = true;

-- H02: Filtrando por tipo
SELECT * FROM republicas WHERE tipo = 'masculina';

-- H03: Visualizando detalhes de uma república (com suas fotos)
SELECT
    r.id,
    r.nome,
    r.descricao,
    r.endereco_completo,
    r.preco_medio_mensal,
    r.vagas_disponiveis,
    u.nome_completo AS responsavel,
    u.telefone_contato,
    f.url_imagem
FROM
    republicas r
JOIN usuarios u ON r.id_usuario_responsavel = u.id
LEFT JOIN fotos_republica f ON r.id = f.id_republica
WHERE
    r.id = 1;

-- CENÁRIO 3: Atualização (H05)
UPDATE republicas
SET vagas_disponiveis = 1
WHERE id = 1;

-- Verificando a atualização
SELECT nome, vagas_disponiveis FROM republicas WHERE id = 1;


-- CENÁRIO 4: TESTANDO AS RESTRIÇÕES (Onde os erros são esperados e BEM-VINDOS!)

-- Teste 1: Tentar inserir uma república com um id_usuario_responsavel que não existe.
-- ISSO DEVE FALHAR! É a nossa chave estrangeira funcionando.
-- Descomente a linha abaixo para testar.
-- INSERT INTO republicas (nome, endereco_completo, tipo, id_usuario_responsavel) VALUES ('Rep Fantasma', 'Rua Nenhuma', 'feminina', 999);

-- teste passou.


-- Teste 2: Tentar deletar um usuário que é morador de uma república.
-- ISSO DEVE FALHAR! É a nossa restrição ON DELETE RESTRICT funcionando.
-- Descomente a linha abaixo para testar.
-- DELETE FROM usuarios WHERE id = 8;

-- teste passou.


-- Teste 3: Deletar uma república e verificar se suas fotos foram deletadas junto (ON DELETE CASCADE)
-- Inserindo uma república temporária para o teste
INSERT INTO republicas (nome, endereco_completo, tipo, id_usuario_responsavel) VALUES ('Rep Temporária', 'Rua da Exclusão', 'masculina', 5) RETURNING id;
-- Inserindo foto para a rep temporária (assumindo que o ID retornado foi 5)
INSERT INTO fotos_republica (url_imagem, id_republica) VALUES ('https://site.com/foto_temp.jpg', 5);
-- Deletando a república
DELETE FROM republicas WHERE id = 5;
-- Verificando se a foto também sumiu (esta consulta não deve retornar nada)
SELECT * FROM fotos_republica WHERE id_republica = 2;

-- Deletar todos os dados inseridos para teste OBS: Deletarão todos os outros que foram inseridos anteriormente.
DELETE FROM fotos_republica;
DELETE FROM republicas;
DELETE FROM usuarios;

-- TODOS TESTES PASSARAM.










