# MiniLinkApp
Atividade 3 - Desenvolvimento Back-end para Aplicações Mobile</br >
</br >
OBS: O arquivo .env não está disponivel no github, foi enviado por anexo na atividade. (Por motivo de segurança).
</br >
Documentação swagger:<br>
Header: Content-Type: application/json<br>
http://localhost:3000/doc<br>
</br >
Método POST para encurtar um URL e gravar no banco de dados:<br>
Header: Content-Type: application/json<br>
http://localhost:3000/novo/miniLink<br>
Body: { "linkOriginal" : "https://github.com/" }<br>
</br >
Método GET que retorna um URL encurtado (MiniLink) conforme um id.<br >
http://localhost:3000/consulta/miniLink/:id<br >
Exemplo..: http://localhost:3000/consulta/miniLink/w1ScE<br >
Resultado: http://localhost:3000/w1ScE<br >
</br >
Método POST que retorna todos os URLs encurtados (MiniLinks) em uma data específica.<br >
Header: Content-Type: application/json<br>
http://localhost:3000/lista/miniLinks/porData<br>
Body: { "dataMiniLink" : "27/01/2022" }<br>
</br >
Método GET que retorna um URL encurtado (MiniLink) conforme o encurtamento do URL.
http://localhost:3000/consulta/miniLink/:id<br >
Exemplo..: http://localhost:3000/consulta/miniLink/w1ScE<br >
Resultado: http://localhost:3000/w1ScE<br >
</br >
Método GET que redireciona o URL encurtado (MiniLink) para o URL original;
http://localhost:3000/:id<br >
Exemplo..: http://localhost:3000/w1ScE<br >
Resultado: https://www.google.com/<br >
</br >
