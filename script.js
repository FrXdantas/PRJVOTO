document.addEventListener('DOMContentLoaded', () => {
    let contagem1 = 0;
    let contagem2 = 0;
    let estaBloqueado = false;
    let divSelecionada = null;
    const dataHoraAbertura = new Date().toLocaleString();
    const audioConfirma = document.getElementById("audioConfirma")

    const div1 = document.getElementById('div1');
    const div2 = document.getElementById('div2');
    const modalPrincipal = document.getElementById('myModal');
    const inputSenhaDesbloqueio = document.getElementById('unlockPassword');
    const botaoDesbloquear = document.getElementById('unlockButton');
    const inputSenhaEncerrar = document.getElementById('endVotingPassword');
    const botaoConfirmarEncerramento = document.getElementById('confirmEndVotingButton');
    const botaoEncerrarVotacao = document.getElementById('endVotingButton');
    const conteudoPrincipal = document.getElementById('mainContent');

    const modalConfirmacaoEscolha = document.getElementById('confirmChoiceModal');
    const candidatoEscolhido = document.getElementById('chosenCandidate');
    const botaoConfirmarVoto = document.getElementById('confirmVote');
    const botaoCancelarVoto = document.getElementById('cancelVote');

    const senhaDesbloqueio = 'voto';
    const senhaEncerrar = 'encerrar';

    function lidarClique(event) {
        if (estaBloqueado) {
            alert('Tela bloqueada! Digite a senha para desbloquear.');
            return;
        }

        divSelecionada = event.target;
        const nomeCandidato = divSelecionada.textContent.trim();
        candidatoEscolhido.textContent = nomeCandidato;

        modalConfirmacaoEscolha.style.display = 'block';
        conteudoPrincipal.classList.add('locked');
        estaBloqueado = true;
    }

    function confirmarVoto() {
        if (divSelecionada) {
            if (divSelecionada === div1) {
                contagem1++;
                console.log(`Div 1 clicada ${contagem1} vezes`);
            } else if (divSelecionada === div2) {
                contagem2++;
                console.log(`Div 2 clicada ${contagem2} vezes`);
            }
            modalConfirmacaoEscolha.style.display = 'none';
            modalPrincipal.style.display = 'block';
            inputSenhaDesbloqueio.style.display = 'block';
            botaoDesbloquear.style.display = 'block';
            inputSenhaEncerrar.style.display = 'none';
            botaoConfirmarEncerramento.style.display = 'none';
            inputSenhaDesbloqueio.value = '';
            audioConfirma.play();
        }
        conteudoPrincipal.classList.remove('locked');
        estaBloqueado = false;
    }

    function cancelarVoto() {
        modalConfirmacaoEscolha.style.display = 'none';
        conteudoPrincipal.classList.remove('locked');
        estaBloqueado = false;
    }

    function desbloquearTela() {
        if (inputSenhaDesbloqueio.value === senhaDesbloqueio) {
            estaBloqueado = false;
            conteudoPrincipal.classList.remove('locked');
            modalPrincipal.style.display = 'none';
        } else {
            alert('Senha para desbloquear incorreta!');
            inputSenhaDesbloqueio.value = '';
        }
    }

    function encerrarVotacao() {
        inputSenhaEncerrar.style.display = 'block';
        botaoConfirmarEncerramento.style.display = 'block';
    }

    function confirmarEncerramentoVotacao() {
        if (inputSenhaEncerrar.value === senhaEncerrar) {
            const dataFechamento = new Date().toLocaleString();
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            doc.text('Relatório de votação ', 10, 20);
            doc.text('___________________________________________', 10, 22);
            doc.text(`Abertura da urna........: ${dataHoraAbertura}`, 10, 40);
            doc.text(`Fechamento da urna..: ${dataFechamento}`, 10, 50);
            doc.text('Distribuição dos votos ', 10, 80);
            doc.text('___________________________________________', 10, 85);
            doc.text(`Total de votos CHAPA 01 : ${contagem1} `, 10, 100);
            doc.text(`Total de votos CHAPA 02 : ${contagem2} `, 10, 110);
            doc.text('___________________________________________', 10, 120);
            doc.text(`Votaram ${contagem1+contagem2} alunos`, 10, 135);
            doc.text('_______________________ ', 50, 160);
            doc.text('testemunha',70,168);
            doc.text('_______________________ ', 50, 180);
            doc.text('testemunha',70,188);
            doc.text('_______________________ ', 50, 200);
            doc.text('responsável',70,208);
            doc.text('Sistema programado por: 3 ano Técnico em Informática - CETAM',10,280);

            doc.save('ConferenciadeVotos.pdf');
            modalPrincipal.style.display = 'none';
            inputSenhaEncerrar.value = '';
            conteudoPrincipal.classList.remove('locked');
            estaBloqueado = false;
        } else {
            alert('Senha para encerrar a votação incorreta!');
            inputSenhaEncerrar.value = '';
        }
    }

    div1.addEventListener('click', lidarClique);
    div2.addEventListener('click', lidarClique);
    botaoConfirmarVoto.addEventListener('click', confirmarVoto);
    botaoCancelarVoto.addEventListener('click', cancelarVoto);
    botaoDesbloquear.addEventListener('click', desbloquearTela);
    botaoEncerrarVotacao.addEventListener('click', encerrarVotacao);
    botaoConfirmarEncerramento.addEventListener('click', confirmarEncerramentoVotacao);

    div1.addEventListener('mouseover', (event) => event.target.classList.add('hovered'));
    div1.addEventListener('mouseout', (event) => event.target.classList.remove('hovered'));
    div2.addEventListener('mouseover', (event) => event.target.classList.add('hovered'));
    div2.addEventListener('mouseout', (event) => event.target.classList.remove('hovered'));
});
