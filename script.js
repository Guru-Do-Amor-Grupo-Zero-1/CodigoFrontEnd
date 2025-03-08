document.addEventListener("DOMContentLoaded", function () {
    // Lista de signos com imagens e cores
    const signos = [
        { nome: "Áries", imagem: "imagens/aries.png", cor: "red", inicio: "03-21", fim: "04-19" },
        { nome: "Touro", imagem: "imagens/touro.png", cor: "green", inicio: "04-20", fim: "05-20" },
        { nome: "Gêmeos", imagem: "imagens/gemeos.png", cor: "yellow", inicio: "05-21", fim: "06-20" },
        { nome: "Câncer", imagem: "imagens/cancer.png", cor: "silver", inicio: "06-21", fim: "07-22" },
        { nome: "Leão", imagem: "imagens/leao.png", cor: "orange", inicio: "07-23", fim: "08-22" },
        { nome: "Virgem", imagem: "imagens/virgem.png", cor: "lightblue", inicio: "08-23", fim: "09-22" },
        { nome: "Libra", imagem: "imagens/libra.png", cor: "aqua", inicio: "09-23", fim: "10-22" },
        { nome: "Escorpião", imagem: "imagens/escorpiao.png", cor: "indigo", inicio: "10-23", fim: "11-21" },
        { nome: "Sagitário", imagem: "imagens/sagitario.png", cor: "purple", inicio: "11-22", fim: "12-21" },
        { nome: "Capricórnio", imagem: "imagens/capricornio.png", cor: "brown", inicio: "12-22", fim: "01-19" },
        { nome: "Aquário", imagem: "imagens/aquario.png", cor: "blue", inicio: "01-20", fim: "02-18" },
        { nome: "Peixes", imagem: "imagens/peixes.png", cor: "fuchsia", inicio: "02-19", fim: "03-20" }
    ];

    const signoContainer = document.getElementById("signos");

    signos.forEach((signo) => {
        let div = document.createElement("div");
        div.classList.add("signo");
        div.style.backgroundColor = signo.cor;

        let nomeSigno = document.createElement("span");
        nomeSigno.classList.add("signo-nome");
        nomeSigno.textContent = signo.nome;

        let imgSigno = document.createElement("img");
        imgSigno.classList.add("signo-imagem");
        imgSigno.src = signo.imagem;
        imgSigno.alt = signo.nome;

        div.appendChild(nomeSigno);
        div.appendChild(imgSigno);
        signoContainer.appendChild(div);

        div.addEventListener("click", () => selecionarSigno(signo.nome));
    });

    function selecionarSigno(signo) {
        alert("Você selecionou: " + signo);
    }

    // Função que abre o input de data
    window.abrirAgenda = function () {
        document.getElementById("dataEscolhida").style.display = "block";
    };

    // Função que retorna o signo com base na data
    window.descobrirSigno = function () {
        const data = document.getElementById("dataEscolhida").value;
        if (!data) {
            document.getElementById("resultado").textContent = "Por favor, selecione uma data.";
            return;
        }

        const [ano, mes, dia] = data.split("-");
        const dataSelecionada = `${mes}-${dia}`;

        let signoEncontrado = "Signo não encontrado";
        for (const signo of signos) {
            if (
                (dataSelecionada >= signo.inicio && dataSelecionada <= signo.fim) || 
                (signo.nome === "Capricórnio" && (dataSelecionada >= "12-22" || dataSelecionada <= "01-19"))
            ) {
                signoEncontrado = signo.nome;
                break;
            }
        }

        document.getElementById("resultado").textContent = "Seu signo é: " + signoEncontrado;
    };
});

// Código para esconder o cabeçalho ao rolar para baixo e mostrar ao rolar para cima
let lastScrollTop = 0;
const header = document.querySelector(".header");

window.addEventListener("scroll", function () {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 50) {
        // Rolando para baixo, e o scroll passou de 50px → esconde suavemente
        header.classList.add("hidden");
    } else if (scrollTop === 0) {
        // Quando chegar no topo, mostrar o cabeçalho novamente
        header.classList.remove("hidden");
    }

    lastScrollTop = scrollTop;
});

document.addEventListener("DOMContentLoaded", function () {
    const footer = document.querySelector(".footer");

    window.addEventListener("scroll", function () {
        const distanceToBottom = document.documentElement.scrollHeight - window.scrollY - window.innerHeight;

        // Se o usuário chegar ao final da página, mostra o footer
        if (distanceToBottom <= 0) {
            footer.style.display = "block";  // Exibe o footer
        } else {
            footer.style.display = "none";  // Oculta o footer
        }
    });
});
document.getElementById("telefone").addEventListener("input", function (e) {
    let valor = e.target.value;

    // Remover tudo que não for número
    valor = valor.replace(/\D/g, "");

    // Formatar o valor no padrão (DDD) 00000-0000
    if (valor.length <= 2) {
        valor = valor.replace(/^(\d{0,2})/, "($1");
    } else if (valor.length <= 6) {
        valor = valor.replace(/^(\d{2})(\d{0,4})/, "($1) $2");
    } else if (valor.length <= 10) {
        valor = valor.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    } else {
        valor = valor.replace(/^(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    }

    e.target.value = valor;
});
