class RecintosZoo {
    // construtor animais e recintos
    constructor() {
        this.animaisPermitidos = {
            LEAO: { tamanho: 3, bioma: ['savana'], carnivoro: true },
            LEOPARDO: { tamanho: 2, bioma: ['savana'], carnivoro: true },
            CROCODILO: { tamanho: 3, bioma: ['rio'], carnivoro: true },
            MACACO: { tamanho: 1, bioma: ['savana', 'floresta'], carnivoro: false },
            GAZELA: { tamanho: 2, bioma: ['savana'], carnivoro: false },
            HIPOPOTAMO: { tamanho: 4, bioma: ['savana', 'rio'], carnivoro: false },
        };

        this.recintos = [
            { numero: 1, bioma: 'savana', tamanho: 10, animais: ['MACACO'], espacoOcupado: 3 },
            { numero: 2, bioma: 'floresta', tamanho: 5, animais: [], espacoOcupado: 0 },
            { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: ['GAZELA'], espacoOcupado: 2 },
            { numero: 4, bioma: 'rio', tamanho: 8, animais: [], espacoOcupado: 0 },
            { numero: 5, bioma: 'savana', tamanho: 9, animais: ['LEAO'], espacoOcupado: 3 },
        ];
    }

    // metodo pra analisar os animais e os recintos
    analisaRecintos(animal, quantidade) {
        if (!this.animaisPermitidos[animal]) {
            return { 
                erro: 'Animal inválido' 
            };
        }
        if (quantidade <= 0) {
            return { 
                erro: 'Quantidade inválida' 
            };
        }
        
        const info = this.animaisPermitidos[animal];
        let recintosViaveis = [];
    
        this.recintos.forEach(recinto => {
            // 1° verifica se o bioma é adequado e com espaço suficiente para cada animal
            const biomasRecinto = recinto.bioma.split(' e ');
            const biomaCompativel = info.bioma.some(bioma => biomasRecinto.includes(bioma));
            if (!biomaCompativel) return;
            
            // 2° carnivoros habitam somente com carnivoros
            if (info.carnivoro && recinto.animais.length > 0 && !recinto.animais.includes(animal)) {
                return;
            }
        
            // 3° hipopotamos só toleram outras espécies estando em um recinto com savana e rio
            if (animal === 'HIPOPOTAMO' && recinto.animais.length > 0 && recinto.bioma !== 'savana e rio') {
                return;
            }
    
            // 4° macaco nao se sente confortável sem outro animal no recinto (mesma espécie ou não)
            if (animal === 'MACACO' && recinto.animais.length === 0 && quantidade < 2) {
                return;
            }
    
            // verificar info dos animais no recinto
            for (let especieExistente of recinto.animais) {
                const infoExistente = this.animaisPermitidos[especieExistente];

                if (infoExistente.carnivoro && especieExistente !== animal) {
                    return;
                }
                if (especieExistente === 'HIPOPOTAMO' && recinto.bioma !== 'savana e rio') {
                    return;
                }
            }
        
            // verifica o espaço e as espécies
            let espacoNecessario = info.tamanho * quantidade + recinto.espacoOcupado;
            const temOutraEspecie = recinto.animais.length > 0 && !recinto.animais.includes(animal);
            // considerar 1 espaço extra ocupado se houver mais de uma espécie          
            if (temOutraEspecie) {
                espacoNecessario += 1;
            }
        
            // verifica se o recinto tem espaço
            const espacoLivre = recinto.tamanho - espacoNecessario;
        
            if (espacoLivre < 0) return;
    
            // adiciona o recinto a lista de recintos viáveis
            recintosViaveis.push({
                numero: recinto.numero,
                descricao: `Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanho})`
            });
        });
        
        // aviso caso não tenha recinto viável
        if (recintosViaveis.length === 0) {
            return { erro: 'Não há recinto viável' };
        }
        
        // ordena eles direitinho pelo numero
        recintosViaveis.sort((a, b) => a.numero - b.numero);
        
        // mostra as descrições
        const resultado = recintosViaveis.map(recinto => recinto.descricao);
        
        return { recintosViaveis: resultado };
    }
  
}
  
export { RecintosZoo as RecintosZoo };
  



