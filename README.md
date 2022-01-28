# MiniLinkApp
Atividade 3 - Desenvolvimento Back-end para Aplicações Mobile</br >
</br >
Método POST para encurtar um URL e gravar no banco de dados:<br>
Header: Content-Type: application/json<br>
http://localhost:3333/novo/miniLink<br>
Body: { "linkOriginal" : "https://github.com/" }<br>
</br >
Método GET que retorna um URL encurtado (MiniLink) conforme um id.<br >
http://localhost:3333/consulta/miniLink/:id<br >
Exemplo..: http://localhost:3333/consulta/miniLink/w1ScE<br >
Resultado: http://localhost:3333/w1ScE<br >
</br >
Método POST que retorna todos os URLs encurtados (MiniLinks) em uma data específica.<br >
Header: Content-Type: application/json<br>
http://localhost:3333/lista/miniLinks/porData<br>
Body: { "dataMiniLink" : "27/01/2022" }<br>
</br >
Método GET que retorna um URL encurtado (MiniLink) conforme o encurtamento do URL.
http://localhost:3333/consulta/miniLink/:id<br >
Exemplo..: http://localhost:3333/consulta/miniLink/w1ScE<br >
Resultado: http://localhost:3333/w1ScE<br >
</br >
Método GET que redireciona o URL encurtado (MiniLink) para o URL original;
http://localhost:3333/:id<br >
Exemplo..: http://localhost:3333/w1ScE<br >
Resultado: https://www.google.com/<br >
</br >
