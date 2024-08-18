document.addEventListener('DOMContentLoaded', () => {
    // Contadores de cliques
    let count1 = 0;
    let count2 = 0;
    let isLocked = false; // Variável para rastrear o estado de bloqueio

    // Variável para armazenar a data e hora fixa
    const dateTimeOpened = new Date().toLocaleString();

    // Seleciona os elementos
    const div1 = document.getElementById('div1');
    const div2 = document.getElementById('div2');
    const modal = document.getElementById('myModal');
    const unlockPasswordInput = document.getElementById('unlockPassword');
    const unlockButton = document.getElementById('unlockButton');
    const endVotingPasswordInput = document.getElementById('endVotingPassword');
    const confirmEndVotingButton = document.getElementById('confirmEndVotingButton');
    const endVotingButton = document.getElementById('endVotingButton');
    const mainContent = document.getElementById('mainContent');

    // Senhas corretas
    const unlockPassword = 'votar'; // Senha para desbloquear a tela
    const endVotingPassword = 'encerrar'; // Senha para encerrar a votação e gerar o PDF

    // Função para lidar com o clique
    function handleClick(event) {
        if (isLocked) {
            alert('Tela bloqueada! Digite a senha para desbloquear.');
            return;
        }

        if (event.target === div1) {
            count1++;
            console.log(`Div 1 clicada ${count1} vezes`);
        } else if (event.target === div2) {
            count2++;
            console.log(`Div 2 clicada ${count2} vezes`);
        }
        // Mostra a modal e limpa o campo de senha de desbloqueio
        modal.style.display = 'block';
        unlockPasswordInput.style.display = 'block'; // Mostra o campo de senha de desbloqueio
        unlockButton.style.display = 'block'; // Mostra o botão de desbloqueio
        endVotingPasswordInput.style.display = 'none'; // Esconde o campo de senha para encerrar votação
        confirmEndVotingButton.style.display = 'none'; // Esconde o botão de confirmação para encerrar votação
        mainContent.classList.add('locked'); // Bloqueia o conteúdo
        isLocked = true; // Define a tela como bloqueada
        unlockPasswordInput.value = '';
    }

    // Função para desbloquear a tela
    function unlockScreen() {
        if (unlockPasswordInput.value === unlockPassword) {
            isLocked = false; // Desbloqueia a tela
            mainContent.classList.remove('locked'); // Remove a classe de bloqueio
            modal.style.display = 'none'; // Fecha a modal
        } else {
            alert('Senha para desbloquear incorreta!');
            unlockPasswordInput.value = ''; // Limpa o campo de senha
        }
    }

    // Função para encerrar a votação e gerar o PDF
    function endVoting() {
        endVotingPasswordInput.style.display = 'block'; // Mostra o campo de senha para encerrar votação
        confirmEndVotingButton.style.display = 'block'; // Mostra o botão para confirmar encerramento
    }

    // Função para confirmar o encerramento da votação
    function confirmEndVoting() {
        if (endVotingPasswordInput.value === endVotingPassword) {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            doc.text('Relatório de votação ', 10, 10);
            doc.text('=========================================== ', 10, 20);
            doc.text(`Data e Hora de Abertura: ${dateTimeOpened}`, 10, 30);
            doc.text(`CHAPA 1: ${count1} Votos`, 10, 50);
            doc.text(`CHAPA 2: ${count2} Votos`, 10, 60);
            doc.text('=========================================== ', 10, 80);
            doc.text(`Total de votos: ${count1+count2}`, 10, 100);
            doc.save('ConferenciadeVotos.pdf');
            modal.style.display = 'none'; // Fecha a modal
            endVotingPasswordInput.value = ''; // Limpa o campo de senha
            mainContent.classList.remove('locked'); // Remove o bloqueio do conteúdo
            isLocked = false; // Define a tela como desbloqueada
        } else {
            alert('Senha para encerrar a votação incorreta!');
            endVotingPasswordInput.value = ''; // Limpa o campo de senha
        }
    }

    // Adiciona os ouvintes de evento
    div1.addEventListener('click', handleClick);
    div2.addEventListener('click', handleClick);
    unlockButton.addEventListener('click', unlockScreen);
    endVotingButton.addEventListener('click', endVoting);
    confirmEndVotingButton.addEventListener('click', confirmEndVoting);

    // Adiciona os ouvintes de evento para o mouse
    div1.addEventListener('mouseover', (event) => event.target.classList.add('hovered'));
    div1.addEventListener('mouseout', (event) => event.target.classList.remove('hovered'));
    div2.addEventListener('mouseover', (event) => event.target.classList.add('hovered'));
    div2.addEventListener('mouseout', (event) => event.target.classList.remove('hovered'));
});
