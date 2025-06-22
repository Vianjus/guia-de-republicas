
-- Remove tabelas e tipos existentes para permitir a recriação limpa (bom para desenvolvimento)
DROP TABLE IF EXISTS fotos_republica;
DROP TABLE IF EXISTS republicas;
DROP TABLE IF EXISTS usuarios;
DROP TYPE IF EXISTS tipo_usuario_enum;
DROP TYPE IF EXISTS tipo_republica_enum;


-- ETAPA 1: CRIAÇÃO DE TIPOS ENUMERADOS (ENUMs)
-- Usar ENUMs garante a consistência dos dados para colunas com valores pré-definidos.

CREATE TYPE tipo_usuario_enum AS ENUM ('estudante', 'morador');
CREATE TYPE tipo_republica_enum AS ENUM ('masculina', 'feminina', 'mista');


-- ETAPA 2: CRIAÇÃO DAS TABELAS PRINCIPAIS

-- Tabela de Usuários
-- Armazena informações para login e identificação de todos os usuários do sistema.
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome_completo VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL, -- Deve armazenar o HASH da senha (ex: bcrypt), NUNCA a senha pura.
    telefone_contato VARCHAR(20),
    tipo_usuario tipo_usuario_enum NOT NULL,
    data_criacao TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON COLUMN usuarios.senha_hash IS 'Hash da senha gerado com um algoritmo forte como bcrypt ou Argon2.';


-- Tabela de Repúblicas
-- Contém os dados principais de cada república cadastrada.
CREATE TABLE republicas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    endereco_completo TEXT NOT NULL,
    tipo tipo_republica_enum NOT NULL,
    preco_medio_mensal DECIMAL(10, 2),
    vagas_disponiveis INT NOT NULL DEFAULT 0 CHECK (vagas_disponiveis >= 0),
    ativa BOOLEAN NOT NULL DEFAULT true,
    data_criacao TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    -- Chave estrangeira que conecta a república ao seu usuário responsável.
    id_usuario_responsavel INT NOT NULL,
    CONSTRAINT fk_usuario_responsavel
        FOREIGN KEY(id_usuario_responsavel) 
        REFERENCES usuarios(id)
        ON DELETE RESTRICT -- Impede que um usuário seja deletado se ele for dono de uma república.
);

COMMENT ON COLUMN republicas.ativa IS 'Flag para controlar a visibilidade da república no site sem precisar apagar o registro.';
COMMENT ON CONSTRAINT fk_usuario_responsavel ON republicas IS 'Garante que toda república tenha um dono e impede que o dono seja apagado se tiver repúblicas.';


-- Tabela de Fotos da República
-- Cada república pode ter várias fotos, e esta tabela armazena a URL de cada uma.
CREATE TABLE fotos_republica (
    id SERIAL PRIMARY KEY,
    url_imagem VARCHAR(512) NOT NULL,
    descricao_alt VARCHAR(255),
    data_upload TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    -- Chave estrangeira que conecta a foto à sua respectiva república.
    id_republica INT NOT NULL,
    CONSTRAINT fk_republica
        FOREIGN KEY(id_republica)
        REFERENCES republicas(id)
        ON DELETE CASCADE -- Se uma república for deletada, todas as suas fotos serão deletadas em cascata.
);

COMMENT ON CONSTRAINT fk_republica ON fotos_republica IS 'Garante que toda foto pertença a uma república e apaga as fotos automaticamente se a república for removida.';


-- ETAPA 3: OTIMIZAÇÕES (ÍNDICES)
-- Índices aceleram as operações de busca (SELECT), especialmente nos filtros.

CREATE INDEX idx_republicas_tipo ON republicas(tipo);
CREATE INDEX idx_republicas_ativa_preco ON republicas(ativa, preco_medio_mensal);
CREATE INDEX idx_fotos_republica_id ON fotos_republica(id_republica);


-- ETAPA 4: FUNCIONALIDADES AVANÇADAS (TRIGGER)
-- Este gatilho (trigger) atualiza automaticamente o campo 'data_atualizacao' sempre que uma república for modificada.

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.data_atualizacao = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp_republicas
BEFORE UPDATE ON republicas
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();

COMMENT ON TRIGGER set_timestamp_republicas ON republicas IS 'Atualiza o campo data_atualizacao para o horário atual sempre que um registro na tabela republicas é alterado.';


