# Política de conformidade
- Compare aparência, não conteúdo textual. Não compare nomes, horários, valores monetários, mensagens, quantidades de itens ou mocks. Textos obrigatórios podem ser auditados separadamente por solicitação explícita, fora da comparação automática.
- Compare cores sólidas, tipografia, bordas, padding por lado, gaps por eixo e alinhamento quando representados de forma equivalente. Não compare coordenadas absolutas. Dimensões somente quando explicitamente fixas; texto, hug, fill e elementos de tamanho indeterminado não têm dimensão rígida.
- Nesta versão, compare gaps explícitos de Auto Layout; distâncias geométricas entre irmãos ainda não são calculadas automaticamente. Não infira padding de layouts livres. Não compare gap declarado quando distribuição SPACE_BETWEEN ou wrap torna o resultado dependente do estado.
- Normalize cores CSS, unidades px e alinhamento start/end segundo direction. Tolerância geométrica padrão 1 CSS px; fonte e borda 0,5px. Não considere alias de fontes como equivalência comprovada; pilha de fontes é somente evidência declarativa.
- Sem associação confiável, propriedade ausente, fundo composto, viewport divergente para geometria ou estilo não comparável: inconclusivo. Exclusões justificadas são não aplicáveis, não conformes. Não marque nenhuma propriedade como conforme sem evidência.
- Relatório: três indicadores e barra, tabela principal apenas divergências, agrupamento de cobertura e evidência estática separada. Não duplique achados estáticos e runtime. Não apresente resultado como aprovação integral se cobertura parcial.

## Histórico de validações
- Versão contínua por tela, `v001_DD-MM-AA`, sem reiniciar na mudança de data. A reserva é exclusiva; não sobrescrever. Pastas incompletas podem deixar lacunas e não entram nas rodadas concluídas.
- Comparar somente frame, viewport, rota e estado equivalentes, com identidade de verificação (nodeId, propriedade, valor esperado). Resolvida: failed → passed; persistente: failed → failed; nova: passed → failed. Verificação ausente, inconclusiva ou alterada não prova resolução nem regressão.
- Conformidade usa apenas verificações conclusivas; a barra inclui inconclusivas. Redução percentual inicial só quando o conjunto de verificações e a cobertura conclusiva são equivalentes.
- Histórico e metadados no JSON existente; nenhuma dependência externa ou arquivo extra. Rodadas não medem produtividade individual.

## Contrato obrigatório
- Extração, análise estática, runtime, mapeamento, normalização, comparação e geração são etapas obrigatórias. Não use status skipped.
- A análise estática completed exige evidência registrada; partial e blocked exigem justificativa. O motor impede status global passed se a análise estática não estiver concluída.
- Exija contexto, viewport válido, IDs únicos e associações existentes. Não trate exclusão ou ausência de propriedade como aprovação. Elemento aplicável sem correspondência ou propriedades verificáveis impede aprovação integral.
- Evals avaliam a Skill separadamente; não são uma etapa de validação da aplicação.
