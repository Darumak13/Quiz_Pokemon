let correctPokemon;
let options = [];
let counter = 0;
// Função para buscar um pokémon aleatório pela API

async function getRandomPokemon() {
    const randomId = Math.floor(Math.random() * 150) + 1;
    // Pega um pokémon aleatório entre 1 e 150 (Geração 1)

    const response = await
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);

    const data = await response.json();

    return data;
}

// Função para buscar quatro Pokémons aleatórios e embaralhar as opções

async function generateQuestion() {
    correctPokemon = await getRandomPokemon(); // Pokémon correto
    options = [correctPokemon]; // Adiciona o Pokémon correto nas opções

    // Adiciona mais 3 Pokémons aleatórios na opções

    while (options.length < 4) {
        const randomPokemon = await getRandomPokemon();

        if (!options.includes(randomPokemon)) {
            options.push(randomPokemon);
        }
    }

    // Embaralha as opções
    options.sort(() => Math.random() - 0.5);

    displayQuestion(); // Exibe a imagem e as opções de resposta
}

// Função para exibir a imagem do Pokémon e as opções de resposta

function displayQuestion() {
    const pokemonImage = document.getElementById('pokemonImage');
    // Exibe a imagem do Pokémon
    pokemonImage.src = correctPokemon.sprites.front_default; 
    pokemonImage.style.display = 'block';

    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML='';
    //Limpa as opções anteriores

    // Cria botões para cada uma das opções de resposta
    options.forEach(option =>{
        const button = document.createElement('button');
        button.innerText = capitalizeFirstLetter(option.name); // Nome do Pokémon
        button.onclick = () => checkAnswer(option);
        optionsDiv.appendChild(button);
    });
}

// Função para verificar se a resposta está correta

function checkAnswer(selected){
    const resultDiv = document.getElementById('result');

    if (selected.name === correctPokemon.name) {
        resultDiv.innerHTML = '<p> Correto!</p>';
        counter++;
        let h2 = document.createElement('h2');
        let div = document.createElement('div');
        
        div.appendChild(h2);
        document.body.appendChild(div);
        document.getElementById('pontos').innerHTML = '<strong>Você possui:'+counter+'</strong>';
        document.getElementById('options').disabled = true;

    } else {
        resultDiv.innerHTML = `<p style="color:Tomato;"><strong> Incorreto! O pokémon correto era: ${capitalizeFirstLetter(correctPokemon.name)}</strong></p>`;
        document.getElementById('options').disabled = true;
    }

    document.getElementById('nextButton').style.display = 'block';

    // Exibe o botçao "Próximo"
}

// Quando o botão "Próximo" for clicado, gera uma nova pergunta

document.getElementById('nextButton').onclick = () => {

    
    // Limpa o resultado anterior

    document.getElementById('nextButton').style.display = 'none';
    // Esconde o botão "Próximo"

    generateQuestion(); // Gera uma nova pergunta
};

// Função para capitalizar a primeira letra do nome do Pokémon

function capitalizeFirstLetter(string){
    return string.charAt(0).toUpperCase()+string.slice(1);
}

generateQuestion();