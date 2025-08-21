import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Leaf, Zap, Mountain, Users, Home, RotateCcw } from 'lucide-react';

// Dados da história extraídos do PDF
const storyData = {
  intro: {
    id: 'intro',
    type: 'input',
    title: 'Solar Quest',
    content: 'Bem-vindo ao Solar Quest! Digite seu nome para começar esta jornada pelo sertão nordestino.',
    background: 'sertao'
  },
  genderChoice: {
    id: 'genderChoice',
    type: 'choice',
    title: 'Escolha seu gênero',
    content: 'Como você gostaria de começar sua jornada?',
    choices: [
      { text: 'Homem', next: 'maleIntro', gender: 'male' },
      { text: 'Mulher', next: 'femaleIntro', gender: 'female' }
    ],
    background: 'sunrise'
  },
  maleIntro: {
    id: 'maleIntro',
    type: 'story',
    content: '[Nome] nasceu em uma comunidade rural isolada no sertão nordestino. Filho de agricultores, cresceu lidando com a seca, escassez e o abandono político. Aos 14 anos, perdeu o pai em um acidente de trabalho. Aos 17, migrou para a cidade em busca de emprego. Trabalhou como servente, eletricista e depois como técnico de energia.\n\n[Nome] carrega um trauma consigo. Ter visto sua querida terra natal, onde estavam guardadas suas melhores lembranças, ser abandonada e explorada por projetos que nunca beneficiaram os moradores.\n\nDiante de todos os problemas que enfrentou, o desejo de devolver a dignidade à sua região está em seu coração.',
    next: 'maleOpportunity',
    background: 'sertao'
  },
  femaleIntro: {
    id: 'femaleIntro',
    type: 'story',
    content: '[Nome] cresceu em uma pequena comunidade no interior do sertão. Filha de uma costureira e de um pedreiro, cresceu vendo sua comunidade lutar para sobreviver com dignidade.\n\nSempre foi excelente aluna, curiosa e determinada. Aos 18 anos, conseguiu uma bolsa para estudar engenharia ambiental em uma universidade estadual. Mas teve que abandonar os estudos para cuidar da mãe doente, que sofria de problemas respiratórios agravados pela poeira e pela poluição da região.\n\nEm meio a todas as dificuldades que enfrentou, [Nome] pretende provar que é possível fazer diferente. Que tecnologia pode servir às pessoas e não apenas ao lucro.',
    next: 'femaleOpportunity',
    background: 'sertao'
  },
  maleOpportunity: {
    id: 'maleOpportunity',
    type: 'story',
    content: 'Durante uma manutenção em uma subestação, você foi abordado por um investidor que durante os dias esteve te observando durante seu trabalho, e viu o potencial em seus olhos.\n\nInvestidor:\n"Você conhece esse chão, assim como conhece o sol. Você deseja liderar juntamente a mim e minha equipe, um projeto muito maior?"',
    choices: [{ text: 'SIM', next: 'meetingMale' }],
    background: 'solar'
  },
  femaleOpportunity: {
    id: 'femaleOpportunity',
    type: 'story',
    content: 'Durante um evento de sustentabilidade ao qual foi convidada a participar, você apresenta uma proposta de microgeração solar comunitária. Vendo todo potencial do seu projeto, um representante da ONG "Verde Viva", Carlos Lima, se aproximou de você.\n\nCarlos - representante da ONG:\n"Você tem visão, coragem e determinação. Quer se juntar a mim e minha equipe, para um projeto que pode envolver todo ecossistema?"',
    choices: [{ text: 'SIM', next: 'meetingFemale' }],
    background: 'solar'
  },
  meetingMale: {
    id: 'meetingMale',
    type: 'story',
    content: 'Na Sede do Ministério da Energia, bairro do Recife Antigo, você entra em uma sala iluminada por luz natural. Mapas solares, gráficos de consumo energético e imagens de parques solares estão espalhados pelas paredes.\n\nMinistro Elias Rocha:\n"[Nome], técnico experiente, conhecedor da terra, filho do sertão. Estamos aqui porque acreditamos que você pode liderar algo grande. O país está investindo pesado em energia solar."\n\nCarla Fontes:\n"A energia solar é o futuro. Mas não basta instalar placas — é preciso entender o solo, o clima, o impacto. Precisamos de alguém que saiba onde pisar."\n\nCarlos Lima:\n"Energia limpa não é desculpa para devastação. Se esse projeto for feito com consciência, pode ser um modelo."',
    choices: [
      { text: 'Aceitar o desafio', next: 'terrainChoice' },
      { text: 'Desistir do projeto', next: 'gameOver' }
    ],
    background: 'meeting'
  },
  meetingFemale: {
    id: 'meetingFemale',
    type: 'story',
    content: 'Na Sede do Ministério da Energia, bairro do Recife Antigo, você entra em uma sala iluminada por luz natural. Mapas solares, gráficos de consumo energético e imagens de parques solares estão espalhados pelas paredes.\n\nMinistro Elias Rocha:\n"[Nome]. Técnica ambiental, nascida no sertão, formada pela vida. Estamos lançando um projeto de energia solar que pode transformar o Nordeste."\n\nCarla Fontes:\n"A proposta é clara: instalar um parque solar de grande escala. Energia limpa, empregos, progresso. Mas precisamos de alguém que entenda o solo, o clima, o impacto."\n\nCarlos Lima:\n"Energia solar pode ser uma bênção. Mas se for mal planejada, pode destruir mais do que iluminar. Precisamos de alguém com consciência."',
    choices: [
      { text: 'Aceitar o desafio', next: 'terrainChoice' },
      { text: 'Desistir do projeto', next: 'gameOver' }
    ],
    background: 'meeting'
  },
  terrainChoice: {
    id: 'terrainChoice',
    type: 'choice',
    title: 'A Escolha da Terra',
    content: 'Após semanas de estudos intensos, você apresenta duas opções de terreno onde o parque solar poderá ser construído. Cada terra carrega luz e sombra.\n\n**Pedra Branca (Pernambuco)**\nFirme, seca, resiliente. Tem sol o ano inteiro e espaço para crescer. Mas é marcada por abandono e silêncio. O solo sofre, a fauna resiste.\n\n**Chapada do Sol Nascente (DF)**\nViva, elevada, promissora. A luz ali é pura, mas o solo é instável. Um passo errado, e a terra pode descer.',
    choices: [
      { text: 'Pedra Branca - Potência solar, risco de desertificação', next: 'pedraBrancaStart', terrain: 'pedraBranca' },
      { text: 'Chapada do Sol Nascente - Inclusão comunitária, risco geológico', next: 'chapadaStart', terrain: 'chapada' }
    ],
    background: 'landscape'
  },
  pedraBrancaStart: {
    id: 'pedraBrancaStart',
    type: 'story',
    content: 'Dias após a escolha de Pedra Branca, caminhões chegam pelas estradas de terra, trazendo equipamentos e técnicos. O chão seco começa a receber estruturas metálicas que brilham sob o sol.\n\nColaborador Rafael:\n"Nunca pensei que ia ver isso aqui. Pedra Branca sempre foi poeira e silêncio. Agora tem brilho. Vai mudar tudo, né?"\n\nVocê responde:\n"Vai mudar, sim. Mas a gente tem que garantir que seja para melhor."\n\nPrimeiros sinais começam a aparecer: o solo está mais quente, o poço da família tem menos água, pequenas nuvens de poeira se formam ao redor dos painéis.',
    next: 'pedraBrancaSigns',
    background: 'construction'
  },
  chapadaStart: {
    id: 'chapadaStart',
    type: 'story',
    content: 'Após a escolha da Chapada do Sol Nascente, a comunidade de Ceilândia vibra com a chegada do projeto. A encosta começa a receber estruturas metálicas, e os moradores acompanham cada etapa.\n\nColaboradora Tainá:\n"Nunca vi tanta gente trabalhando junto aqui. Parece que a chapada acordou."\n\nVocê responde:\n"Acordou, sim. Mas ela é frágil. A gente tem que pisar leve."\n\nPrimeiros sinais: um engenheiro nota inclinação excessiva, a vegetação removida afeta a estabilidade, a água da chuva desce mais rápido.',
    next: 'chapadaSigns',
    background: 'construction'
  },
  pedraBrancaSigns: {
    id: 'pedraBrancaSigns',
    type: 'story',
    content: 'Seis meses depois, Dona Lúcia entra em seu escritório com o rosto marcado pela preocupação.\n\nDona Lúcia:\n"Desculpe incomodar. Mas o poço da escola secou. As crianças estão trazendo água de casa. E as galinhas... estão morrendo de sede."\n\nEla coloca uma garrafa com água turva na mesa.\n"Isso aqui é o que sobrou. E ainda dizem que é progresso."\n\nCarla Fontes liga:\n"Precisamos acelerar. O cronograma está atrasado. Não podemos parar por causa de poeira e poços."',
    choices: [
      { text: 'Acelerar a obra - atender aos chefes', next: 'pedraBrancaAccelerate' },
      { text: 'Parar e reavaliar o impacto - ouvir a comunidade', next: 'pedraBrancaRevaluate' }
    ],
    background: 'warning'
  },
  chapadaSigns: {
    id: 'chapadaSigns',
    type: 'story',
    content: 'Seis meses depois, Jeferson o chama com urgência.\n\nJeferson:\n"Você precisa ver isso. A chuva da semana passada levou terra direto para o riacho. A água está turva. E as crianças não podem mais nadar lá."\n\nA água do riacho, antes cristalina, agora corre barrenta e veloz.\n\n"Leve para vocês. Para a gente, é o começo de um problema."\n\nCarla Fontes envia mensagem:\n"Precisamos acelerar. Não podemos parar por causa de lama e água turva."',
    choices: [
      { text: 'Acelerar a obra - atender aos chefes', next: 'chapadaAccelerate' },
      { text: 'Parar e reavaliar o impacto - ouvir a comunidade', next: 'chapadaRevaluate' }
    ],
    background: 'warning'
  },
  pedraBrancaAccelerate: {
    id: 'pedraBrancaAccelerate',
    type: 'story',
    content: 'O DIA EM QUE O SOL FERIU\n\nO céu amanhece alaranjado. O calor é sufocante. Alarmes soam: sensores indicam queda na umidade e aumento extremo da temperatura. Moradores correm para cobrir janelas e poços. A poeira invade casas, escolas são fechadas.\n\nDona Lúcia grita:\n"Isso não é progresso! Isso é castigo! A terra está se vingando!"\n\nO poço principal seca completamente. Crianças adoecem. Animais morrem.',
    choices: [
      { text: 'Diminuir o impacto por meio de ações', next: 'pedraBrancaCartomante' },
      { text: 'Abandonar tudo', next: 'gameOverMid' }
    ],
    background: 'disaster'
  },
  chapadaAccelerate: {
    id: 'chapadaAccelerate',
    type: 'story',
    content: 'O DIA EM QUE A ENCOSTA CAIU\n\nChuvas intensas atingem a encosta. A vegetação removida não segura o solo. Um deslizamento atinge parte do parque e casas próximas. Painéis quebrados contaminam o riacho.\n\nJeferson:\n"A gente avisou! A chapada não aguenta essa pressa!"\n\nA comunidade entra em estado de emergência.',
    choices: [
      { text: 'Diminuir o impacto por meio de ações', next: 'chapadaCartomante' },
      { text: 'Abandonar tudo', next: 'gameOverMid' }
    ],
    background: 'disaster'
  },
  pedraBrancaRevaluate: {
    id: 'pedraBrancaRevaluate',
    type: 'story',
    content: 'O DIA EM QUE A TERRA FOI OUVIDA\n\nVocê decide pausar a obra. Reúne engenheiros, moradores e representantes ambientais. Juntos, caminham pelo terreno, observando rachaduras no solo.\n\n"A terra está nos avisando. E nós vamos escutar. Nada será instalado até que ela esteja pronta."\n\nBarreiras vegetais são plantadas, o uso de água é redirecionado. A poeira diminui. Chuvas leves caem. O solo começa a se recompor.\n\nDona Lúcia, emocionada:\n"Ela está respirando de novo. E tudo porque você parou para ouvir."',
    next: 'perfectEnding',
    background: 'healing'
  },
  chapadaRevaluate: {
    id: 'chapadaRevaluate',
    type: 'story',
    content: 'O DIA EM QUE A CHAPADA FOI PROTEGIDA\n\nVocê pausa a obra, escuta os moradores, e inicia ações preventivas: contenções ecológicas, replantio, drenagem. A encosta se estabiliza. O riacho continua limpo.\n\nJeferson:\n"A chapada está viva. E você a ajudou a respirar."\n\nA comunidade prospera com equilíbrio ambiental.',
    next: 'perfectEnding',
    background: 'healing'
  },
  pedraBrancaCartomante: {
    id: 'pedraBrancaCartomante',
    type: 'story',
    content: 'AQUELA QUE LÊ A TERRA\n\nVocê procura Mãe Zefa em sua cabana, cercada por mandacarus e velas apagadas.\n\nMãe Zefa:\n"Você trouxe o sol, mas esqueceu da sombra. A terra avisou. Agora, três caminhos se abrem. Um cura. Um finge. Um foge."\n\nEla coloca três cartas: um sol rachado, uma árvore seca, uma estrada dividida.',
    choices: [
      { text: 'Reverter totalmente e reconstruir com respeito', next: 'goodEnding' },
      { text: 'Não mudar nada, continuar como está', next: 'tragicEnding' },
      { text: 'Abandonar o parque', next: 'midEnding' }
    ],
    background: 'mystical'
  },
  chapadaCartomante: {
    id: 'chapadaCartomante',
    type: 'story',
    content: 'AQUELA QUE LÊ A TERRA\n\nVocê encontra Dona Iraci em uma trilha antiga, marcada por pedras e raízes.\n\nDona Iraci:\n"A chapada falou. Você não escutou. Agora... ela espera sua escolha. Um caminho cura. Um repete. Um se afasta."\n\nTrês caminhos se abrem diante de você.',
    choices: [
      { text: 'Reverter totalmente e reconstruir com respeito', next: 'goodEnding' },
      { text: 'Não mudar nada, continuar como está', next: 'tragicEnding' },
      { text: 'Abandonar o parque', next: 'midEnding' }
    ],
    background: 'mystical'
  },
  perfectEnding: {
    id: 'perfectEnding',
    type: 'ending',
    title: '🌞 FINAL PERFEITO',
    content: 'Você escutou a terra antes que ela gritasse. O parque se tornou referência internacional em energia sustentável. A comunidade prospera com equilíbrio ambiental. Você é homenageado como defensor da terra.\n\nA luz que você trouxe não queima - ela cura.',
    background: 'paradise'
  },
  goodEnding: {
    id: 'goodEnding',
    type: 'ending',
    title: '🌱 FINAL BOM',
    content: '"Eu não posso apagar o que fiz. Mas posso reconstruir com respeito."\n\nA cartomante sorri: "Então a terra vai te perdoar. E florescer."\n\nO parque é transformado em modelo sustentável. A comunidade prospera. Você é reconhecido como líder ético.',
    background: 'growth'
  },
  tragicEnding: {
    id: 'tragicEnding',
    type: 'ending',
    title: '⚡ FINAL TRÁGICO',
    content: '"Já foi longe demais. Melhor seguir como está."\n\nA cartomante balança a cabeça: "Então o que está seco... vai morrer. E o que está vivo... vai fugir."\n\nA região é abandonada. O parque é interditado. Você perde sua credibilidade.',
    background: 'desolation'
  },
  midEnding: {
    id: 'midEnding',
    type: 'ending',
    title: '🏜️ FINAL MEIO TERMO',
    content: '"Não posso continuar. Mas também não quero destruir mais."\n\nA cartomante assente: "Você não curou. Mas também não feriu mais. A terra... vai decidir o resto."\n\nO parque é desativado. A natureza começa a se recuperar lentamente.',
    background: 'neutral'
  },
  gameOver: {
    id: 'gameOver',
    type: 'ending',
    title: 'FIM DE JOGO',
    content: 'Você decidiu não aceitar o desafio. Às vezes, a sabedoria está em saber quando não agir.',
    background: 'ending'
  },
  gameOverMid: {
    id: 'gameOverMid',
    type: 'ending',
    title: 'FINAL MEIO TERMO',
    content: 'Você abandonou o projeto diante do primeiro grande desafio. A natureza seguirá seu curso.',
    background: 'ending'
  },
  credits: {
    id: 'credits',
    type: 'credits',
    title: 'Solar Quest - Créditos',
    content: {
      orientador: 'Renato',
      alunos: 'Lucas Nadson, Mariana Vitória, Rikelmy – 3º ano "G" EREMWAL',
      colaborador: 'Cefras Mandú, Robson Luan – Eng. de Computação IFPB - CG',
      colaborador: 'Francisco Ferreira - UniFAP - CE'
    }
  }
};

const backgrounds = {
  sertao: 'linear-gradient(135deg, #D4A574 0%, #8B4513 50%, #F4E4BC 100%)',
  sunrise: 'linear-gradient(135deg, #FFB347 0%, #FF6B35 50%, #F7DC6F 100%)',
  solar: 'linear-gradient(135deg, #F39C12 0%, #E67E22 50%, #F1C40F 100%)',
  meeting: 'linear-gradient(135deg, #3498DB 0%, #2980B9 50%, #85C1E9 100%)',
  landscape: 'linear-gradient(135deg, #27AE60 0%, #229954 50%, #58D68D 100%)',
  construction: 'linear-gradient(135deg, #E67E22 0%, #D68910 50%, #F8C471 100%)',
  warning: 'linear-gradient(135deg, #E74C3C 0%, #C0392B 50%, #F1948A 100%)',
  disaster: 'linear-gradient(135deg, #8B0000 0%, #DC143C 50%, #CD5C5C 100%)',
  healing: 'linear-gradient(135deg, #2ECC71 0%, #27AE60 50%, #A9DFBF 100%)',
  mystical: 'linear-gradient(135deg, #9B59B6 0%, #8E44AD 50%, #D7BDE2 100%)',
  paradise: 'linear-gradient(135deg, #F7DC6F 0%, #52C41A 30%, #1890FF 100%)',
  growth: 'linear-gradient(135deg, #A8E6CF 0%, #7FCDCD 50%, #81C784 100%)',
  desolation: 'linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #DEB887 100%)',
  neutral: 'linear-gradient(135deg, #BDC3C7 0%, #95A5A6 50%, #D5DBDB 100%)',
  ending: 'linear-gradient(135deg, #2C3E50 0%, #34495E 50%, #5D6D7E 100%)'
};

const SolarQuest = () => {
  const [currentScene, setCurrentScene] = useState('intro');
  const [playerName, setPlayerName] = useState('');
  const [playerGender, setPlayerGender] = useState('');
  const [terrain, setTerrain] = useState('');
  const [gameState, setGameState] = useState({});
  const [inputName, setInputName] = useState('');

  // Salvar progresso
  useEffect(() => {
    const savedState = localStorage.getItem('solarQuestSave');
    if (savedState) {
      const parsed = JSON.parse(savedState);
      setPlayerName(parsed.playerName || '');
      setPlayerGender(parsed.playerGender || '');
      setTerrain(parsed.terrain || '');
      setGameState(parsed.gameState || {});
      if (parsed.currentScene && parsed.playerName) {
        setCurrentScene(parsed.currentScene);
      }
    }
  }, []);

  const saveGame = (scene, name = playerName, gender = playerGender, terrainChoice = terrain) => {
    const saveData = {
      currentScene: scene,
      playerName: name,
      playerGender: gender,
      terrain: terrainChoice,
      gameState
    };
    localStorage.setItem('solarQuestSave', JSON.stringify(saveData));
  };

  const resetGame = () => {
    localStorage.removeItem('solarQuestSave');
    setCurrentScene('intro');
    setPlayerName('');
    setPlayerGender('');
    setTerrain('');
    setGameState({});
    setInputName('');
  };

  const handleChoice = (choice) => {
    if (choice.gender) {
      setPlayerGender(choice.gender);
      saveGame(choice.next, playerName, choice.gender);
    }
    if (choice.terrain) {
      setTerrain(choice.terrain);
      saveGame(choice.next, playerName, playerGender, choice.terrain);
    } else {
      saveGame(choice.next);
    }
    setCurrentScene(choice.next);
  };

  const handleNext = (nextScene) => {
    saveGame(nextScene);
    setCurrentScene(nextScene);
  };

  const handleNameSubmit = () => {
    if (inputName.trim()) {
      setPlayerName(inputName.trim());
      saveGame('genderChoice', inputName.trim());
      setCurrentScene('genderChoice');
    }
  };

  const scene = storyData[currentScene];
  const backgroundStyle = backgrounds[scene?.background || 'sertao'];

  const replacePlayerName = (text) => {
    return text ? text.replace(/\[Nome.*?\]/g, playerName) : '';
  };

  if (!scene) {
    return <div>Erro: Cena não encontrada</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" 
         style={{ background: backgroundStyle }}>
      
      {/* Fundo animado */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 2, 0]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className="w-full h-full bg-gradient-to-r from-yellow-200 via-transparent to-green-200 opacity-30"></div>
      </motion.div>

      <div className="relative z-10 w-full max-w-4xl">
        
        {/* Header com nome do jogador */}
        {playerName && currentScene !== 'intro' && (
          <motion.div 
            className="mb-6 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <Sun className="w-5 h-5 text-yellow-600" />
              <span className="font-semibold text-gray-800">{playerName}</span>
            </div>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6 }}
            className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden"
          >
            
            {/* Título da cena */}
            {scene.title && (
              <div className="bg-gradient-to-r from-green-600 to-yellow-600 text-white p-6 text-center">
                <motion.h1 
                  className="text-2xl md:text-3xl font-bold flex items-center justify-center gap-3"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Leaf className="w-8 h-8" />
                  {scene.title}
                  <Sun className="w-8 h-8" />
                </motion.h1>
              </div>
            )}

            <div className="p-8">
              
              {/* Input para nome */}
              {scene.type === 'input' && (
                <motion.div 
                  className="text-center space-y-6"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="inline-block"
                  >
                    <Sun className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                  </motion.div>
                  
                  <h2 className="text-4xl font-bold text-gray-800 mb-4">Solar Quest</h2>
                  <p className="text-lg text-gray-600 mb-6">{scene.content}</p>
                  
                  <div className="flex gap-3 max-w-md mx-auto">
                    <input
                      type="text"
                      value={inputName}
                      onChange={(e) => setInputName(e.target.value)}
                      placeholder="Digite seu nome..."
                      className="flex-1 px-4 py-3 border-2 border-green-300 rounded-xl focus:border-green-500 focus:outline-none text-lg"
                      onKeyPress={(e) => e.key === 'Enter' && handleNameSubmit()}
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNameSubmit}
                      className="px-6 py-3 bg-gradient-to-r from-green-500 to-yellow-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      <Zap className="w-5 h-5" />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Conteúdo da história */}
              {(scene.type === 'story' || scene.type === 'choice') && (
                <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                    {replacePlayerName(scene.content).split('\n\n').map((paragraph, index) => (
                      <motion.p 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className="mb-4 whitespace-pre-line"
                      >
                        {paragraph}
                      </motion.p>
                    ))}
                  </div>

                  {/* Botões de escolha */}
                  {scene.choices && (
                    <motion.div 
                      className="space-y-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      {scene.choices.map((choice, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.02, x: 10 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleChoice(choice)}
                          className="w-full p-4 text-left bg-gradient-to-r from-green-100 to-yellow-100 hover:from-green-200 hover:to-yellow-200 rounded-xl border-2 border-green-200 hover:border-green-400 transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                          <div className="flex items-center gap-3">
                            {choice.terrain === 'pedraBranca' && <Mountain className="w-6 h-6 text-orange-600" />}
                            {choice.terrain === 'chapada' && <Mountain className="w-6 h-6 text-green-600" />}
                            {choice.gender && <Users className="w-6 h-6 text-blue-600" />}
                            {!choice.terrain && !choice.gender && <Zap className="w-6 h-6 text-yellow-600" />}
                            <span className="font-semibold text-gray-800">{choice.text}</span>
                          </div>
                        </motion.button>
                      ))}
                    </motion.div>
                  )}

                  {/* Botão continuar para histórias sem escolhas */}
                  {scene.next && !scene.choices && (
                    <motion.div 
                      className="text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleNext(scene.next)}
                        className="px-8 py-4 bg-gradient-to-r from-green-500 to-yellow-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 mx-auto"
                      >
                        Continuar
                        <Zap className="w-5 h-5" />
                      </motion.button>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Finais do jogo */}
              {scene.type === 'ending' && (
                <motion.div 
                  className="text-center space-y-6"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, 0, -5, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {scene.title.includes('PERFEITO') && <Sun className="w-20 h-20 text-yellow-500 mx-auto mb-4" />}
                    {scene.title.includes('BOM') && <Leaf className="w-20 h-20 text-green-500 mx-auto mb-4" />}
                    {scene.title.includes('TRÁGICO') && <Zap className="w-20 h-20 text-red-500 mx-auto mb-4" />}
                    {(scene.title.includes('MEIO TERMO') || scene.title.includes('FIM')) && <Mountain className="w-20 h-20 text-gray-500 mx-auto mb-4" />}
                  </motion.div>
                  
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">{scene.title}</h2>
                  
                  <div className="prose prose-lg max-w-none text-gray-700">
                    {scene.content.split('\n\n').map((paragraph, index) => (
                      <motion.p 
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.3 }}
                        className="mb-4 whitespace-pre-line"
                      >
                        {paragraph}
                      </motion.p>
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="flex gap-4 justify-center flex-wrap"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentScene('credits')}
                      className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      Ver Créditos
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={resetGame}
                      className="px-6 py-3 bg-gradient-to-r from-green-500 to-yellow-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
                    >
                      <RotateCcw className="w-5 h-5" />
                      Jogar Novamente
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}

              {/* Tela de créditos */}
              {scene.type === 'credits' && (
                <motion.div 
                  className="text-center space-y-8"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  >
                    <Sun className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
                  </motion.div>
                  
                  <h2 className="text-4xl font-bold text-gray-800 mb-8">Solar Quest</h2>
                  
                  <div className="space-y-6 text-lg text-gray-700">
                    <motion.div 
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="bg-gradient-to-r from-green-100 to-yellow-100 p-6 rounded-xl"
                    >
                      <h3 className="font-bold text-xl mb-2">Orientador</h3>
                      <p>{scene.content.orientador}</p>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="bg-gradient-to-r from-blue-100 to-green-100 p-6 rounded-xl"
                    >
                      <h3 className="font-bold text-xl mb-2">Alunos</h3>
                      <p>{scene.content.alunos}</p>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.9 }}
                      className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-xl"
                    >
                      <h3 className="font-bold text-xl mb-2">Colaborador</h3>
                      <p>{scene.content.colaborador}</p>
                    </motion.div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetGame}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="px-8 py-4 bg-gradient-to-r from-green-500 to-yellow-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 mx-auto"
                  >
                    <Home className="w-5 h-5" />
                    Voltar ao Início
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Partículas flutuantes */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-300 rounded-full opacity-30"
              animate={{
                x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
                y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SolarQuest;