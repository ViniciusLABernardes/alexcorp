//-------------------------------------cookie-----------------------------------------------------//
function getCookie(cookieName) {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(';');
    for (var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return "";
}
function isMobileVersion() {
    return window.innerWidth <= 1024; // Altere o valor conforme necessário
}
function updateTopRightDisplay() {
    var topRight = document.getElementById('topRight');
    var topRightMobile = document.getElementById('topRightMobile');
    var topRightLogedPc = document.getElementById('topRightLogedPc');
    var topRightLogedMobile = document.getElementById('topRightLogedMobile');
    
    var userLoggedIn = getCookie("userLoggedIn");
    var isMobile = isMobileVersion();

    if (userLoggedIn === "true") {
        // Usuário está logado
        topRight.style.display = isMobile ? 'none' : 'none';
        topRightMobile.style.display = isMobile ? 'none' : 'none';
        topRightLogedPc.style.display = isMobile ? 'none' : 'flex';
        topRightLogedMobile.style.display = isMobile ? 'flex' : 'none';
    } else {
        // Usuário não está logado
        topRight.style.display = isMobile ? 'none' : 'flex';
        topRightMobile.style.display = isMobile ? 'flex' : 'none';
        topRightLogedPc.style.display = isMobile ? 'none' : 'none';
        topRightLogedMobile.style.display = isMobile ? 'none' : 'none';
    }
}

// Adicione um event listener no redimensionamento da janela para atualizar a exibição
window.addEventListener("resize", updateTopRightDisplay);


// Execute a função para definir o cabeçalho no carregamento da página
document.addEventListener("DOMContentLoaded", function () {
    updateTopRightDisplay();

    var isIndexPage = document.body.classList.contains('index-page');
    var userLoggedIn = getCookie("userLoggedIn");

    if (!isIndexPage && userLoggedIn !== "true") {
        // O usuário não está logado e não está na página index,
        // crie e exiba o modal
        showModalWithVideo(
            "Entre no site oficial para desfrutar de todas as funcionalidades.",
            "Visite o site oficial",
            "https://seusiteoficial.com"
        );
    } else if (userLoggedIn === "true") {
        // O usuário está logado, faça o que for necessário

        // Exibe o nome do usuário no campo 'nickname'
        var username = getCookie("username");
        var nickname = document.querySelector('.nickname');
        nickname.textContent = username;

        // Exibe o nome de usuário nos campos correspondentes
        var nickname2 = document.querySelector('.nickname2');
        if (nickname2) {
            nickname2.textContent = username;
        }
        var nickname3 = document.querySelector('.nickname3');
        if (nickname3) {
            nickname3.textContent = username;
        }

        var nicknameForum = document.querySelector('.nicknameForum');
        if (nicknameForum) {
            nicknameForum.textContent = username;
        }

        // Aplicar a função de logout ao botão "Sair"
        var buttonLogout = document.querySelector('.buttonOut');
        buttonLogout.addEventListener('click', function () {
            logout(); // Chama a função de logout ao clicar no botão "Sair"
        });

        // Aplicar a função de logout ao botão "Sair" na área de recursos
        var buttonLogout2 = document.querySelector('.resources .options .buttonOut');
        buttonLogout2.addEventListener('click', function () {
            logout(); // Chama a função de logout ao clicar no botão "Sair"
        });

        // Carregar o histórico de mensagens se necessário
        carregarHistoricoMensagens(username);
    }
});
//-----------------------------------MODAL PARA VERSAO DEMO------------------------------------//
document.addEventListener("DOMContentLoaded", function () {
    // Chama a função showModalWithVideo com os parâmetros desejados
    showModal2(
        "Esta versão é apenas uma amostra, entre no site oficial para desfrutar de todas as funcionalidades:",
        "assets/images/demo.mp4",
        "Alexcorp",
        "https://seusiteoficial.com"
    );
});

//------------------------------------logout---------------------------------------------------//
function logout() {
    // Limpa os cookies
    console.log("Função de logout chamada");
    document.cookie = "userLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    showLoadingModal();
    // Redireciona o usuário para a página index
    setTimeout(function () {
        window.location.href = "index.html";
    }, 2000);
}

//-------------------------------------header--------------------------------------------------//
let lastScrollPosition = 0; // última posição do scroll
const header = document.getElementById('header-site');
const currentPage = window.location.pathname;
const pagesWithVisibleHeader = ['/login.html', '/cadastro.html', '/perfil.html'];

const isPageWithVisibleHeader = pagesWithVisibleHeader.includes(currentPage);

if (!isPageWithVisibleHeader) {
    window.addEventListener('scroll', () => {
        const currentScrollPosition = window.pageYOffset;

        if (currentScrollPosition > lastScrollPosition) {
            header.classList.add('header-hidden');
        } else {
            header.classList.remove('header-hidden');
        }

        lastScrollPosition = currentScrollPosition;
    });
}
//-----------------------------------MODAL-------------------------------------------------------//
function showLoadingModal() {
    const loadingModal = document.getElementById("loading-modal");
    loadingModal.style.display = "block";
}

function hideLoadingModal() {
    const loadingModal = document.getElementById("loading-modal");
    loadingModal.style.display = "none";
}
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
        video.controls = false;
        video.autoplay = true;
        video.loop = true;
        video.src = videoURL;
        videoContainer2.appendChild(video);
    
        // Adiciona um evento de clique no modal para ativar o autoplay
        modal2.addEventListener("click", function () {
            video.play();
        });
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
//--------------------------------------card mobile-------------------------------------------//
var cards = document.querySelectorAll('.card');
cards.forEach(function(card) {
    card.classList.remove('active');
});

document.addEventListener("DOMContentLoaded", function () {
    var cards = document.querySelectorAll(".card");

    cards.forEach(function (card) {
        card.addEventListener("click", function () {
            // Adicione a classe "active" à carta clicada
            card.classList.add("active");

            // Remova a classe "active" das outras cartas
            cards.forEach(function (otherCard) {
                if (otherCard !== card) {
                    otherCard.classList.remove("active");
                }
            });
        });
    });
});
document.addEventListener('click', function(event) {
    var activeCard = document.querySelector('.card.active');
    
    // Verificar se o clique não está dentro da área da carta ativa
    if (activeCard && !activeCard.contains(event.target)) {
        activeCard.classList.remove('active');
    }
});
//---------------------------------------1picture----------------------------------------------//
const baki = document.querySelector('.bakiFirst');
const scrollTrigger = document.querySelector('.scroll-trigger');
const triggerHeight = 0; // Adjust the height where the animation triggers
window.addEventListener('scroll', () => {
    if (!isMobileVersion()) {
        const scrollPosition = window.scrollY;
        const triggerPosition = scrollTrigger.offsetTop - window.innerHeight + triggerHeight;
        if (scrollPosition >= triggerPosition && scrollPosition) {
            baki.classList.add('active');
        } else {
            baki.classList.remove('active');
        }
    } else {
        // Remova a classe 'active' se for uma versão móvel
        baki.classList.remove('active');
    }
});
/*--------------------------------2picture-----------------------------------------------------*/
const yujiro = document.querySelector('.yujiro');
const yujiro2 = document.querySelector('.yujiro2');
const scrollTrigger2 = document.querySelector('.scroll-trigger2');
const triggerHeight2 = 20;

function updateVisibility() {
    if (isMobileVersion()) {
        yujiro.style.display = 'none';
        yujiro2.style.display = 'block';
    } else {
        yujiro.style.display = 'block';
        yujiro2.style.display = 'none';
    }

    // Adicione o código de carregamento de imagens com base na visibilidade aqui
    loadImagesBasedOnVisibility();
}

function loadImagesBasedOnVisibility() {
    const images = document.querySelectorAll('.characterImage[data-src]');

    images.forEach((img) => {
        if (isElementInViewport(img)) {
            img.setAttribute('src', img.getAttribute('data-src'));
            img.removeAttribute('data-src');
        }
    });
}

window.addEventListener('resize', updateVisibility);
window.addEventListener('load', () => {
    updateVisibility(); // Inicialize a visibilidade com base no tamanho da tela atual
    window.addEventListener('scroll', () => {
        if (!isMobileVersion()) {
            const scrollPosition2 = window.scrollY;
            const triggerPosition2 = scrollTrigger2.offsetTop - window.innerHeight + triggerHeight2;
            if (scrollPosition2 >= triggerPosition2) {
                yujiro.classList.add('active2'); // Adicione a classe active2 quando apropriado
            } else {
                yujiro.classList.remove('active2');
            }
        } else {
            yujiro.classList.remove('active2');
        }

        // Carregue imagens com base na visibilidade durante a rolagem
        loadImagesBasedOnVisibility();
    });
});

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
/*-------------------------------------3picture---------------------------------------------------------*/
const character3 = document.querySelector('.character3');
const scrollTrigger3 = document.querySelector('.scroll-trigger3');
const triggerHeight3 = 20;

window.addEventListener('scroll', () => {
    if (!isMobileVersion()) {
        const scrollPosition3 = window.scrollY;
        const triggerPosition3 = scrollTrigger3.offsetTop - window.innerHeight + triggerHeight3;
        if (scrollPosition3 >= triggerPosition3) {
            character3.classList.add('active3');
        } else {
            character3.classList.remove('active3');
        }
    } else {
        character3.classList.remove('active3');
    }
});
//----------------------------------------------------MUDAR OS PERSONAGENS DESTAQUE DA HOME--------------------------------------------------//
function chooseRandomCharacters(data) {
    const animes = ["baki hanma", "bleach", "demon slayer", "hunter x hunter", "naruto", "one punch man", "tokyo ghoul"];
    
    // Embaralhe o array de animes
    for (let i = animes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [animes[i], animes[j]] = [animes[j], animes[i]];
    }

    const selectedCharacters = [];

    for (const anime of animes) {
        const animeData = data[anime];
        
        // Obtenha todos os personagens disponíveis para o anime
        const allCharacters = animeData.characters;

        // Se houver personagens no anime, selecione aleatoriamente um
        if (allCharacters && allCharacters.length > 0) {
            const randomCharacter = allCharacters[Math.floor(Math.random() * allCharacters.length)];

            // Adicione o personagem selecionado ao array de personagens escolhidos
            selectedCharacters.push({
                anime: anime,
                name: randomCharacter.name,
                image: randomCharacter.image,
            });
        }
    }

    return selectedCharacters;
}

function updatePageContent(data) {
    const selectedCharacters = chooseRandomCharacters(data);

    for (let i = 0; i < selectedCharacters.length; i++) {
        const character = selectedCharacters[i];
        const characterSection = document.querySelector(`[data-character-section="character${i + 1}"]`);

        if (characterSection) {
            const charNameTopElement = characterSection.querySelector('.top');
            const charNameBottomElement = characterSection.querySelector('.bottom');
            const animeNameElement = characterSection.querySelector('.animeName');
            const characterImageElement = characterSection.querySelector('.characterImage');
            const characterImageElement2 = characterSection.querySelector('.yujiro2');

            if (charNameTopElement) {
                charNameTopElement.textContent = character.name;
            }

            if (charNameBottomElement) {
                charNameBottomElement.textContent = character.name;
            }

            if (animeNameElement) {
                animeNameElement.innerHTML = `<span>Anime: </span><strong>${character.anime}</strong>`;
            }

            if (characterImageElement) {
                characterImageElement.src = character.image;
            }
            if (characterImageElement2) {
                characterImageElement2.src = character.image;
            }
        }
    }
}
  
  // Carregue o arquivo JSON usando fetch
  fetch('utils/animeData.json')
    .then((response) => response.json())
    .then((data) => {
      updatePageContent(data);
    })
    .catch((error) => {
      console.error('Erro ao carregar o arquivo JSON:', error);
    });

//-----------------------------------------------MUDA O DESTAQUE DO FORUM------------------------------------------------------//

function carregarDestaqueAnime() {
fetch('utils/destaqueAnime.json')
.then(response => response.json())
.then(data => {
    // Escolhe aleatoriamente um anime
    const randomAnime = data[Math.floor(Math.random() * data.length)];

    // Atualiza o título do anime
    const animeTitleSection = document.getElementById('animeTitleSection');
    const h2 = animeTitleSection.querySelector('h2');
    h2.textContent = randomAnime.name;
    h2.style.display = 'none';

    // Atualiza a imagem da logo do anime
    const logo = document.querySelector('.anime_logoHighlighted');
    logo.src = randomAnime.logo;

    // Atualiza o gif do anime
    const gif = document.querySelector('.highlightedGif');
    gif.src = randomAnime.gif;

    // Atualiza o link "Ver tópico" para apontar para a página correta do anime
    const verTopicoLink = document.querySelector('.topiclinks');
    verTopicoLink.href = 'animePage.html?animeName=' + encodeURIComponent(randomAnime.name);
})
.catch(error => {
    console.error('Erro ao carregar dados dos animes:', error);
});
}

// Carrega o destaque inicial
carregarDestaqueAnime();

// Atualiza o destaque a cada 1 miunuto
setInterval(carregarDestaqueAnime, 60 * 1000);

//----------------------------------------MUDAR O NOME DO ANIME NA PAGINA ANIME PAGE-------------------------------------------//

function getUrlParameter(name) {
    name = name.replace(/[[]/, "\\[").replace(/[]]/, "\\]");
    var regex = new RegExp("[?&]" + name + "=([^&#]*)");
    var results = regex.exec(window.location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var animeName = getUrlParameter("animeName");

if (animeName) {
    document.getElementById("animeNameTop").textContent = animeName;
    document.getElementById("animeNameBottom").textContent = animeName;
    loadAnimeData(animeName); 
}

function loadAnimeData(animeName) { 
    // Load the JSON file
    fetch('utils/animeData.json')
      .then((response) => response.json())
      .then((data) => {
        const animeData = data[animeName]; 
  
        if (animeData) {
          document.getElementById('animeNameTop').textContent = animeName;
          document.getElementById('animeNameBottom').textContent = animeName;

          // Atualize as informações dos personagens 1
          document.getElementById('charNameTop').textContent = animeData.characters[0].name;
          document.getElementById('charNameBottom').textContent = animeData.characters[0].name;
          document.getElementById('image1').src = animeData.characters[0].image;
          document.getElementById('firstGif').src = animeData.characters[0].gif;
          document.getElementById('strenght').textContent = animeData.characters[0].strenght;
          document.getElementById('speed').textContent = animeData.characters[0].speed;
          document.getElementById('skills').textContent = animeData.characters[0].skills;

          // Atualize as informações dos personagens 2
          document.getElementById('charNameTop2').textContent = animeData.characters[1].name;
          document.getElementById('charNameBottom2').textContent = animeData.characters[1].name;
          document.getElementById('image2').src = animeData.characters[1].image;
          document.getElementById('secGif').src = animeData.characters[1].gif;
          document.getElementById('strenght2').textContent = animeData.characters[1].strenght;
          document.getElementById('speed2').textContent = animeData.characters[1].speed;
          document.getElementById('skills2').textContent = animeData.characters[1].skills;

          // Atualize as informações dos personagens 3
          document.getElementById('charNameTop3').textContent = animeData.characters[2].name;
          document.getElementById('charNameBottom3').textContent = animeData.characters[2].name;
          document.getElementById('image3').src = animeData.characters[2].image;
          document.getElementById('thirdGif').src = animeData.characters[2].gif;
          document.getElementById('strenght3').textContent = animeData.characters[2].strenght;
          document.getElementById('speed3').textContent = animeData.characters[2].speed;
          document.getElementById('skills3').textContent = animeData.characters[2].skills;

          // Atualize as barras de progresso
          const forcaValue = animeData.characters[0].strenght;
          const velocidadeValue = animeData.characters[0].speed;
          const barForca = document.getElementById('strenght');
          barForca.style.width = `${forcaValue}%`;
          const barVelocidade = document.getElementById('speed');
          barVelocidade.style.width = `${velocidadeValue}%`;

          const forcaValue2 = animeData.characters[1].strenght;
          const velocidadeValue2 = animeData.characters[1].speed;
          const barForca2 = document.getElementById('strenght2');
          barForca2.style.width = `${forcaValue2}%`;
          const barVelocidade2 = document.getElementById('speed2');
          barVelocidade2.style.width = `${velocidadeValue2}%`;

          const forcaValue3 = animeData.characters[2].strenght;
          const velocidadeValue3 = animeData.characters[2].speed;
          const barForca3 = document.getElementById('strenght3');
          barForca3.style.width = `${forcaValue3}%`;
          const barVelocidade3 = document.getElementById('speed3');
          barVelocidade3.style.width = `${velocidadeValue3}%`;
        }
      });
}
//----------------------------------------------------------------Mensagens-----------------------------------------------------//
document.addEventListener("DOMContentLoaded", function () {
    const submitButton = document.querySelector(".userMessageArea button");
    const messageTextarea = document.querySelector(".userMessageArea .message");
    const nicknameForum = document.querySelector(".nicknameForum");
    const animeNameTop = document.querySelector("#animeNameTop").textContent;
    const animeNameBottom = document.querySelector("#animeNameBottom").textContent;

    submitButton.addEventListener("click", function (event) {
        event.preventDefault();

        const userLoggedIn = getCookie("userLoggedIn");

        if (userLoggedIn === "true") {
            const userProfilePicForum = document.querySelector(".userProfilePicForum").src;
            const nickname = nicknameForum.textContent;
            const message = messageTextarea.value;

            const data = new FormData();
            data.append('animeName', animeNameTop || animeNameBottom);
            data.append('nickname', nickname);
            data.append('message', message);
            data.append('userProfilePicForum', userProfilePicForum);

            fetch('api/mensagens.php', {
                method: 'POST',
                body: data
            })
            .then(response => response.text())
            .then(result => {
                showModal('Mensagem enviada com sucesso!');
                console.log(result);
                messageTextarea.value = "";
                carregarMensagens(animeNameTop || animeNameBottom);
            })
            .catch(error => {
                console.error('Erro:', error);
            });
        } else {
            // Usuário não está logado, exiba um modal
            showModal('Faça login para poder enviar mensagens.');
        }
    });

    carregarMensagens(animeNameTop || animeNameBottom);
});

function carregarMensagens(animeName) {
    fetch('api/mensagens.php?animeName=' + animeName) // Solicita apenas com o animeName
        .then(response => response.json())
        .then(data => {
            const areaMensagens = document.querySelector('.area-mensagens');
            areaMensagens.innerHTML = '';

            data.forEach(message => {
                const novaMensagem = criarMensagem(message);
                areaMensagens.prepend(novaMensagem);
            });
        })
        .catch(error => console.error('Erro ao carregar mensagens:', error));
}
function criarMensagem(message) {
 
    const novaMensagem = document.createElement('div');
    novaMensagem.className = 'nova-mensagem';

    const usuarioDiv = document.createElement('div');
    usuarioDiv.className = 'info-usuario';

    const imgUsuario = document.createElement('img');
    imgUsuario.src = message.user_profile_pic;
    imgUsuario.alt = 'foto do usuario';
    usuarioDiv.appendChild(imgUsuario);

    const nomeUsuario = document.createElement('div');
    nomeUsuario.className = 'nome-usuario';
    nomeUsuario.textContent = message.user_name;
    usuarioDiv.appendChild(nomeUsuario);

    novaMensagem.appendChild(usuarioDiv);

    const mensagemElement = document.createElement('div');
    mensagemElement.className = 'mensagem-usuario';
    mensagemElement.textContent = message.message_text;
    mensagemElement.style.width = '400px';
    mensagemElement.style.whiteSpace = 'pre-line';
    novaMensagem.appendChild(mensagemElement);

    const curtirDiv = document.createElement('div');
    curtirDiv.className = 'curtir';
    curtirDiv.setAttribute('data-message-id', message.Id);
    
    const curtirButton = document.createElement('div');
    curtirButton.className = 'curtir';
    curtirButton.setAttribute('data-message-id', message.Id);
    curtirButton.setAttribute('data-liked', getLikeState( message.Id) ? 'true' : 'false'); // Defina o estado "curtido" com base no armazenamento local
    curtirButton.onclick = () => curtirMensagem(curtirButton);
    
    const curtirImage = document.createElement('img');
    curtirImage.src = getLikeState(message.Id) ? 'assets/images/heartSelected.png' : 'assets/images/heart.png'; // Defina o ícone com base no armazenamento local
    curtirImage.alt = 'Curtir';

    const curtirCount = document.createElement('span');
    curtirCount.className = 'curtir-count';
    curtirCount.textContent = message.likes; // Use o valor do banco de dados
    
    curtirButton.appendChild(curtirImage);
    curtirButton.appendChild(curtirCount); // Adicione o elemento de contagem de curtidas ao botão
    
    curtirDiv.appendChild(curtirButton); // Adicione o botão ao div de curtir
    
    novaMensagem.appendChild(curtirDiv);

    
    if (message.user_name === getCookie("username")) {
        // Verifica se o remetente da mensagem é o usuário logado
        const lixeiraDiv = document.createElement('div');
        lixeiraDiv.className = 'lixeira';
        lixeiraDiv.setAttribute('data-message-id', message.Id);
       
        lixeiraDiv.innerHTML = `<img src="assets/images/trash.png" alt="Excluir mensagem" data-message-id="${message.Id}" onclick="deletarMensagem(this)"/>`;
       
        novaMensagem.appendChild(lixeiraDiv);
    }

    if (message.created_at) {
        const dataElement = document.createElement('div');
        dataElement.className = 'data-mensagem';
        dataElement.textContent = message.created_at;
        novaMensagem.appendChild(dataElement);
    }

    return novaMensagem;
}
//------------------------------------------------------------------Deletar mensagem----------------------------------------//

function deletarMensagem(lixeiraDiv) {
    const Id = lixeiraDiv.getAttribute('data-message-id');
    console.log(Id);

    fetch(`api/mensagens.php?Id=${Id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            showModal('Mensagem excluída com sucesso!');

            setTimeout(() => {
                window.location.reload();
            }, 1000);
            carregarMensagens(userLoggedIn);
        } else {
            console.error('Erro ao excluir mensagem:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Erro ao excluir mensagem:', error);
    });
}
//------------------------------------------------------curtir mensagem-----------------------------------------------------//


function curtirMensagem(curtirButton) {
    
    const userLoggedIn = getCookie("userLoggedIn");
    if (userLoggedIn !== "true") {
        // Se o usuário não estiver logado, exiba um modal pedindo para fazer login
        showModal2(
            "Entre no site oficial para desfrutar de todas as funcionalidades:",
            "assets/images/demo.mp4",
            "Alexcorp",
            "https://seusiteoficial.com"
        );
        return;
    }
    const messageId = curtirButton.getAttribute('data-message-id');
    const liked = curtirButton.getAttribute('data-liked');
    console.log("Nome de usuário do cookie:", getCookie("username"));
    console.log("ID da mensagem:", messageId);

    const curtirImage = curtirButton.querySelector('img');
    const curtirCount = curtirButton.querySelector('.curtir-count');

    if (liked === 'false') {
        // O usuário ainda não curtiu a mensagem
        fetch(`api/historico.php?messageId=${messageId}`, {
            method: 'PUT'
        })
        .then(response => {
            if (response.ok) {
                // A curtida foi registrada com sucesso
                curtirButton.setAttribute('data-liked', 'true');
                curtirImage.src = 'assets/images/heartSelected.png';
                curtirCount.textContent = parseInt(curtirCount.textContent) + 1;

                saveLikeState(messageId, true);
            } else {
                console.error('Erro ao registrar a curtida:', response.statusText);
            }
        })
        .catch(error => {
            console.error('Erro ao registrar a curtida:', error);
        });
    } else {
        // O usuário já curtiu a mensagem, descurtir
        fetch(`api/historico.php?messageId=${messageId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                // A curtida foi removida com sucesso
                curtirButton.setAttribute('data-liked', 'false');
                curtirImage.src = 'assets/images/heart.png';
                curtirCount.textContent = parseInt(curtirCount.textContent) - 1;
                saveLikeState(messageId, false);
            } else {
                console.error('Erro ao remover a curtida:', response.statusText);
            }
        })
        .catch(error => {
            console.error('Erro ao remover a curtida:', error);
        });
    }
}
function saveLikeState(messageId, liked) {
    const userLoggedIn = getCookie("username");
    if (userLoggedIn) {
        // Verifica se há um usuário logado
        // Use uma chave única para cada mensagem com base no usuário (por exemplo, "like_state_username_1", "like_state_username_2", etc.)
        localStorage.setItem(`like_state_${userLoggedIn}_${messageId}`, liked ? '1' : '0');
    } else {
        console.error("Nenhum usuário logado. Não é possível salvar o estado de curtida.");
    }
}

// Para obter o estado de curtida quando a página é carregada
function getLikeState(messageId) {
    const userLoggedIn = getCookie("username");
    if (userLoggedIn) {
        // Recupere o estado de curtida do localStorage com base no nome de usuário e ID da mensagem
        const likeState = localStorage.getItem(`like_state_${userLoggedIn}_${messageId}`);
        console.log(`Estado de curtida para ${userLoggedIn} e mensagem ${messageId}:`, likeState);
        return likeState === '1';
    } else {
        console.error("Nenhum usuário logado. Não é possível recuperar o estado de curtida.");
        return false; // Retornar falso se nenhum usuário estiver logado
    }
}
//------------------------------------------HISTORICO MENSAGENS------------------------------------------//
function carregarHistoricoMensagens(userLoggedIn) {
    // Limpe a área de mensagens históricas
    const areaMensagensHistorico = document.querySelector('.area-mensagens-historico');
    areaMensagensHistorico.innerHTML = ''; // Limpa o conteúdo anterior, se houver

    // Faça a solicitação AJAX para recuperar o histórico de mensagens do usuário
    fetch(`api/historico.php?userName=${userLoggedIn}`, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        // Manipule as mensagens recebidas e exiba-as na página
        console.log(data); // data conterá o histórico de mensagens do usuário
        data.forEach(message => {
            const novaMensagem = criarMensagem(message);
            areaMensagensHistorico.appendChild(novaMensagem);
        });
    })
    .catch(error => {
        console.error('Erro na solicitação AJAX:', error);
    });
}
//------------------------------------MENSAGENS MAIS CURTIDAS-------------------------------------------------//
function carregarMensagensMaisCurtidas(animeName) {
    fetch(`api/mensagensMaisCurtidas.php?animeName=${animeName}&mostLiked=true`)
        .then(response => response.json())
        .then(data => {
            const areaMensagensCurtidas = document.querySelector('.area-mensagens-mais-curtidas');
            areaMensagensCurtidas.innerHTML = '';

            data.forEach(message => {
                const novaMensagem = criarMensagem(message);
                areaMensagensCurtidas.appendChild(novaMensagem);
            });
        })
        .catch(error => console.error('Erro ao carregar mensagens mais curtidas:', error));
}
document.addEventListener("DOMContentLoaded", function() {
    carregarMensagensMaisCurtidas();
});
