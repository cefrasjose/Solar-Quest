import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Leaf, Zap, Mountain, Users, Home, RotateCcw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const storyData = {
  title: {
    id: 'title',
    type: 'choice',
    title: 'Solar Quest',
    content: `*"Construir um futuro exige mais do que luz, exige consciência.”*`,
    choices: [
      { text: 'START', next: 'intro' }
    ],
    background: 'sertao'
  },
  intro: {
    id: 'intro',
    type: 'input',
    title: 'Solar Quest',
    content: `Digite seu nome para começar esta jornada pelo sertão nordestino.`,
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
    content: `[Nome] nasceu em uma comunidade rural isolada no sertão nordestino. Filho de agricultores, cresceu lidando com a seca, escassez e o abandono político.

Aos 14 anos, perdeu o pai em um acidente de trabalho. Aos 17, migrou para a cidade em busca de emprego. Trabalhou como servente, eletricista e depois como técnico de energia.

[Nome] carrega um trauma consigo. Ter visto sua querida terra natal, onde estavam guardadas suas melhores lembranças, ser abandonada e explorada por projetos que nunca beneficiaram os moradores.

Diante de todos os problemas que enfrentou, o desejo de devolver a dignidade à sua região está em seu coração. Será que esse desejo será realizado?`,
    next: 'opportunityIntro',
    background: 'sertao'
  },
  femaleIntro: {
    id: 'femaleIntro',
    type: 'story',
    content: `[Nome] cresceu em uma pequena comunidade no interior do sertão. Filha de uma costureira e de um pedreiro, cresceu vendo sua comunidade lutar para sobreviver com dignidade.

Sempre foi excelente aluna, curiosa e determinada. Aos 18 anos, conseguiu uma bolsa para estudar engenharia ambiental em uma universidade estadual. Mas teve que abandonar os estudos para cuidar da mãe doente, que sofria de problemas respiratórios agravados pela poeira e pela poluição da região.

Viu sua cidade ser ignorada por décadas. Perdeu amigos para doenças respiratórias causadas por queimadas e pela falta de saneamento. Cresceu ouvindo promessas de progresso que nunca chegaram.

Em meio a todas as dificuldades que enfrentou, [Nome] pretende provar que é possível fazer diferente. Que tecnologia pode servir às pessoas e não apenas ao lucro. Que o sertão pode ser um lugar de vida, não de abandono.`,
    next: 'opportunityIntro',
    background: 'sertao'
  },
  opportunityIntro: {
    id: 'opportunityIntro',
    type: 'story',
    title: 'Capítulo 1 – A Escolha',
    content: `*"Construir um futuro exige mais do que luz, exige consciência.”*

O mundo está mudando e energia solar se tornou símbolo de progresso. Mas, também de disputa, impacto e ilusão.

Você viveu em uma zona de transição, onde o futuro ainda está em aberto. E um convite inesperado surge: Investir na construção de um parque solar. Dinheiro, influência e poder.

Mas cada raio de luz pode esconder uma sombra. O que fazer com essa oportunidade?`,
    next: (gender) => gender === 'male' ? 'maleOpportunity' : 'femaleOpportunity',
    background: 'solar'
  },
  maleOpportunity: {
    id: 'maleOpportunity',
    type: 'story',
    content: `Durante uma manutenção em uma subestação, você foi abordado por um investidor que durante os dias esteve te observando durante seu trabalho, e viu o potencial em seus olhos.

Investidor:
*- Você conhece esse chão, assim como conhece o sol. Você deseja liderar juntamente a mim e minha equipe, um projeto muito maior?*`,
    choices: [{ text: 'SIM', next: 'meetingMale' }],
    background: 'solar'
  },
  femaleOpportunity: {
    id: 'femaleOpportunity',
    type: 'story',
    content: `Durante um evento de sustentabilidade ao qual foi convidada a participar, você apresenta uma proposta de microgeração solar comunitária. E vendo todo potencial do seu projeto, um representante da ONG “Verde Viva”, Carlos Lima, se aproximou de você.

Carlos Lima:
*- Você tem visão, coragem e determinação. Quer se juntar a mim e minha equipe, para um projeto que pode envolver todo ecossistema?*`,
    choices: [{ text: 'SIM', next: 'meetingFemale' }],
    background: 'solar'
  },
  meetingMale: {
    id: 'meetingMale',
    type: 'story',
    title: 'A PROPOSTA',
    content: `Na Sede do Ministério da Energia, bairro do Recife Antigo, você entra em uma sala iluminada por luz natural. Mapas solares e gráficos estão espalhados pelas paredes.

Ministro Elias Rocha:
*- [Nome], técnico experiente, conhecedor da terra, filho do sertão. Estamos aqui porque acreditamos que você pode liderar algo grande.*

Carla Fontes (investidora):
*- A energia solar é o futuro. Mas não basta instalar placas — é preciso entender o solo, o clima, o impacto.*

Carlos Lima (ONG Verde Viva):
*- Energia limpa não é desculpa para devastação. Se esse projeto for feito com consciência, pode ser um modelo.*

Você observa os mapas e projeções e lembra da terra seca, dos poços que secaram.
*(Pensando): Energia limpa... mas será que é limpa para todo mundo? Se eu aceitar isso, não posso errar.*`,
    choices: [
      { text: 'ACEITAR O DESAFIO', next: 'terrainChoiceIntro' },
      { text: 'DESISTIR DESSE PROJETO', next: 'gameOver' }
    ],
    background: 'meeting'
  },
  meetingFemale: {
    id: 'meetingFemale',
    type: 'story',
    title: 'A PROPOSTA',
    content: `Na Sede do Ministério da Energia, bairro do Recife Antigo, você entra em uma sala iluminada por luz natural. Mapas solares e gráficos estão espalhados pelas paredes.

Ministro Elias Rocha:
*- [Nome]. Técnica ambiental, nascida no sertão, formada pela vida. Estamos lançando um projeto que pode transformar o Nordeste.*

Carla Fontes (investidora):
*- A proposta é clara: instalar um parque solar de grande escala. Energia limpa, empregos, progresso.*

Carlos Lima (ONG Verde Viva):
*- Energia solar pode ser uma bênção. Mas se for mal planejada, pode destruir mais do que iluminar.*

Você observa os mapas e gráficos e vê os rostos da infância — os vizinhos que adoeceram, os poços que secaram.
*(Pensando): Energia limpa... mas limpa para quem? Se eu aceitar isso, vou fazer do meu jeito. Com respeito, com escuta, com raiz.*`,
    choices: [
      { text: 'ACEITAR O DESAFIO', next: 'terrainChoiceIntro' },
      { text: 'DESISTIR DESSE PROJETO', next: 'gameOver' }
    ],
    background: 'meeting'
  },
  terrainChoiceIntro: {
    id: 'terrainChoiceIntro',
    type: 'story',
    title: 'A Escolha da Terra',
    content: `Dias se passaram. O entusiasmo inicial deu lugar a semanas de estudos intensos. A cidade está em alvoroço. O projeto é uma promessa que paira sobre o sertão.

Você mergulhou fundo: mapas, dados, visitas. Sentiu o chão sob os pés. Agora, no auditório do Ministério, chegou o momento decisivo.

Você (fala de abertura):
*- Quando aceitei esse projeto, sabia que não seria apenas sobre energia. Seria sobre terra, memória e futuro. Encontrei dois lugares que podem receber essa luz — mas cada um carrega suas próprias verdades.*`,
    next: 'terrainChoice',
    background: 'landscape'
  },
  terrainChoice: {
    id: 'terrainChoice',
    type: 'choice',
    title: 'Apresentação dos Terrenos',
    content: `**Pedra Branca (PE):**
*- Firme, seca, resiliente. Tem sol o ano inteiro, mas é marcada por abandono. O solo sofre, a fauna resiste. Se não cuidarmos, podemos transformar resistência em ruína.*

**Chapada do Sol Nascente (DF):**
*- Viva, elevada, promissora. A luz é pura, mas o solo é instável. Um passo errado, e a terra pode descer.*

Dona Lúcia (Pedra Branca):
*- Essa terra já viu muita coisa. Se vier com respeito, ela pode florescer. Mas se vier com pressa, ela vai se fechar.*

Jeferson Silva (Sol Nascente):
*- A gente quer fazer parte. Mas não queremos que a chapada vire só mais um lugar bonito destruído por promessas.*

Carla Fontes (investidora):
*- Ambos têm potencial. Mas precisamos de resultados. O mundo não vai esperar.*

Carlos Lima (ONG Verde Viva):
*- O mundo também não precisa de mais projetos que ignoram o que está vivo. Sua escolha pode ser o exemplo — ou o alerta.*

Você observa os rostos. A decisão não é apenas técnica — é moral, política e ecológica.`,
    choices: [
      { text: 'Pedra Branca — potência solar, risco de desertificação', next: 'pedraBrancaStart', terrain: 'pedraBranca' },
      { text: 'Chapada do Sol Nascente — inclusão comunitária, risco geológico', next: 'chapadaStart', terrain: 'chapada' }
    ],
    background: 'landscape'
  },
  pedraBrancaStart: {
    id: 'pedraBrancaStart',
    type: 'story',
    title: 'Capítulo 2: Sol sobre Pedra',
    content: `Dias após a escolha, caminhões chegam a Pedra Branca. O chão seco recebe estruturas metálicas que brilham sob o sol.

Colaborador (Rafael):
*- Nunca pensei que ia ver isso aqui. Pedra Branca sempre foi poeira e silêncio. Agora tem brilho.*

Você:
*- Vai mudar, sim. Mas a gente tem que garantir que seja para melhor.*

*(Pensando): Nada grave. Ainda não. Mas o sertão fala baixo. E quando grita... é tarde demais.*`,
    next: 'pedraBrancaSigns',
    background: 'construction'
  },
  chapadaStart: {
    id: 'chapadaStart',
    type: 'story',
    title: 'Capítulo 2: Luz na Encosta',
    content: `Após a escolha da Chapada, a comunidade vibra. A encosta recebe estruturas metálicas e os moradores acompanham com curiosidade.

Colaboradora (Tainá):
*- Nunca vi tanta gente trabalhando junto aqui. Parece que a chapada acordou.*

Você:
*- Acordou, sim. Mas ela é frágil. A gente tem que pisar leve.*

*(Pensando): Nada urgente. Nada alarmante. Mas a chapada tem memória. E ela cobra.*`,
    next: 'chapadaSigns',
    background: 'construction'
  },
  pedraBrancaSigns: {
    id: 'pedraBrancaSigns',
    type: 'story',
    title: 'A Terra Reclama em Silêncio',
    content: `Seis meses depois, o parque cresceu rápido, mas a terra mostra sinais de cansaço. Dona Lúcia entra em seu escritório.

Dona Lúcia:
*- O poço da escola secou. As crianças estão trazendo água de casa. Os dados não bebem água, [Nome]. A gente sim.*

O telefone toca. É Carla Fontes.
*- [Nome], precisamos acelerar. Não podemos parar por causa de poeira e poços.*

*(Pensando): A luz que prometi... está começando a queimar. Mas se eu parar agora, posso perder tudo. E se eu seguir... posso perder o que importa.*`,
    choices: [
      { text: 'Acelerar a obra — atender aos chefes', next: 'pedraBrancaAccelerate' },
      { text: 'Parar e reavaliar — ouvir a comunidade', next: 'pedraBrancaRevaluate' }
    ],
    background: 'warning'
  },
  chapadaSigns: {
    id: 'chapadaSigns',
    type: 'story',
    title: 'A Encosta Sussurra',
    content: `Seis meses depois, a comunidade está envolvida, mas a encosta sussurra. Jeferson te chama com urgência.

Jeferson:
*- A chuva levou terra para o riacho. A água está turva. Para a gente, é o começo de um problema. E se vier mais chuva?*

Você recebe uma mensagem de Carla Fontes.
*- [Nome], precisamos acelerar. Não podemos parar por causa de lama e água turva.*

*(Pensando): A chapada é bela. Mas também é frágil. Se eu seguir... posso quebrar o que não se vê. Se eu parar... posso perder o que já construí.*`,
    choices: [
      { text: 'Acelerar a obra — atender aos chefes', next: 'chapadaAccelerate' },
      { text: 'Parar e reavaliar — ouvir a comunidade', next: 'chapadaRevaluate' }
    ],
    background: 'warning'
  },
  pedraBrancaAccelerate: {
    id: 'pedraBrancaAccelerate',
    type: 'story',
    title: 'Capítulo 3: O Dia em que o Sol Feriu',
    content: `O céu amanhece laranja. O vento levanta nuvens densas de poeira. Alarmes soam. O poço principal seca. Crianças adoecem. Animais morrem.

Dona Lúcia (gritando):
*- Isso não é progresso! Isso é castigo!*

Você (tentando coordenar a equipe):
*- Fechem os painéis danificados! Protejam os poços! Mandem buscar caminhões-pipa!*

O parque se torna o epicentro de um desastre ambiental.`,
    choices: [
      { text: 'Diminuir o impacto por meio de ações', next: 'pedraBrancaActions' },
      { text: 'Abandonar tudo', next: 'gameOverMid' }
    ],
    background: 'disaster'
  },
  chapadaAccelerate: {
    id: 'chapadaAccelerate',
    type: 'story',
    title: 'Capítulo 3: O Dia em que a Encosta Caiu',
    content: `Após dias de chuva intensa, a encosta cede. Um bloco de terra desliza, atingindo o parque e casas.

Jeferson (correndo entre os escombros):
*- A gente avisou! A chapada não aguenta essa pressa!*

Você (em choque):
*- Evacuem a área! Chamem os bombeiros! Isolem os painéis quebrados!*

O riacho corre contaminado. A mídia chega. ONGs denunciam. Você sente o peso da escolha.`,
    choices: [
      { text: 'Diminuir o impacto por meio de ações', next: 'chapadaActions' },
      { text: 'Abandonar tudo', next: 'gameOverMid' }
    ],
    background: 'disaster'
  },
  pedraBrancaRevaluate: {
    id: 'pedraBrancaRevaluate',
    type: 'story',
    title: 'O Dia em que a Terra Foi Ouvida',
    content: `Você decide pausar a obra. Reúne engenheiros e moradores.

Você (em reunião comunitária):
*- A terra está nos avisando. E nós vamos escutar.*

Barreiras vegetais são plantadas, o uso de água é redirecionado. A poeira diminui. O solo começa a se recompor.

Dona Lúcia (emocionada):
*- Ela está respirando de novo. E tudo porque você parou para ouvir.*`,
    next: 'perfectEnding',
    background: 'healing'
  },
  chapadaRevaluate: {
    id: 'chapadaRevaluate',
    type: 'story',
    title: 'O Dia em que a Chapada Foi Protegida',
    content: `Você reúne engenheiros e moradores. Decide reforçar contenções com técnicas ecológicas e replantar vegetação nativa.

Jeferson (durante mutirão):
*- A chapada está sendo cuidada. E ela está respondendo.*

As chuvas chegam, mas o solo se mantém firme. O riacho continua limpo. O parque cresce com respeito.`,
    next: 'perfectEnding',
    background: 'healing'
  },
  pedraBrancaActions: {
    id: 'pedraBrancaActions',
    type: 'story',
    title: 'Respirar o Sertão',
    content: `Você reúne todos para iniciar ações emergenciais. Barreiras com mandacarus são erguidas para conter a poeira. Um sistema de reuso de água é criado para limpar os painéis. Um viveiro comunitário começa a reflorestar a área.

Dona Lúcia (sorrindo, com as mãos na terra):
*- A gente está plantando mais do que árvore. Está plantando respeito.*

Narrador:
*Pedra Branca, pela primeira vez em meses, respirava. E você começava a entender que luz demais, sem sombra, é cegueira.*`,
    next: 'playerMonologue',
    background: 'healing'
  },
  chapadaActions: {
    id: 'chapadaActions',
    type: 'story',
    title: 'Firmar a Encosta',
    content: `A chapada precisava de tempo, de raízes e de cuidado. Você inicia um replantio de vegetação nativa nas áreas inclinadas e constrói canais de drenagem com pedras locais. Um observatório comunitário é criado para vigiar a encosta.

Jeferson (apontando para o riacho):
*- Olha só... ela tá voltando a sorrir.*

Narrador:
*A chapada não gritou. Ela sussurrou. E você, finalmente, escutou.*`,
    next: 'playerMonologue',
    background: 'healing'
  },
  playerMonologue: {
    id: 'playerMonologue',
    type: 'story',
    title: 'Entre Luz e Sombra',
    content: `Dias depois, você caminha por uma trilha. O chão está rachado. Você para e fala consigo mesmo.

*(Pensando): Seis meses atrás, eu acreditava que a luz bastava. Mas o sol não cura sozinho. Ele também queima. Eu acelerei. Ignorei os sinais. E quando a poeira subiu, quando o chão caiu... Eu vi. Senti. Mas já era tarde.*

*(Pensando): E agora dizem que há uma mulher que lê a terra. Ela me espera. Sei que o que eu escolher agora não é sobre placas. É sobre gente. Sobre chão. Sobre futuro.*

Você respira fundo e segue até a cabana.`,
    next: (gender, terrain) => terrain === 'pedraBranca' ? 'pedraBrancaCartomante' : 'chapadaCartomante',
    background: 'mystical'
  },
  pedraBrancaCartomante: {
    id: 'pedraBrancaCartomante',
    type: 'story',
    title: 'A Terra Fala por Ela',
    content: `Você entra na cabana de Mãe Zefa. O ar é seco, carregado de energia.

Mãe Zefa (sem abrir os olhos):
*- Você trouxe luz demais. E não escutou a sombra. Pedra Branca está em desequilíbrio. E agora... você tem que escolher.*

Ela abre os olhos e descreve o que acontecerá em cada caminho.`,
    next: 'finalChoicePedraBranca',
    background: 'mystical'
  },
  chapadaCartomante: {
    id: 'chapadaCartomante',
    type: 'story',
    title: 'A Encosta Tem Voz',
    content: `Você encontra Dona Iraci em uma clareira.

Dona Iraci:
*- Você trouxe pressa para um lugar que vive de tempo. A chapada está ferida. E você... tem três caminhos.*

Ela desenha três linhas na terra com um bastão e descreve o que acontecerá em cada caminho.
*- A chapada não grita. Ela sussurra. E quem não escuta... escorrega.*`,
    next: 'finalChoiceChapada',
    background: 'mystical'
  },
  finalChoicePedraBranca: {
    id: 'finalChoicePedraBranca',
    type: 'choice',
    title: 'O Último Sol do Sertão',
    content: 'Você está sozinho no mirante do parque. O chão ainda carrega marcas. A conversa com Mãe Zefa ecoa em sua mente. Você fecha os olhos, respira fundo. E escolhe.',
    choices: [
      { text: 'Amenizar os impactos ambientais', next: 'goodEndingPedraBranca' },
      { text: 'Não acreditar e deixar como está', next: 'tragicEndingPedraBranca' },
      { text: 'Ficar sem esperanças e abandonar', next: 'midEndingPedraBranca' }
    ],
    background: 'landscape'
  },
  finalChoiceChapada: {
    id: 'finalChoiceChapada',
    type: 'choice',
    title: 'A Última Palavra da Encosta',
    content: 'Você caminha pela trilha até o ponto mais alto da chapada. A conversa com Dona Iraci pulsa em sua memória. Você observa o parque, as casas, o riacho. E escolhe.',
    choices: [
      { text: 'Amenizar os impactos ambientais', next: 'goodEndingChapada' },
      { text: 'Não acreditar e deixar como está', next: 'tragicEndingChapada' },
      { text: 'Ficar sem esperanças e abandonar', next: 'midEndingChapada' }
    ],
    background: 'landscape'
  },
  perfectEnding: {
    id: 'perfectEnding',
    type: 'ending',
    title: 'FINAL PERFEITO',
    content: `Você escutou a terra antes que ela gritasse. O parque se tornou referência em energia sustentável, integrando a comunidade e o ambiente.

A luz que você trouxe não queima - *ela cura*. O projeto floresceu porque você parou para ouvir.`,
    background: 'paradise'
  },
  goodEndingPedraBranca: {
    id: 'goodEndingPedraBranca',
    type: 'ending',
    title: 'FINAL BOM',
    content: `Você convoca a comunidade. Barreiras vegetais são ampliadas. Sistemas de reuso de água são instalados. O parque é redesenhado para coexistir com a terra.

Dona Lúcia (com lágrimas nos olhos):
*- Você não só trouxe luz. Você trouxe cuidado.*

Narrador:
*Pedra Branca floresceu. O sol foi domado. A poeira virou sombra fresca. E você... virou guardião da terra.*`,
    background: 'growth'
  },
  tragicEndingPedraBranca: {
    id: 'tragicEndingPedraBranca',
    type: 'ending',
    title: 'FINAL TRÁGICO',
    content: `Você ignora os alertas. O parque continua a operar. A poeira se intensifica. Os poços secam. A cidade começa a esvaziar. O parque é interditado por contaminação.

Dona Lúcia (em voz baixa):
*- Você viu. Você sabia. Mas não escutou.*

Narrador:
*Pedra Branca virou ruína. A luz que prometia... destruiu. E você... virou lembrança amarga.*`,
    background: 'desolation'
  },
  midEndingPedraBranca: {
    id: 'midEndingPedraBranca',
    type: 'ending',
    title: 'FINAL MEIO TERMO',
    content: `Você desativa o parque. A comunidade perde investimentos. A terra começa a se recuperar lentamente. O projeto é encerrado.

Dona Lúcia:
*- Você não feriu mais. Mas também não curou.*

Narrador:
*Pedra Branca sobreviveu. Mas o que poderia ter sido... nunca será.*`,
    background: 'neutral'
  },
  goodEndingChapada: {
    id: 'goodEndingChapada',
    type: 'ending',
    title: 'FINAL BOM',
    content: `Você lidera mutirões de reflorestamento. Barreiras naturais são reforçadas. Trilhas ecológicas são criadas. O parque se transforma em modelo de regeneração.

Jeferson (sorrindo):
*- Você não virou as costas. E a chapada... agradeceu.*

Narrador:
*A luz foi respeitada. A sombra foi acolhida. E você... virou exemplo.*`,
    background: 'growth'
  },
  tragicEndingChapada: {
    id: 'tragicEndingChapada',
    type: 'ending',
    title: 'FINAL TRÁGICO',
    content: `Você mantém o parque funcionando. Novos deslizamentos ocorrem. O riacho é contaminado. A comunidade é evacuada. O parque é interditado.

Jeferson (revoltado):
*- Você viu. Você sabia. E mesmo assim... deixou cair.*

Narrador:
*A chapada virou cicatriz. E você... virou silêncio.*`,
    background: 'desolation'
  },
  midEndingChapada: {
    id: 'midEndingChapada',
    type: 'ending',
    title: 'FINAL MEIO TERMO',
    content: `Você desativa o parque. A comunidade perde apoio. A natureza começa a se recompor. O projeto é encerrado. O terreno vira reserva.

Jeferson:
*- Você não destruiu mais. Mas também não construiu.*

Narrador:
*A chapada sobreviveu. Mas o sonho... se perdeu.*`,
    background: 'neutral'
  },
  gameOver: {
    id: 'gameOver',
    type: 'ending',
    title: 'FIM DE JOGO',
    content: `Você decidiu não aceitar o desafio. O projeto seguiu com outra liderança, e você nunca soube qual foi o destino da terra. Às vezes, a sabedoria está em saber quando não agir.`,
    background: 'ending'
  },
  gameOverMid: {
    id: 'gameOverMid',
    type: 'ending',
    title: 'FIM DE JOGO',
    content: `Você abandonou o projeto diante do desastre. A terra vai se curar sozinha, mas vai demorar. O parque virou ruína e a comunidade murchou. Você carrega o peso do que poderia ter sido.`,
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
  // CORREÇÃO: Alterado o estado inicial de 'intro' para 'title'
  const [currentScene, setCurrentScene] = useState('title');
  const [playerName, setPlayerName] = useState('');
  const [playerGender, setPlayerGender] = useState('');
  const [terrain, setTerrain] = useState('');
  const [inputName, setInputName] = useState('');

  const resetGame = () => {
    // Ao resetar, volta para a tela de título
    setCurrentScene('title');
    setPlayerName('');
    setPlayerGender('');
    setTerrain('');
    setInputName('');
  };

  const handleChoice = (choice) => {
    if (choice.gender) {
      setPlayerGender(choice.gender);
    }
    if (choice.terrain) {
      setTerrain(choice.terrain);
    }

    let nextSceneId = choice.next;
    if (typeof nextSceneId === 'function') {
      nextSceneId = nextSceneId(playerGender, terrain);
    }
    setCurrentScene(nextSceneId);
  };

  const handleNext = (nextScene) => {
    let nextSceneId = nextScene;
    if (typeof nextSceneId === 'function') {
      nextSceneId = nextSceneId(playerGender, terrain);
    }
    setCurrentScene(nextSceneId);
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
    return text ? text.replace(/\[Nome]/g, playerName) : '';
  };

  if (!scene) {
    return <div>Erro: Cena não encontrada - {currentScene}</div>;
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
                  <div className={`prose prose-lg max-w-none text-gray-700 leading-relaxed ${scene.id === 'title' ? 'text-center' : ''}`}>
                    <ReactMarkdown>
                      {replacePlayerName(scene.content)}
                    </ReactMarkdown>
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
                            {/* Centraliza o botão de START na tela de título */}
                            {currentScene === 'title' ? 
                              <span className="font-semibold text-gray-800 w-full text-center">{choice.text}</span> :
                              <>
                                {!choice.terrain && !choice.gender && <Zap className="w-6 h-6 text-yellow-600" />}
                                <span className="font-semibold text-gray-800">{choice.text}</span>
                              </>
                            }
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
                    <ReactMarkdown>
                      {replacePlayerName(scene.content)}
                    </ReactMarkdown>
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