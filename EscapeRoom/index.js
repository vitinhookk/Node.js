const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let resolvidos = {
    estetoscopio: false,
    prontuario: false,
    maca: false,
    armarioMedicamentos: false,
    monitor: false,
    raioX: false
};

function menuPrincipal() {
    console.log("\n🔒 Você está preso em uma sala de um hospital abandonado!");
    console.log("Ao seu redor, você observa objetos intrigantes:");
    console.log("1. 🩺 Um estetoscópio empoeirado pendurado na parede");
    console.log("2. 📋 Um prontuário médico jogado sobre a mesa");
    console.log("3. 🛏️ Uma maca enferrujada no canto");
    console.log("4. 💊 Um armário de medicamentos trancado");
    console.log("5. 🖥️ Um monitor cardíaco desligado");
    console.log("6. 📷 Uma máquina de raio-X antiga");
    console.log("7. 🔑 Tentar abrir a porta da sala");

    rl.question("\n❓ O que você deseja investigar? ", (resposta) => {
        switch (resposta.trim()) {
            case "1":
                investigarEstetoscopio();
                break;
            case "2":
                investigarProntuario();
                break;
            case "3":
                investigarMaca();
                break;
            case "4":
                investigarArmarioMedicamentos();
                break;
            case "5":
                investigarMonitor();
                break;
            case "6":
                investigarRaioX();
                break;
            case "7":
                verificarSaida();
                break;
            default:
                console.log("⚠️ Escolha inválida! Tente novamente.");
                menuPrincipal();
        }
    });
}

function investigarEstetoscopio() {
    if (resolvidos.estetoscopio) {
        console.log("✅ Você já resolveu o enigma do estetoscópio!");
        return menuPrincipal();
    }
    rl.question("\n🩺 Você pega o estetoscópio e encontra um bilhete dentro do tubo: 'Sou leve como uma pena, mas ninguém pode me segurar por muito tempo. O que sou?' ", (resposta) => {
        if (resposta.trim().toLowerCase() === "ar") {
            console.log("🎉 Acertou! Uma chave brilhante cai do estetoscópio!");
            resolvidos.estetoscopio = true;
        } else {
            console.log("❌ Resposta errada! Volte e tente novamente mais tarde.");
        }
        menuPrincipal();
    });
}

function investigarProntuario() {
    if (resolvidos.prontuario) {
        console.log("✅ Você já resolveu o enigma do prontuário!");
        return menuPrincipal();
    }
    rl.question("\n📋 Folheando o prontuário, você encontra uma anotação: 'Estou em todos os lugares, mas nunca sou visto. O que sou?' ", (resposta) => {
        if (resposta.trim().toLowerCase() === "silêncio") {
            console.log("🎉 Acertou! Uma chave estava escondida entre as páginas!");
            resolvidos.prontuario = true;
        } else {
            console.log("❌ Errou! Não é essa a resposta.");
        }
        menuPrincipal();
    });
}

function investigarMaca() {
    if (resolvidos.maca) {
        console.log("✅ Você já resolveu o enigma da maca!");
        return menuPrincipal();
    }
    rl.question("\n🛏️ Sob o colchão da maca, há uma mensagem gravada: 'Quanto mais você me usa, menos eu sou. O que sou?' ", (resposta) => {
        if (resposta.trim().toLowerCase() === "sabão") {
            console.log("🎉 Acertou! Uma chave estava escondida sob a maca!");
            resolvidos.maca = true;
        } else {
            console.log("❌ Errou! Não é essa a resposta.");
        }
        menuPrincipal();
    });
}

function investigarArmarioMedicamentos() {
    if (resolvidos.armarioMedicamentos) {
        console.log("✅ Você já resolveu o enigma do armário!");
        return menuPrincipal();
    }
    rl.question("\n💊 O armário de medicamentos tem um cadeado com uma inscrição: 'O que tem um pescoço, mas não tem cabeça?' ", (resposta) => {
        if (resposta.trim().toLowerCase() === "camisa") {
            console.log("🎉 Acertou! O cadeado se abre, revelando uma chave dentro!");
            resolvidos.armarioMedicamentos = true;
        } else {
            console.log("❌ Errou! Não é essa a resposta.");
        }
        menuPrincipal();
    });
}

function investigarMonitor() {
    if (resolvidos.monitor) {
        console.log("✅ Você já resolveu o enigma do monitor!");
        return menuPrincipal();
    }
    rl.question("\n🖥️ Ao ligar o monitor cardíaco, uma mensagem aparece: 'Eu falo sem boca e ouço sem ouvidos. O que sou?' ", (resposta) => {
        if (resposta.trim().toLowerCase() === "eco") {
            console.log("🎉 Acertou! Um compartimento no monitor se opens, revelando uma chave!");
            resolvidos.monitor = true;
        } else {
            console.log("❌ Errou! Não é essa a resposta.");
        }
        menuPrincipal();
    });
}

function investigarRaioX() {
    if (resolvidos.raioX) {
        console.log("✅ Você já resolveu o enigma do raio-X!");
        return menuPrincipal();
    }
    rl.question("\n📸 A máquina de raio-X tem uma nota: 'O que tem chaves, mas não pode abrir portas?' ", (resposta) => {
        if (resposta.trim().toLowerCase() === "piano") {
            console.log("🎉 Acertou! A máquina revela uma chave escondida!");
            resolvidos.raioX = true;
        } else {
            console.log("❌ Errou! Não é essa a resposta.");
        }
        menuPrincipal();
    });
}

function verificarSaida() {
    if (
        resolvidos.estetoscopio &&
        resolvidos.prontuario &&
        resolvidos.maca &&
        resolvidos.armarioMedicamentos &&
        resolvidos.monitor &&
        resolvidos.raioX
    ) {
        console.log("\n🔑 Você encontrou todas as 6 chaves!");
        console.log("🏆 Parabéns! A porta se abre com um clique, e você escapa do hospital abandonado!");
        rl.close();
    } else {
        console.log("\n🔒 A porta permanece trancada. Você ainda precisa encontrar mais chaves!");
        menuPrincipal();
    }
}

console.log("🌙 Bem-vindo ao Escape do Hospital Abandonado! 🏥 Resolva os enigmas para escapar! 🕵️‍♂️");
menuPrincipal();