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
    content: '[Nome] nasceu em uma comunidade rural isolada no sertão nordestino. Filho de agricultores, cresceu lidando com a seca, escassez e o abandono político.\n\nAos 14 anos, perdeu o pai em um acidente de trabalho. Aos 17, migrou para a cidade em busca de emprego. Trabalhou como servente, eletricista e depois como técnico de energia.\n\n[Nome] carrega um trauma consigo. Ter visto sua querida terra natal, onde estavam guardadas suas melhores lembranças, ser abandonada e explorada por projetos que nunca beneficiaram os moradores.\n\nDiante de todos os problemas que enfrentou, o desejo de devolver a dignidade à sua região está em seu coração.',
    next: 'maleOpportunity',
    background: 'sertao'
  },
  femaleIntro: {
    id: 'femaleIntro',
    type: 'story',
    content: '[Nome] cresceu em uma pequena comunidade no interior do sertão. Filha de uma costureira e de um pedreiro, cresceu vendo sua comunidade lutar para sobreviver com dignidade.\n\nSempre foi excelente aluna, curiosa e determinada. Aos 18 anos, conseguiu uma bolsa para estudar engenharia ambiental em uma universidade estadual. Mas teve que abandonar os estudos para cuidar da mãe doente.\n\nViu sua cidade ser ignorada por décadas. Perdeu amigos para doenças respiratórias causadas por queimadas e pela falta de saneamento.\n\nEm meio a todas as dificuldades que enfrentou, [Nome] pretende provar que é possível fazer diferente.',
    next: 'femaleOpportunity',
    background: 'sertao'
  },
  maleOpportunity: {
    id: 'maleOpportunity',
    type: 'story',
    content: 'O mundo está mudando e energia solar se tornou símbolo de progresso. Mas, também de disputa, impacto e ilusão.\n\nDurante uma manutenção em uma subestação, você foi abordado por um investidor que durante os dias esteve te observando durante seu trabalho.\n\nInvestidor:\n- Você conhece esse chão, assim como conhece o sol. Você deseja liderar juntamente a mim e minha equipe, um projeto muito maior?',
    choices: [{ text: 'SIM', next: 'meetingMale' }],
    background: 'solar'
  },
  femaleOpportunity: {
    id: 'femaleOpportunity',
    type: 'story',
    content: 'O mundo está mudando e energia solar se tornou símbolo de progresso. Mas, também de disputa, impacto e ilusão.\n\nDurante um evento de sustentabilidade ao qual foi convidada a participar, você apresenta uma proposta de microgeração solar comunitária.\n\nCarlos Lima, representante da ONG Verde Viva, se aproximou de você:\n- Você tem visão, coragem e determinação. Quer se juntar a mim e minha equipe, para um projeto que pode envolver todo ecossistema?',
    choices: [{ text: 'SIM', next: 'meetingFemale' }],
    background: 'solar'
  },
  meetingMale: {
    id: 'meetingMale',
    type: 'story',
    content: 'Na Sede do Ministério da Energia, você entra em uma sala iluminada por luz natural. Mapas solares e gráficos estão espalhados pelas paredes.\n\nMinistro Elias Rocha:\n- [Nome], técnico experiente, conhecedor da terra, filho do sertão. Estamos aqui porque acreditamos que você pode liderar algo grande.\n\nCarla Fontes (investidora):\n- A energia solar é o futuro. Mas não basta instalar placas — é preciso entender o solo, o clima, o impacto.\n\nCarlos Lima (ONG Verde Viva):\n- Energia limpa não é desculpa para devastação. Se esse projeto for feito com consciência, pode ser um modelo.',
    choices: [
      { text: 'Aceitar o desafio', next: 'terrainChoice' },
      { text: 'Desistir do projeto', next: 'gameOver' }
    ],
    background: 'meeting'
  },
  meetingFemale: {
    id: 'meetingFemale',
    type: 'story',
    content: 'Na Sede do Ministério da Energia, você entra em uma sala iluminada por luz natural. Mapas solares e gráficos estão espalhados pelas paredes.\n\nMinistro Elias Rocha:\n- [Nome]. Técnica ambiental, nascida no sertão, formada pela vida. Estamos lançando um projeto de energia solar que pode transformar o Nordeste.\n\nCarla Fontes:\n- A proposta é clara: instalar um parque solar de grande escala. Energia limpa, empregos, progresso.\n\nCarlos Lima:\n- Energia solar pode ser uma bênção. Mas se for mal planejada, pode destruir mais do que iluminar.',
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
    content: 'Após semanas de estudos intensos, chegou o momento decisivo: escolher onde o parque solar será construído.\n\nPedra Branca (Pernambuco):\nFirme, seca, resiliente. Tem sol o ano inteiro, mas é marcada por abandono. O solo sofre, a fauna resiste.\n\nChapada do Sol Nascente (DF):\nViva, elevada, promissora. A luz é pura, mas o solo é instável. Um passo errado, e a terra pode descer.',
    choices: [
      { text: 'Pedra Branca — potência solar, risco de desertificação', next: 'pedraBrancaStart', terrain: 'pedraBranca' },
      { text: 'Chapada do Sol Nascente — inclusão comunitária, risco geológico', next: 'chapadaStart', terrain: 'chapada' }
    ],
    background: 'landscape'
  },
  pedraBrancaStart: {
    id: 'pedraBrancaStart',
    type: 'story',
    content: 'Dias após a escolha de Pedra Branca, caminhões chegam trazendo equipamentos. O chão seco recebe estruturas metálicas que brilham sob o sol.\n\nColaborador Rafael:\n- Nunca pensei que ia ver isso aqui. Pedra Branca sempre foi poeira e silêncio. Agora tem brilho.\n\nPrimeiros sinais começam: o solo está mais quente, o poço tem menos água, pequenas nuvens de poeira se formam.',
    next: 'pedraBrancaSigns',
    background: 'construction'
  },
  chapadaStart: {
    id: 'chapadaStart',
    type: 'story',
    content: 'Após a escolha da Chapada, a comunidade vibra com o projeto. A encosta recebe estruturas metálicas.\n\nColaboradora Tainá:\n- Nunca vi tanta gente trabalhando junto aqui. Parece que a chapada acordou.\n\nPrimeiros sinais: um engenheiro nota inclinação excessiva, a vegetação removida afeta a estabilidade, a água desce mais rápido.',
    next: 'chapadaSigns',
    background: 'construction'
  },
  pedraBrancaSigns: {
    id: 'pedraBrancaSigns',
    type: 'story',
    content: 'Seis meses depois, a terra mostra sinais de cansaço. O calor aumentou, a poeira se espalha, os poços estão mais rasos.\n\nDona Lúcia entra preocupada:\n- O poço da escola secou. As crianças estão trazendo água de casa.\n\nCarla Fontes liga:\n- Precisamos acelerar. Não podemos parar por causa de poeira e poços.',
    choices: [
      { text: 'Acelerar a obra — atender aos chefes', next: 'pedraBrancaAccelerate' },
      { text: 'Parar e reavaliar — ouvir a comunidade', next: 'pedraBrancaRevaluate' }
    ],
    background: 'warning'
  },
  chapadaSigns: {
    id: 'chapadaSigns',
    type: 'story',
    content: 'Seis meses depois, a encosta sussurra. Chuvas deixaram marcas, a água desce mais rápido, o solo escorrega em silêncio.\n\nJeferson:\n- A chuva levou terra para o riacho. A água está turva.\n\nCarla Fontes:\n- Precisamos acelerar. Não podemos parar por causa de lama e água turva.',
    choices: [
      { text: 'Acelerar a obra — atender aos chefes', next: 'chapadaAccelerate' },
      { text: 'Parar e reavaliar — ouvir a comunidade', next: 'chapadaRevaluate' }
    ],
    background: 'warning'
  },
  pedraBrancaAccelerate: {
    id: 'pedraBrancaAccelerate',
    type: 'story',
    content: 'O DIA EM QUE O SOL FERIU\n\nO céu amanhece alaranjado. O calor é sufocante. Alarmes soam indicando queda na umidade e aumento extremo da temperatura.\n\nDona Lúcia grita:\n- Isso não é progresso! Isso é castigo!\n\nO poço principal seca. Crianças adoecem. Animais morrem.',
    choices: [
      { text: 'Diminuir o impacto por ações', next: 'pedraBrancaCartomante' },
      { text: 'Abandonar tudo', next: 'gameOverMid' }
    ],
    background: 'disaster'
  },
  chapadaAccelerate: {
    id: 'chapadaAccelerate',
    type: 'story',
    content: 'O DIA EM QUE A ENCOSTA CAIU\n\nApós chuvas intensas, a encosta cede. Um bloco de terra desliza, atingindo parte do parque e casas.\n\nJeferson:\n- A gente avisou! A chapada não aguenta essa pressa!\n\nO riacho corre barrento e contaminado.',
    choices: [
      { text: 'Diminuir o impacto por ações', next: 'chapadaCartomante' },
      { text: 'Abandonar tudo', next: 'gameOverMid' }
    ],
    background: 'disaster'
  },
  pedraBrancaRevaluate: {
    id: 'pedraBrancaRevaluate',
    type: 'story',
    content: 'O DIA EM QUE A TERRA FOI OUVIDA\n\nVocê pausa a obra. Reúne engenheiros e moradores. Barreiras vegetais são plantadas, o uso de água é redirecionado.\n\nDona Lúcia:\n- Ela está respirando de novo. E tudo porque você parou para ouvir.',
    next: 'perfectEnding',
    background: 'healing'
  },
  chapadaRevaluate: {
    id: 'chapadaRevaluate',
    type: 'story',
    content: 'O DIA EM QUE A CHAPADA FOI PROTEGIDA\n\nVocê reúne engenheiros e moradores. Decide reforçar contenções com técnicas ecológicas.\n\nJeferson:\n- A chapada está sendo cuidada. E ela está respondendo.',
    next: 'perfectEnding',
    background: 'healing'
  },
  pedraBrancaCartomante: {
    id: 'pedraBrancaCartomante',
    type: 'story',
    content: 'AQUELA QUE LÊ A TERRA\n\nVocê procura Mãe Zefa em sua cabana, cercada por mandacarus.\n\nMãe Zefa:\n- Você trouxe luz demais. E não escutou a sombra. Pedra Branca está em desequilíbrio.\n\nEla aponta para três objetos: uma pedra rachada, uma garrafa com água turva, e uma folha seca.',
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
    content: 'AQUELA QUE LÊ A TERRA\n\nVocê encontra Dona Iraci em uma clareira, com um bastão de madeira nas mãos.\n\nDona Iraci:\n- Você trouxe pressa para um lugar que vive de tempo. A chapada está ferida.\n\nEla desenha três linhas na terra: uma reta, uma curva, e uma quebrada.',
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
    title: 'FINAL PERFEITO',
    content: 'Você escutou a terra antes que ela gritasse. O parque se tornou referência internacional em energia sustentável. A comunidade prospera com equilíbrio ambiental.\n\nA luz que você trouxe não queima - ela cura.',
    background: 'paradise'
  },
  goodEnding: {
    id: 'goodEnding',
    type: 'ending',
    title: 'FINAL BOM',
    content: 'Você convoca a comunidade. Barreiras vegetais são ampliadas. Sistemas de reuso de água são instalados. O parque é redesenhado para coexistir com a terra.\n\nDona Lúcia:\n- Você não só trouxe luz. Você trouxe cuidado.',
    background: 'growth'
  },
  tragicEnding: {
    id: 'tragicEnding',
    type: 'ending',
    title: 'FINAL TRÁGICO',
    content: 'Você ignora os alertas. O parque continua a operar. A poeira se intensifica. Os poços secam. A cidade começa a esvaziar.\n\nDona Lúcia:\n- Você viu. Você sabia. Mas não escutou.',
    background: 'desolation'
  },
  midEnding: {
    id: 'midEnding',
    type: 'ending',
    title: 'FINAL MEIO TERMO',
    content: 'Você desativa o parque. A comunidade perde investimentos. A terra começa a se recuperar lentamente. O projeto é encerrado.\n\nA natureza seguirá seu curso.',
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
      orientador: 'Renato Nunes Ramalho',
      alunos: 'Lucas Nadson, Mariana Vitória, Rikelmy – 3° ano "G" EREMWAL 2025',
      colaboradores: [
        'Cefras Mandú, Robson Luan – Eng. de Computação IFPB - CG',
        'Francisco Ferreira - UniFAP - CE'
      ]
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

  const resetGame = () => {
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
    }
    if (choice.terrain) {
      setTerrain(choice.terrain);
    }
    setCurrentScene(choice.next);
  };

  const handleNext = (nextScene) => {
    setCurrentScene(nextScene);
  };

  const handleNameSubmit = () => {
    if (inputName.trim()) {
      setPlayerName(inputName.trim());
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
                      <h3 className="font-bold text-xl mb-2">Colaboradores</h3>
                      <div className="space-y-2">
                        {scene.content.colaboradores.map((colaborador, index) => (
                          <motion.p 
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.1 + index * 0.2 }}
                            className="text-gray-700"
                          >
                            {colaborador}
                          </motion.p>
                        ))}
                      </div>
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

        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-300 rounded-full opacity-30"
              animate={{
                x: [0, 100, -50, 150],
                y: [0, -80, 120, -40],
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