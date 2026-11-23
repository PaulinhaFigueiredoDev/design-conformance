---
name: design-conformance
description: Valida a conformidade entre um frame do Figma e uma interface web, incluindo checagem do design system no código.
---

# Design Conformance

1. Identifique a raiz do repositório da aplicação, a URL da tela, o frame e o estado visual. Use um slug por tela e estado.
2. Monte o mapa entre camadas do Figma e seletores únicos. Defina as propriedades esperadas com os exemplos em `templates/`. Reutilize o mesmo escopo em rodadas comparáveis.
3. Execute o fluxo em [validação integrada](references/validacao-integrada.md). O designspec analisa o código e o Figma Delta mede a tela.
4. Abra o JSON de resultado. Informe conformidade, cobertura, divergências, verificações inconclusivas e achados estáticos. Em caso de falha de captura, informe o motivo.
5. Para o fluxo anterior com Chrome DevTools MCP, consulte [protocolo original](references/protocolo-original.md).
