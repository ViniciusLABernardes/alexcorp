document.addEventListener("DOMContentLoaded", function () {
    const messageButton = document.querySelector('.messageButton');
    const userMessageArea = document.querySelector('.userMessageArea');
 

    if (messageButton && userMessageArea) {
        // Função para verificar a posição do usuário e mostrar/ocultar o botão
        function toggleMessageButtonVisibility() {
            const userMessageAreaRect = userMessageArea.getBoundingClientRect();
           
            const windowHeight = window.innerHeight;

            // Verifica se o usuário está acima ou abaixo da área das mensagens
            if (
                (userMessageAreaRect.top >= 0 && userMessageAreaRect.bottom <= windowHeight) 
            ) {
                // O usuário está na área ou abaixo dela, oculta o botão
                messageButton.style.display = 'none';
            } else {
                // O usuário está acima da área, exibe o botão
                messageButton.style.display = 'flex';
            }
        }

        // Adiciona um ouvinte de rolagem para verificar a posição do usuário
        window.addEventListener('scroll', toggleMessageButtonVisibility);

        // Adiciona um ouvinte de redimensionamento da janela para atualizar a posição ao redimensionar
        window.addEventListener('resize', toggleMessageButtonVisibility);

        // Chama a função inicialmente para configurar o estado do botão
        toggleMessageButtonVisibility();

        // Adiciona um ouvinte de clique para rolar até a área de mensagens
        messageButton.addEventListener('click', function () {
            userMessageArea.scrollIntoView({ behavior: 'smooth' });
        });
    }
});