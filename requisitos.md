# Requisitos
## Histórias de Usuário
* H01: Como usuário não cadastrado, quero visualizar repúblicas disponíveis, para que eu possa conhecer as opções.
* H02: Como usuário não cadastrado, quero filtrar repúblicas por localização e tipo (masculina, feminina, mista), para encontrar aquelas que encaixam nas minhas preferências
* H03: Como usuário não cadastrado, quero visualizar detalhes de uma república (descrição, fotos, preço e localização), para saber se vale a pena entrar em contato.
* H04: Como usuário cadastrado, quero cadastrar minha república no site, para que ela possa ser encontrada por interessados.
* H05: Como usuário cadastrado, quero editar as informações de república (fotos, vagas disponíveis), para manter os dados atualizados.
* H06: Como usuário não cadastrado, quero fazer cadastro, tanto como estudante e como uma república.
* H07: Como usuário cadastrado de estudante, quero avaliar as repúblicas disponíveis.
* H08: Como usuário cadastrado, quero receber notificações por e-mail sobre atividades importantes, como novas repúblicas cadastradas e vagas novas que surgem.
* H09: Como usuário não cadastrado, quero poder entrar em contato com uma república, por meios externos de comunicação (Whatsapp).


# Casos de Uso do Sistema de Repúblicas

---

## H08: Notificações por E-mail para Usuários Cadastrados

**Caso de Uso:** UC08 - Gerenciar Notificações por E-mail  
**Atores:** Usuário Cadastrado (Estudante ou Representante de República)  

### Pré-condições:
- O usuário está cadastrado e logado no sistema.
- O usuário optou por receber notificações por e-mail.

### Fluxo Principal:
1. O sistema identifica uma atividade relevante (nova república cadastrada, vaga disponível, etc.).
2. O sistema verifica as preferências de notificação do usuário.
3. O sistema envia um e-mail com os detalhes da atividade.
4. O usuário recebe a notificação em seu e-mail cadastrado.

### Fluxos Alternativos:

**FA1: Usuário desativa notificações**  
1. O usuário acessa "Configurações de Notificação".  
2. Desmarca a opção "Receber notificações por e-mail".  
3. O sistema para de enviar e-mails para esse usuário.

### Pós-condições:
- O usuário é informado sobre atualizações relevantes conforme suas preferências.

---

## H03: Visualização de Detalhes de República para Não Cadastrados

**Caso de Uso:** UC03 - Consultar República (Com Filtros)  
**Atores:** Usuário Não Cadastrado (Visitante)  

### Pré-condições:
- O sistema possui repúblicas cadastradas.
- A API de mapas (ex: Google Maps) está disponível.

### Fluxo Principal:
1. O usuário acessa a página inicial ou a seção de buscas.
2. O sistema exibe opções de filtros (gênero, distância da UFOP, tipo de república, etc.).
3. O usuário aplica os filtros desejados.
4. O sistema consulta a API de mapas para retornar repúblicas dentro do raio selecionado.
5. O sistema exibe uma lista de repúblicas filtradas com miniaturas (foto, preço, localização).
6. O usuário seleciona uma república para ver detalhes (descrição, fotos, preço exato, contato, avaliações).

### Fluxos Alternativos:

**FA1: Nenhuma república encontrada**  
1. O sistema retorna a mensagem: "Nenhuma república corresponde aos filtros aplicados."  
2. O usuário ajusta os filtros ou remove alguns.

### Pós-condições:
- O usuário visualiza informações suficientes para decidir se entra em contato.

---

## H07: Avaliação de República por Estudantes Cadastrados

**Caso de Uso:** UC07 - Avaliar República  
**Atores:** Usuário Cadastrado (Estudante)  

### Pré-condições:
- O usuário está logado.
- A república existe no sistema.

### Fluxo Principal:
1. O usuário acessa a página da república que deseja avaliar.
2. Clica em "Avaliar República".
3. O sistema exibe um formulário (nota de 1 a 5, comentário opcional).
4. O usuário preenche e envia a avaliação.
5. O sistema valida os dados e salva a avaliação.
6. A média de avaliações da república é atualizada.

### Fluxos Alternativos:

**FA1: Editar avaliação existente**  
1. O usuário acessa "Minhas Avaliações".  
2. Seleciona "Editar" e ajusta os campos.  
3. O sistema atualiza a avaliação.

### Pós-condições:
- A república recebe feedback para ajudar outros estudantes.
- O estudante contribui para a comunidade.



