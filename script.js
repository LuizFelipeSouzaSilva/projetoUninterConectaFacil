const perguntas = [
 {p:"O que é inclusão digital?",a:["Ter muitos seguidores nas redes sociais.","Ter acesso às tecnologias e aprender a utilizá-las com autonomia.","Usar somente computadores novos."],c:1,e:"Inclusão digital envolve acesso, aprendizagem e participação segura no ambiente digital."},
 {p:"Qual programa permite acessar páginas da internet?",a:["Calculadora.","Navegador, como Chrome ou Firefox.","Editor de imagens."],c:1,e:"O navegador é o programa usado para abrir sites e páginas."},
 {p:"O que fazer se uma mensagem pedir sua senha com urgência?",a:["Enviar para resolver logo.","Compartilhar com amigos.","Não informar e verificar pelo canal oficial."],c:2,e:"Instituições confiáveis não devem pedir sua senha por mensagens."},
 {p:"Qual é uma boa prática para criar senhas?",a:["Usar a mesma senha em tudo.","Criar senhas longas e diferentes para cada conta.","Usar 123456."],c:1,e:"Senhas longas e únicas dificultam o acesso indevido às suas contas."},
 {p:"Antes de informar dados em um site, você deve:",a:["Conferir o endereço e verificar se é oficial.","Clicar no primeiro link recebido.","Ignorar o endereço."],c:0,e:"Confira o endereço com atenção e prefira canais oficiais."},
 {p:"O que é phishing?",a:["Uma atualização do celular.","Uma tentativa de enganar para obter dados ou dinheiro.","Um tipo de conexão Wi-Fi."],c:1,e:"Phishing usa mensagens ou páginas falsas para enganar pessoas."},
 {p:"Qual cuidado é importante ao usar Wi-Fi público?",a:["Fazer qualquer operação sem preocupação.","Compartilhar sua senha com desconhecidos.","Evitar operações sensíveis e preferir redes confiáveis."],c:2,e:"Redes públicas podem oferecer riscos; evite acessar serviços sensíveis nelas."},
 {p:"O que fazer ao receber um arquivo inesperado de um desconhecido?",a:["Abrir imediatamente.","Não abrir e confirmar a origem por outro canal.","Encaminhar para todos os contatos."],c:1,e:"Arquivos inesperados podem conter conteúdo perigoso ou tentativas de golpe."},
 {p:"Como verificar uma notícia antes de compartilhar?",a:["Ler só o título.","Verificar fonte, data e comparar com outras fontes confiáveis.","Compartilhar se muitas pessoas enviaram."],c:1,e:"A checagem da fonte e da data ajuda a evitar a divulgação de informações falsas."},
 {p:"Para que serve a verificação em duas etapas?",a:["Adicionar uma camada extra de proteção à conta.","Aumentar o volume do celular.","Apagar mensagens antigas."],c:0,e:"Ela pede uma segunda confirmação além da senha."},
 {p:"Onde é mais recomendado baixar aplicativos?",a:["Em links aleatórios recebidos por mensagem.","Em lojas oficiais do dispositivo.","Em qualquer página que prometa aplicativos grátis."],c:1,e:"As lojas oficiais oferecem mecanismos adicionais de verificação e segurança."},
 {p:"Se esquecer a senha de uma conta, qual é o caminho mais seguro?",a:["Pagar alguém que enviou uma mensagem oferecendo ajuda.","Enviar seu código de confirmação a outra pessoa.","Usar a opção oficial de recuperação de senha."],c:2,e:"Use sempre o processo de recuperação do próprio serviço e não compartilhe códigos."}
];
const perguntasEl=document.getElementById("perguntasQuiz");
const quizBarra=document.getElementById("quizBarra");
const quizContador=document.getElementById("quizContador");
const resultadoQuiz=document.getElementById("resultadoQuiz");
function montarQuiz(){
  perguntasEl.innerHTML=perguntas.map((q,i)=>`<section class="questao"><h3>${i+1}. ${q.p}</h3>${q.a.map((alt,j)=>`<label class="alternativa"><input type="radio" name="q${i}" value="${j}" required><span>${alt}</span></label>`).join("")}</section>`).join("");
  atualizarProgresso();
}
function atualizarProgresso(){
  const respondidas=perguntas.filter((q,i)=>document.querySelector(`input[name="q${i}"]:checked`)).length;
  quizBarra.style.width=(respondidas/perguntas.length*100)+"%";
  quizContador.textContent=`${respondidas} de ${perguntas.length} respondidas`;
}
perguntasEl.addEventListener("change",atualizarProgresso);
document.getElementById("quizForm").addEventListener("submit",e=>{
  e.preventDefault();
  const faltam=perguntas.filter((q,i)=>!document.querySelector(`input[name="q${i}"]:checked`)).length;
  if(faltam){resultadoQuiz.textContent=`Ainda faltam ${faltam} pergunta(s). Responda todas para conferir.`;return;}
  let pontos=0;let revisao=[];
  perguntas.forEach((q,i)=>{
    const marcada=Number(document.querySelector(`input[name="q${i}"]:checked`).value);
    if(marcada===q.c)pontos++;
    else revisao.push(`<li><strong>${i+1}. ${q.p}</strong> ${q.e}</li>`);
  });
  const percentual=Math.round(pontos/perguntas.length*100);
  let mensagem=percentual>=85?"Excelente! Você demonstrou ótimo domínio do conteúdo.":percentual>=60?"Muito bem! Você já aprendeu bastante. Revise os pontos indicados.":"Você está no caminho! Leia novamente os tutoriais e tente outra vez.";
  resultadoQuiz.innerHTML=`<h3>Você acertou ${pontos} de ${perguntas.length} (${percentual}%).</h3><p>${mensagem}</p>${revisao.length?`<p>Confira estas explicações:</p><ul>${revisao.join("")}</ul>`:"<p>Você acertou todas as questões. Parabéns!</p>"}`;
  resultadoQuiz.scrollIntoView({behavior:"smooth",block:"nearest"});
});
document.getElementById("reiniciarQuiz").addEventListener("click",()=>{document.getElementById("quizForm").reset();resultadoQuiz.textContent="";montarQuiz();});
montarQuiz();

const menu=document.getElementById("menu");
const menuToggle=document.getElementById("menuToggle");
menuToggle.addEventListener("click",()=>{
  const aberto=menu.classList.toggle("aberto");
  menuToggle.setAttribute("aria-expanded",String(aberto));
});
menu.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{menu.classList.remove("aberto");menuToggle.setAttribute("aria-expanded","false");}));
let escala=1;
document.getElementById("aumentarFonte").addEventListener("click",()=>{escala=Math.min(1.3,escala+.1);document.documentElement.style.fontSize=(16*escala)+"px";});
document.getElementById("diminuirFonte").addEventListener("click",()=>{escala=Math.max(.85,escala-.1);document.documentElement.style.fontSize=(16*escala)+"px";});
document.getElementById("contraste").addEventListener("click",e=>{const ativo=document.body.classList.toggle("contraste");e.currentTarget.setAttribute("aria-pressed",String(ativo));e.currentTarget.textContent=ativo?"◐ Contraste: ligado":"◐ Contraste";});
document.getElementById("ano").textContent=new Date().getFullYear();
