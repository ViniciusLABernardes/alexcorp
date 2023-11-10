
//----------------------------------texto abaixo do nickname e senha ao clicar---------------------//
const nicknameForm = document.querySelector('.nicknameform');
const nicknameSpecs = document.querySelector('.nicknamespecs');
const nicknameSpecs2 = document.querySelector('.nicknamespecs2');


nicknameForm.addEventListener('input', () => {
    const inputValue = nicknameForm.value.trim(); // Remove espaços em branco no início e no fim

    if (inputValue === '' || inputValue.length < 6 || /\s/.test(inputValue)) {
        showSpecs2 = false; // Se o valor não atender aos requisitos, mostrar specs 1
        updateNicknameSpecsVisibility();
    } else {
        // Se o valor atender aos requisitos, fazer uma solicitação AJAX para verificar no servidor
        checkUsernameAvailability(inputValue);
    }
});

function checkUsernameAvailability(username) {
    // Faz uma solicitação AJAX para verificar se o nome de usuário está disponível no servidor
    
    const endpoint = `api/cadastrar.php?username=${encodeURIComponent(username)}`;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', endpoint, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const response = xhr.responseText;

                if (response === '*nome disponivel') {
                    showSpecs2 = true; // Nome de usuário disponível, mostrar specs 2
                } else {
                    showSpecs2 = false; // Nome de usuário já existe, mostrar specs 1
                }

                updateNicknameSpecsVisibility();
            } else {
               
                console.error('Erro na solicitação AJAX');
            }
        }
    };

    xhr.send();
}

nicknameForm.addEventListener('focus', () => {
    updateNicknameSpecsVisibility();
});

nicknameForm.addEventListener('blur', () => {
    hideNicknameSpecs();
});

function updateNicknameSpecsVisibility() {
    if (showSpecs2) {
        nicknameSpecs.style.display = 'none';
        nicknameSpecs2.style.display = 'block';
    } else {
        nicknameSpecs.style.display = 'block';
        nicknameSpecs2.style.display = 'none';
    }
}

function hideNicknameSpecs() {
    nicknameSpecs.style.display = 'none';
    nicknameSpecs2.style.display = 'none';
}

//----------------------------------------------------------------FIM VERIFICAO NICKNAME---------------------------------------------//
const passwordForm = document.querySelector('.passwordform');
const passwordForm2 = document.querySelector('.passwordform2');

const passwordSpecs = document.querySelector('.passwordspecs');

const passwordCheck = document.querySelector('.passwordCheck');
const passwordCheckspecs = document.querySelector('.passwordcheckspecs');

const passwordSpecs2 = document.querySelector('.passwordspecs2');
const showPasswordButton = document.getElementById('showPasswordButton');
const showPasswordButton2 = document.getElementById('showPasswordButton2');


let showPasswordSpecs2 = false; // Variável para controlar qual specs mostrar

const passwordField = document.getElementById('password');

// Adiciona um evento de clique ao botão
showPasswordButton.addEventListener('click', () => {
    // Alterna o tipo do campo de senha entre "password" e "text"
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
    } else {
        passwordField.type = 'password';
    }
});
showPasswordButton2.addEventListener('click', () => {
    // Alterna o tipo do campo de senha entre "password" e "text"
    if (passwordForm2.type === 'password') {
        passwordForm2.type = 'text';
    } else {
        passwordForm2.type = 'password';
    }
});

passwordForm.addEventListener('focus', () => {
    updatePasswordSpecsVisibility();
});

passwordForm.addEventListener('blur', () => {
    hidePasswordSpecs();
});

passwordForm.addEventListener('input', () => {
    const inputValue = passwordForm.value.trim();
    const inputSpace = /\s/;
    const uppercaseRegex = /[A-Z]/; // Regex para verificar letra maiúscula
    const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/; // Regex para verificar caractere especial
    const numberRegex = /[0-9]/;

    if (
        inputValue === '' ||
        inputValue.length < 8 ||
        !uppercaseRegex.test(inputValue) ||
        !specialCharRegex.test(inputValue) ||
        !numberRegex.test(inputValue)||
        inputSpace.test(inputValue) 
    ) {
        showPasswordSpecs2 = false; // Se o valor não atender aos requisitos, mostrar specs 1
    } else {
        showPasswordSpecs2 = true; // Se o valor atender aos requisitos, mostrar specs 2
    }

    updatePasswordSpecsVisibility();
});

function checkPassword() {
    const password = document.querySelector('.passwordform').value; // obtém o valor do campo de senha
    const confirmPassword = passwordCheck.value; // obtém o valor do campo de confirmação de senha

    if (password !== confirmPassword) {
        passwordCheckspecs.style.display = 'block';
    } else {
        passwordCheckspecs.style.display = 'none';
    }
}
passwordCheck.addEventListener('input', checkPassword);


function updatePasswordSpecsVisibility() {
    if (showPasswordSpecs2) {
        passwordSpecs.style.display = 'none';
        passwordSpecs2.style.display = 'block';
    } else {
        passwordSpecs.style.display = 'block';
        passwordSpecs2.style.display = 'none';
    }
}

function hidePasswordSpecs() {
    passwordSpecs.style.display = 'none';
    passwordSpecs2.style.display = 'none';
}
//----------------------------------------------------------------------CADASTRO-------------------------------------------------------------//
document.addEventListener("DOMContentLoaded", function () {
    // Função para enviar dados do formulário usando AJAX

    function redirectToLogin() {
        setTimeout(function () {
            window.location.href = "login.html"; // Redireciona para a página de login após 5 segundos
        }, 3300);
    }

    function isValidEmail(email) {
        // Expressão regular para verificar o formato de um email
        const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

        return emailRegex.test(email);
    }

    function showModal(message) {
        const modal = document.getElementById("modal");
        const modalText = document.getElementById("modal-text");

        modalText.textContent = message;
        modal.style.display = "block";

        // Fecha o modal quando o usuário clica fora da área do mesmo
        window.onclick = function (event) {
            var modal = document.getElementById("modal");
            if (event.target === modal) {
                modal.style.display = "none";
            }
        };
        // Fecha o modal quando o usuário clica no botão de fechar (X)
        const modalClose = document.getElementById("modal-close");
        modalClose.onclick = function () {
            modal.style.display = "none";
        };
    }

    function showLoadingModal() {
        const loadingModal = document.getElementById("loading-modal");
        loadingModal.style.display = "block";
    }

    function hideLoadingModal() {
        const loadingModal = document.getElementById("loading-modal");
        loadingModal.style.display = "none";
    }

    function submitForm() {
        var username = document.getElementById("username").value;
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var confirmPassword = document.querySelector('.passwordCheck').value;
        var checkbox = document.querySelector('.checkbox');

        // Verifica se algum dos campos está vazio
        if (username === "" || email === "" || password === "" || confirmPassword === "") {
            showModal("Preencha todos os campos!");
            return; // Impede o envio do formulário se algum campo estiver vazio
        } else if (username.length < 6) {
            showModal("Nome de usuário deve ter pelo menos 6 caracteres.");
            return; // Impede o envio do formulário se o nome de usuário for curto
        } else if (!isValidEmail(email)) {
            showModal("O email inserido não é válido.");
            return; // Impede o envio do formulário se o email não for válido
        } else if (/\s/.test(username)) {
            showModal("Nome de usuário não pode conter espaços!");
            return;
        } else if (/\s/.test(password) || /\s/.test(confirmPassword)) {
            showModal("Senha não pode conter espaços!");
            return;
        } else if (!checkbox.checked) {
            showModal("Aceite os termos de privacidade se deseja prosseguir");
            return;
        }

        // Mostra o modal de carregamento
        showLoadingModal();

        // Verifique a disponibilidade do nome de usuário no servidor
        checkUsernameAvailability(username);
    }

    function checkUsernameAvailability(username) {
        // Faça uma solicitação AJAX para verificar se o nome de usuário está disponível no servidor
        // Substitua 'seu_endpoint_de_verificação' pelo URL do seu arquivo 'verificar_usuario.php'
        const endpoint = `api/cadastrar.php?username=${encodeURIComponent(username)}`;

        const xhr = new XMLHttpRequest();
        xhr.open('GET', endpoint, true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const response = xhr.responseText;

                    if (response === '*nome indisponivel') {
                        showModal("Nome de usuário já está em uso.");
                        // Oculta o modal de carregamento
                        hideLoadingModal();
                    } else if (response === '*nome disponivel') {
                        // Nome de usuário disponível, continue com o envio do formulário
                        submitFormToServer();
                    } else {
                        // Trate outros casos de resposta, se necessário
                        showModal("Erro na verificação do nome de usuário.");
                        // Oculta o modal de carregamento
                        hideLoadingModal();
                    }
                } else {
                    // Trate os erros de solicitação aqui
                    console.error('Erro na solicitação AJAX');
                    // Oculta o modal de carregamento
                    hideLoadingModal();
                }
            }
        };

        // Envia a solicitação de verificação do nome de usuário
        xhr.send();
    }

    function submitFormToServer() {
        var username = document.getElementById("username").value;
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;

        // Prepara os dados para envio
        var data = "username=" + encodeURIComponent(username) + "&email=" + encodeURIComponent(email) + "&password=" + encodeURIComponent(password);

        // Envia os dados para o servidor
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "api/cadastrar.php", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const response = xhr.responseText;

                    if (response === "Cadastrado com sucesso!") {
                        showModal("Cadastro realizado com sucesso!");
                        redirectToLogin();
                    } else if (response === "Email já cadastrado!") {
                        showModal("Email já cadastrado!");
                    } else {
                        showModal("Erro ao cadastrar: " + response);
                    }
                } else {
                    // Trate os erros de solicitação aqui
                    console.error('Erro na solicitação AJAX');
                }

                // Oculta o modal de carregamento após a conclusão
                hideLoadingModal();
            }
        };

        // Envia os dados
        xhr.send(data);
    }

    document.getElementById("submit").addEventListener("click", function (e) {
        e.preventDefault(); // Impede o envio do formulário padrão
        submitForm(); // Chama a função que envia os dados
    });
});

//----------------------------------------------------------MODAL-----------------------------------------------//
function showModal(message) {
    const modal = document.getElementById("modal");
    const modalText = document.getElementById("modal-text");
   
    modalText.textContent = message;
    modal.style.display = "block";

    // Fecha o modal quando o usuário clica fora da área do mesmo
    window.onclick = function(event) {
        var modal = document.getElementById("modal");
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
    // Fecha o modal quando o usuário clica no botão de fechar (X)
    const modalClose = document.getElementById("modal-close");
    modalClose.onclick = function () {
        modal.style.display = "none";
    };
}
function showModal2(message, videoURL, linkText, linkURL) {
    const modal2 = document.getElementById("modal2");
    const modalText2 = document.getElementById("modal-text2");
    const videoContainer2 = document.getElementById("video-container2");
    const linkContainer2 = document.getElementById("link-container2");

    // Limpa o conteúdo anterior
    videoContainer2.innerHTML = "";
    linkContainer2.innerHTML = "";

    // Adiciona uma mensagem acima do vídeo
    const messageElement = document.createElement("p");
    messageElement.textContent = message;
    modalText2.appendChild(messageElement);

    // Adiciona um elemento de vídeo ao modal
    if (videoURL) {
        const video = document.createElement("video");
        video.style.width = "80%";
       
        video.controls = true;
        video.src = videoURL;
        videoContainer2.appendChild(video);
    }

    // Adiciona um link abaixo do vídeo, se fornecido
    if (linkText && linkURL) {
        const link = document.createElement("a");
        link.style.color = "#fff";
        link.textContent = linkText;
        link.href = linkURL;
        linkContainer2.appendChild(link);
    }

    // Exibe o modal
    modal2.style.display = "block";

    // Fecha o modal quando o usuário clica fora da área do mesmo
    window.onclick = function(event) {
        if (event.target === modal2) {
            modal2.style.display = "none";
        }
    };

    // Fecha o modal quando o usuário clica no botão de fechar (X)
    const modalClose2 = document.getElementById("modal-close2");
    modalClose2.onclick = function () {
        modal2.style.display = "none";
    };
}