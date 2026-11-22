# Análise estática
Etapa obrigatória. Confirme a correspondência entre o repositório atual e a aplicação inspecionada. Inspecione JSX/HTML, CSS, tokens, classes, componentes, bindings, layouts e estados de toda a tela. Identifique dados de backend, props, listas e condicionais. Não execute código de negócio, modifique arquivos ou leia segredos.

Registre cada evidência com nodeId, propriedade, arquivo relativo ao repositório, linha (número positivo ou null se não localizada) e explanation (descrição objetiva da origem). Não copie dados pessoais. A análise estática auxilia mapeamento e localização de causas; não duplique divergências visuais. CSS computado é a referência da aparência final.

Status obrigatório: completed (inspeção concluída e evidências reais registradas), partial (inspeção incompleta), blocked (não foi possível inspecionar). Para partial e blocked, registre staticReason não vazio. Não omita o status. Não use skipped. Não declare conformidade integral com análise parcial ou bloqueada.
