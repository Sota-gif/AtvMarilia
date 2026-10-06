SMARTPARK — PROTÓTIPO COM ÁREA SEPARADA

Arquivos:
- index.html  = área pública do cliente
- login.html  = login do gerente
- gerente.html = painel do gerente
- app.js = funcionamento da área pública
- gerente.js = funcionamento do painel
- style.css = visual

LOGIN DE DEMONSTRAÇÃO:
Usuário: gerente
Senha: 1234

COMO FUNCIONA:
1. Abra index.html para a área pública.
2. O cliente só consegue ver vagas e preço. Não existem controles para modificar nada.
3. Abra login.html para entrar como gerente.
4. No painel do gerente, clique nas vagas para alternar entre livre/ocupada.
5. Altere o preço e salve.
6. As informações são compartilhadas entre as páginas usando localStorage do navegador.
7. Para sair do painel, use Sair.

IMPORTANTE:
Esta é uma demonstração sem servidor. O usuário/senha é apenas uma simulação e os dados ficam no navegador.
No sistema real, o login, preço e estado das vagas deverão ficar no backend/banco de dados.

FUTURO:
A estrutura já deixa espaço para conectar câmeras/sensores, alertas, reconhecimento de ocupação e monitoramento de segurança.
