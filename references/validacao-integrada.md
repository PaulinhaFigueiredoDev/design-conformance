# Validação integrada

Na raiz da skill, com Node.js 24.22.1+ da série 24, execute `npm ci`, `npm run setup` e `npm run doctor`. O setup instala o Chromium. No projeto analisado, mantenha `designspec.config.json` e a especificação configurados conforme [designspec](https://github.com/Eronred/designspec). A ferramenta roda em modo de checagem e a análise fica pendente quando falta a configuração.

Copie `templates/mapa.json` e `templates/escopo.json` para a aplicação. No mapa, informe um seletor único e o ID da camada dentro do frame para cada nome. No escopo, liste as propriedades CSS em camelCase por nome. Inicie a aplicação e disponibilize `FIGMA_ACCESS_TOKEN` no ambiente com leitura ao frame.

Na raiz da skill, execute:

```bash
npm run validate -- \
  --project /caminho/da/aplicacao \
  --url http://localhost:3000/praticar \
  --figma 'LINK_DO_FRAME_COM_NODE_ID' \
  --map mapa.json --scope escopo.json --screen praticar
```

Para usar um PNG local, troque `--figma` por `--reference` e preencha os valores esperados em `styles` no mapa. Os caminhos de mapa, escopo e PNG são relativos ao projeto.

O JSON consolidado fica em `artifacts/<tela>/<rodada>/validation-report.json`. Ele aponta para o HTML original do Delta. A conformidade divide o número de propriedades comprovadamente conformes pelo total previsto. A cobertura divide as verificações conclusivas pelo total previsto. Violações estáticas são registradas no mesmo JSON. Uma aplicação renderizada igual ao design ainda pode violar uma regra do design system.
