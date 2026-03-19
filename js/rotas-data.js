// Memória de Rotas - OIO ONE
// Michel - Projeto Registrado
const bancoDeRotas = {
    "ROTA 1": {
        cor: "#FF007F",
        ruas: ["Rua Antonio Maruca", "Rua Carmine Pugliesi", "Rua das Rosas", "Rua das Camelias", "Rua das Margaridas", "Rua das Hortensias", "Rua Tupi", "Rua Anhanguera", "Rua Orquidea", "Rua Rouxinol", "Rua Vicentina Braz Vieira Turri", "Rua Vereador Benedito de Oliveira Cesar", "Rua Geremias Ramos Goncalves", "Rua Joao Dubs", "Rua Joao Franco de Camargo", "Rua João José Batista", "Rua Joaquim Rodrigues dos Santos", "Rua Jose Luiz de Abreu", "Rua Padre Roque Gonçalves", "AVENIDA SANTOS DUMONT", "Rua Suburbios de B.J.Perdoes", "Rua Pe Manoel da Nobrega", "Rua 15 de Novembro", "Rua Caiapos", "Rua Guarani", "Rua Gardenia", "Rua Jasmim", "Rua Samambaia", "Rua Sargento Juvenil Valinhos dos Santos", "Rua Pintassilgo", "Rua Curio", "Rua Bem-te-vi", "Rua Maria Cele Costa", "Rua Argentina", "Rua Peru", "Rua Benedito Pinheiro Bueno", "Rua Hortela", "Rua Jose Ramos Guimaraes", "Estrada Guaxinduva", "Estrada Serra Negra", "Rua Marinas", "Rua Maria Aparecida do Nascimento Barbosa", "Alameda Guiomar Bastos Bulher", "Rua Atibaia", "Rua Vereador Luiz Gonzaga da Silva", "Avenida Soldado Jose Menino de Souza", "Avenida Sao Joao", "Rua Aléscio Lázaro Consoli", "Rua Antonio Olinto de Paiva", "Estrada Municipal Coronel Nelson Brotto", "Rua 01 Colinas do Sol", "Travessa Um Ecoville", "Rua Yukio Sakata", "Estrada Bento Rodrigues dos Santos", "Estrada Municipal Carlos Gebim", "Rua Ben-te-vi", "Rua Doutor Francisco Antonio de Freitas Mendes", "Rua Alameda Biazin", "Rua do Jornalista", "Rua Pioneiro", "Rua Uirapuru", "Rua Bonifacio Cubas", "Rua Coronel Bento Bicudo", "Rua Acaricuara", "Rodovia Rod Fernão Dias", "Estrada Municipal Serra Negra", "Estrada Ribeirao Acima", "Rua Antonio Buava", "Rua C", "Rua Carmo Forte", "Rua Cinco", "Rua 2", "Rua Toninho Buava", "Rua José Carlos de Oliveira", "Avenida Antonio Ramos"]
    },
    "ROTA 2": {
        cor: "#0070C0",
        ruas: ["Pr Ajuritiba", "Rua Jose Martins", "Rua Alex Fernando Cunha da Silva", "Avenida Sao Joao", "Praça Ajuritiba", "Rua Ari Barroso", "Rua Noel Rosa", "Rua Paje", "Rua Primavera", "Rua Marinha Goncalves da Costa", "Rua Alameda Biazin"]
    },
    "ROTA 3": {
        cor: "#70AD47",
        ruas: ["Rua Nossa Senhora de Fatima", "Rua California", "Rua Texas", "Rua Canada", "Avn Guedes", "Rua Moraes", "Rua Diomar Antonio Ramos", "Rua Santa Monica", "Rua Santa Tereza", "Rua Dallas", "Rua Jose Pedro Ramos"]
    },
    "ROTA 4": {
        cor: "#FFC000",
        ruas: ["Rua Barbara Cardoso", "Rua Dom Jose Mauricio da Rocha", "Rua Nossa Senhora das Dores", "Rua Papa Pio XII", "Avenida Santo Agostinho", "Rua Sao Geraldo", "Rua Sao Pedro", "Rua Sebastiana Crozara Pinheiro", "Rua Benvinda da Aparecida Paulo", "Rua Josepha Correia da Costa", "Rua B", "Rua Loteamento Anna Paz", "Rua D", "Rua C", "Rua Vicentina Braz Vieira Turri"]
    },
    "ROTA 5": {
        cor: "#7030A0",
        ruas: ["Rua Nossa Senhora Aparecida", "Rua Santo Antonio", "Rua São Paulo", "Rua Nair Passos Sevilha", "Rua Waldemar Ramos", "Rua Yukio Sakata", "Rua Carmo Forte", "Rua Padre Sebastião", "Rua Cid Bueno", "Rua Nicola", "Rua Dom Duarte Leopoldo", "Rua Major Murzilho", "Rua Antonio", "Rua Santa Rita", "Avenida Yadoya", "Estrada Nhanguara", "Rua Doutor Valdomiro de Paiva", "Rua Jose Joaquim Barbosa", "Rua Padre Alberto Jose Antonelli", "Rua Joao Batista Marcondes", "Rua Acir Mineiro", "Rua Brasilina do Espirito Santo"]
    },
    "ROTA 6": {
        cor: "#00CED1",
        ruas: ["Rua Joao Franco de Camargo", "Rua Joaquim Rodrigues dos Santos", "Rua Angelo Santoni", "Rua João José Batista"]
    },
    "ROTA 7": {
        cor: "#FF4500",
        ruas: ["Rua Cap Manoel de Almeida Passos", "Rua Guilherme Dias Santos Silva", "Rua Major Joaquim Firmino", "Rua Benedito Pinheiro Bueno", "Rua Rima Ramos Ferreira", "Rua Manoel Rodrigues dos Santos", "Avenida Tiradentes", "Rua Luiz Franco de Camargo", "Rua Independencia"]
    },
    "ROTA 8": {
        cor: "#28a745",
        ruas: ["Rua Joao de Deus Goncalves", "Rua Juvenal de Oliveira Bueno", "Rua Pe Roque Goncalves", "Rua Sao Benedito", "Rua Belo Horizonte", "Praça do Cruzeiro", "Rua Jose Luiz de Abreu", "Rua Padre Roque Gonçalves", "Avenida Bom Jesus"]
    },
    "ROTA 9": {
        cor: "#E91E63",
        ruas: ["Avenida Henrich Reismann", "Rua Martin Afonso de Souza", "Rua Pe Manoel da Nobrega", "Rua Pe Jose de Anchieta", "Avenida Eliseu Correa Dias", "Rua Libano", "Rua Mohamed El Turk", "Rua José do Patrocínio", "Rua Prudente de Moraes", "Rua Augusto Mariano da Silva", "Rua Ademar de Barros", "Estrada Municipal Carlos Gebim", "Rua Doutor Francisco Antonio de Freitas Mendes"]
    },
    "ROTA 10": {
        cor: "#8B4513",
        ruas: ["Rua Luis de Camoes", "Rua Jose de Alencar", "Rua Jose do Patrocinio", "Rua Machado de Assis", "Rua Cravo", "Rua Alecrim", "Praça Juan Pastrana", "Rua Canela", "Rua Hortela"]
    },
    "ROTA 11": {
        cor: "#4682B4",
        ruas: ["Avn Santos Dumont", "Rua José Caetano de Lima", "Rua Jose Benedito Bueno", "Rua Amadeu Palmieri", "Trav Mexico", "Travessa Panama", "Rua Brasil", "Avenida Marginal Corrego do Povo", "Rua Jose Justino da Rocha", "Travessa Honduras", "Travessa Cuba", "Condominio Marinas Ribeirão do Vale", "Marginal Rodovia Dom Pedro I", "Praça Arthur da Costa e Silva"]
    },
    "ROTA 12": {
        cor: "#008080",
        ruas: ["Rua Nelson Maldi", "Rua Jardineiro", "Rua Jose Bonifacio", "Rua Fram", "Rua 1 de Maio", "Rua Ana Fernandes", "Rua Falcao", "Rua Pires Machado"]
    },
    "ROTA 13": {
        cor: "#D2691E",
        ruas: ["Rua Luiz de Souza Ramos", "Rua 15 de Novembro", "Rua 09 de Julho", "Rua Dom Pedro I", "Rua 13 de Maio", "Rua 07 de Setembro"]
    },
    "ROTA 14": {
        cor: "#FF1493",
        ruas: ["Trav Portugal", "Trav Holanda", "Avenida das Nacoes", "Rua Argentina", "Rua Uruguai", "Rua Paraguai", "Travessa Italia", "Rua Bolivia"]
    },
    "ROTA 15": {
        cor: "#32CD32",
        ruas: ["Travessa Nicaragua", "Trav Guatemala", "Travessa Porto Rico", "Trav Espanha", "Rua Bolivia", "Rua Peru", "Rua Colombia", "Rua Francisco Augusto Guedes", "Rua Aléscio Lázaro Consoli", "Travessa Haiti", "Travessa França", "Travessa Alemanha", "Travessa Polonia", "Rua Chile", "Rua Venezuela", "Rua Antonio Carlos Bueno"]
    },
    "ROTA 16": {
        cor: "#7B68EE",
        ruas: ["Travessa Belgica", "Avenida Arthi", "Rua Vila Nova"]
    },
    "ROTA 17": {
        cor: "#A52A2A",
        ruas: ["Rua Joaquim Ramos Goncalves", "Rua José Bueno do Prado", "Rua Vicente de Almeida Passos", "Rua Francisco de Assis Félix da Costa", "Rua Manoel Felix da Costa", "Rua José Felix da Costa", "Rua Maria Cele Costa", "Rua Antonio Felix da Costa", "Avenida Bom Jesus", "Rua Geraldo Ramos Goncalves", "Rua Joao Correa Dias", "Rua Benedito Cardoso do Prado", "Rua Antonio Benedito Barbosa", "Rua Guiomar Costa", "Rua Acassio Felix da Costa"]
    },
    "ROTA 18": {
        cor: "#FFA500",
        ruas: ["Rua Pintassilgo", "Rua Ben-te-vi", "Rua Andorinha", "Rua Beija-flor", "Rua Araponga", "Avn Antonio Ramos", "Rua Marino Nanni", "Rua Feres Ale", "Rua Sorocaba", "Rua Campinas", "Rua Ver. Luiz Gonzaga da Silva", "Rua Ver. Antonio Rosa de Paula", "Rua Milão", "Rua Veneza", "Rua Severino Cristino de Lima", "Rua Curio", "Avenida Equifabril", "Rua Juriti", "Rua Uirapuru", "Rua Tangará", "Rua Rouxinol", "Rua Leonidio Ramos Pinto", "Rua Francisco Tavares de Oliveira", "Condominio Marinas Ribeirão do Vale", "Estrada Velha de Piracaia", "Rua Araras", "Rua Atibaia", "Rua Sao Carlos", "Rua Piracicaba", "Rua Limeira", "Rua Turim", "Rua Roma", "Avenida Antonio Ramos"]
    },
    "ROTA 19": {
        cor: "#1E90FF",
        ruas: ["Rua 22 de Maio", "Rua Ricardo Arcay Mendoza", "Estrada Murillo de Almeida Passos", "Alameda Guiomar Bastos Bulher", "Condominio Ribeirao do Vale", "Rua Beirut", "Rua Lamis", "Rua Aisha", "Rua Andrade", "Rua Dubai", "Rua Sant Ana do Sapucai", "Rua Jose Ramos Guimaraes", "Rua Marinas", "Rua José Bonifacio Andrade e Silva", "Rua Maria Aparecida do Nascimento Barbosa", "Rua Natalino da Silva", "Estrada Municipal Galileu Pinheiro", "Rua Doutor João Espinosa Rodrigues", "Rua Istambul", "Rua Tripoli"]
    },
    "ROTA 20": {
        cor: "#2E8B57",
        ruas: ["Rua Professor Licinio Carpinelli", "Rua Jatobá", "Rua Seringueira", "Rua Jequitibá", "Rua Ype", "Rua Jacaranda", "Rua Peroba", "Rua Jose Carlos de Oliveira", "Rua Luiz Soares da Silva", "Rua Ulisses da Silva", "Rua Pinho", "Rua Pau-brasil", "Estrada Serra Negra", "Rua Doutor João Espinosa Rodrigues", "Avenida Doutor Luiz Gonzaga da Silva Leme", "Rua José Goncalves da Silva", "Rua Antonio Luiz Soares Loureiro", "Rua Marina Mendes de Miranda", "Rua Flávio de Oliveira", "Rua Doutora Maria Santana Ribeiro Bailona", "Rua Constância de Lima"]
    }
};
