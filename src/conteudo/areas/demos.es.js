/**
 * Os textos das duas demonstrações e do cartão da abertura em espanhol. As
 * chaves são as mesmas de `demos.pt.js`, na mesma ordem — o pt continua sendo
 * a fonte.
 *
 * Espanhol neutro, que serve Espanha e América Latina: "recorte" (nunca
 * "retal" nem "retazo"), "plancha", "caballete", "hueco", "escuadra",
 * "presupuesto". Tratamento de "usted", que é como o vidriero espera ser
 * tratado por um fornecedor dos dois lados do Atlântico.
 */
export default {
  // ── A demonstração da indústria: chapa, cavalete e a chapa não aberta ──
  retalho: {
    barra: {
      titulo: 'Optimización de corte',
      pedido: 'Pedido 26-0431 · 8 mm incoloro',
      passo: (n, total) => `Paso ${n} de ${total}`,
    },

    // O desenho: o rótulo de cada chapa e o que o leitor de tela ouve.
    desenho: {
      chapa: 'Plancha',
      retalho: 'Recorte',
      aria: (tipo, id, pecas) => `${tipo} ${id} con ${pecas} piezas`,
      chapaNova: 'Plancha nueva · la que usted compra',
      cavalete: 'En el caballete · sobras de otros pedidos',
      plano: (chapas) => `El plan · ${chapas} planchas nuevas`,
      chapaN: (n) => `Plancha ${n}`,
      retalhoN: (n) => `Recorte ${n}`,
      cavaletePrimeiro: (pecas) => `Primero el caballete · ${pecas} piezas`,
      entaoChapaNova: (novas, antes) => `Recién entonces plancha nueva · ${novas} en vez de ${antes}`,
      naoAberta: (n) => `Plancha ${n} · sin abrir`,
    },

    // Os cinco formatos do pedido de exemplo.
    pecas: {
      portaBox: 'Puerta de mampara',
      fixoLateral: 'Fijo lateral',
      prateleira: 'Estante',
      espelho: 'Espejo de baño',
      tampo: 'Tapa de mesa',
    },

    pronto: {
      selo: 'El pedido que entró',
      titulo: (pecas, formatos) => `${pecas} piezas, ${formatos} medidas`,
      texto:
        'Un pedido común de un martes. Usted no tiene que cargar nada — solo apretar el botón y ver lo que hace el sistema.',
    },

    otimizando: {
      selo: 'Optimizando',
      titulo: 'Armando el plan de corte…',
      linhas: {
        lendo: (pecas) => `Leyendo ${pecas} piezas del pedido`,
        respeitando: 'Respetando espesor, color y veta',
        testando: 'Probando encajes y giro de pieza',
        ordenando: 'Ordenando según la secuencia de la mesa',
      },
    },

    plano: {
      selo: 'Plan listo',
      titulo: (chapas, aproveitamento) =>
        `${chapas} planchas · ${aproveitamento} de aprovechamiento`,
      texto: 'Ya es un buen plan. Cualquier optimizador del mercado se detiene acá.',
      achou: 'El sistema encontró algo en el caballete',
      servem: (retalhos) => `${retalhos} recortes sirven para este pedido.`,
      medida: (medida) => `${medida} mm · vidrio que usted ya pagó`,
      parados:
        'Están apoyados contra la pared desde otro pedido. Mientras nadie los use, son plata parada.',
    },

    realocando: {
      selo: 'Reubicando',
      titulo: 'Primero el caballete, después la plancha…',
      linhas: {
        medindo: (retalhos) => `Midiendo los ${retalhos} recortes del caballete`,
        movendo: (pecas) => `Pasando ${pecas} piezas adentro de ellos`,
        refazendo: 'Rehaciendo el plan de las planchas nuevas',
        baixa: 'Dando de baja los recortes usados',
      },
    },

    economia: {
      selo: 'Lo que usted no va a gastar',
      titulo: '1 plancha entera',
      subtitulo: 'que no se va a abrir',
      placar: {
        m2: (m2) => `${m2} m²`,
        m2Texto: 'de vidrio pagado que volvió a valer',
        pecas: (noCavalete, total) => `${noCavalete} de ${total}`,
        pecasTexto: 'piezas salieron del caballete',
        aproveitamento: (antes, depois) => `${antes} → ${depois}`,
        aproveitamentoTexto: 'de aprovechamiento en la plancha abierta',
        retalhos: (retalhos) => `${retalhos} recortes`,
        retalhosTexto: 'se fueron de la pared',
      },
      // O destaque é uma palavra só, em gradiente, no meio da frase — por isso
      // ela vem partida em três e não como uma frase inteira.
      pergunta: {
        antes: 'Esto fue',
        destaque: 'un',
        depois: 'pedido. ¿Cuántos cierra su fábrica por semana?',
      },
      sozinho:
        'En el sistema este segundo botón ni existe: mira el caballete solo, antes de cada plan. Nadie tiene que acordarse, y nadie tiene que tener ganas.',
    },

    // Um rótulo por fase da máquina de estados.
    botoes: {
      otimizar: 'Optimizar el corte',
      otimizando: 'Optimizando…',
      realocando: 'Reubicando…',
      usarRetalhos: (retalhos) => `Usar los ${retalhos} recortes`,
      agendar: 'Hacerlo con un pedido mío',
      denovo: 'Repetir',
    },

    nota: {
      padrao: 'Simulación con un pedido real. No se envía nada a ningún lado.',
      economia: 'Cuenta hecha por un optimizador de verdad, acá dentro de su navegador.',
    },
  },

  // ── A demonstração da vidraçaria: do vão medido ao PDF na mão ──────────
  orcamento: {
    barra: {
      titulo: 'NeoGlass en el celular · en la obra',
      cliente: (nome) => `Cliente ${nome}`,
      passo: (n, total) => `Paso ${n} de ${total}`,
    },

    obra: {
      vao: 'Ventana de sala',
      parede: 'mampostería',
    },

    desenho: {
      aria: 'El hueco medido en la obra',
      janela: '2 hojas corredizas · 6 mm',
      medindo: 'anotando las diagonales…',
      vaoMedido: 'Hueco medido en la obra',
      montando: 'Armando la ventana en el hueco',
      janelaDoVao: 'La ventana de este hueco',
      pdfGerado: 'PDF generado',
      prontoCliente: 'Listo para el cliente',
      oOrcamento: 'El presupuesto que acaba de armar',
    },

    // As quatro linhas do orçamento. O valor de cada uma chega formatado.
    itens: {
      vidro: {
        nome: 'Vidrio templado 6 mm incoloro',
        detalhe: (medida, m2) => `2 hojas · ${medida} mm · ${m2} m²`,
      },
      kit: {
        nome: 'Kit corredizo',
        detalhe: 'guía superior e inferior, ruedas, cierre',
      },
      perfil: {
        nome: 'Perfil, goma y terminación',
        detalhe: 'sellado y remate del hueco',
      },
      instalacao: {
        nome: 'Instalación y sellado',
        detalhe: 'mano de obra, 1 jornada · traslado',
      },
    },

    documento: {
      empresa: 'Su Cristalería',
      marca: 'su marca, su teléfono',
      orcamento: 'Presupuesto',
      cliente: 'Cliente',
      servico: 'Trabajo',
      servicoValor: (vao, medida) => `${vao} · ${medida}`,
      total: 'Total',
      validade: 'Validez de 10 días · plazo de 7 días hábiles desde la aprobación',
      assinatura: 'firma del cliente',
    },

    vao: {
      selo: 'Lo que usted hizo en la obra',
      titulo: (vao, medida) => `${vao} · ${medida}`,
      texto:
        'Foto del hueco, dos medidas, el tipo de pared. Treinta segundos con el celular en la mano — es todo lo que el sistema le pide.',
      ficha: {
        vao: 'Hueco',
        parede: 'Pared',
        esquadro: 'Diagonales',
        esquadroValor: '1.947 y 1.951 mm',
        foto: 'Foto',
        fotoValor: '2 imágenes adjuntas',
      },
      chamada: 'Ahora apriete el botón. No va a escribir nada más.',
    },

    montando: {
      selo: 'Armando',
      titulo: 'Encajando la ventana en su medida…',
      linhas: {
        folhas: 'Eligiendo 2 hojas corredizas para este hueco',
        folga: (folga, sobreposicao) =>
          `Descontando ${folga} mm de holgura y ${sobreposicao} mm de solape`,
        somando: 'Sumando guía, ruedas, cierre y sellado',
        precos: 'Trayendo los precios de su lista',
      },
    },

    lista: {
      selo: (numero) => `Presupuesto ${numero}`,
      titulo: 'Listo, y usted no escribió nada.',
      total: 'Total para el cliente',
      rodape: (m2, itens) =>
        `${m2} m² de vidrio, ${itens} ítems, ninguna cuenta hecha de memoria. Los precios salen de su lista — estos son solo un ejemplo.`,
    },

    pdf: {
      selo: 'Documento listo',
      titulo: 'Con su marca, no con la nuestra.',
      texto:
        'Logo, teléfono, validez, plazo y la línea de la firma. Es este papel el que hace que el cliente vea una empresa y no un arreglo de palabra — y salió solo.',
      linhas: {
        logo: 'Su logo y sus datos en el encabezado',
        prazo: 'Validez y plazo de entrega por escrito',
        assinatura: 'Firma en la pantalla o en el papel',
        via: 'Una copia archivada en el pedido, para siempre',
      },
    },

    enviar: {
      selo: 'Así de simple',
      toques: '3 toques',
      // O cronômetro só entra quando o visitante levou menos de 90 segundos.
      segundos: (segundos) => ` y ${segundos} segundos`,
      semTempo: ', cero tecleo',
      textoTempo:
        'Es el tiempo que le llevó recién, del hueco al presupuesto listo. En la obra es el mismo camino — con el cliente mirando.',
      textoSemTempo:
        'Del hueco al presupuesto listo usted no escribió una sola medida. En la obra es el mismo camino — con el cliente mirando.',
      escolha: 'Elija por dónde sale',
      canais: {
        whatsapp: 'WhatsApp',
        email: 'E-mail',
        pdf: 'Bajar PDF',
      },
      aprovar: 'Y cuando él aprueba, el pedido ya entra a producción con las medidas de corte.',
      ninguem:
        'Nadie vuelve a escribirlo, nadie llama para confirmar el espesor, y el recorte que sobre de esa plancha vuelve a su stock con medida.',
    },

    preco: {
      selo: 'Cuánto cuesta',
      porMes: '/mes',
      /* Aqui dizia que o preço era por vidraçaria e não por pessoa, e logo
         abaixo "sem custo por usuário". O dono do projeto avisou em 13/08 que
         a regra de cobrança por usuário NÃO está definida, então as duas eram
         promessa que a fatura não cumpre. No lugar entrou o que é verdade e
         vende igual: o preço não muda com o tempo. Volta a falar de usuário no
         dia em que a regra existir. */
      porVidracaria: 'Precio fijo, hoy y dentro de un año.',
      // O valor chega pronto de `config.js` — a moeda muda com o idioma.
      conta: (valor) => `El presupuesto que acaba de armar fue de ${valor}.`,
      contaEnfase: 'Era una ventana.',
      pagaMeses: (meses) => `Ese trabajo solo paga ${meses} meses de sistema.`,
      naoCobramos: {
        implantacao: 'Sin implantación',
        orcamento: 'Sin cargo por presupuesto',
        fidelidade: 'Sin permanencia',
      },
      teste: (dias) =>
        `Son ${dias} días gratis, sin tarjeta. Usted arma los presupuestos de la semana y decide después — si no decide, no se cobra nada.`,
      semTeste: 'Sin permanencia: si no le sirve para su día, cancela desde la propia pantalla.',
    },

    whatsapp: {
      titulo: (numero, vao, medida) => `Presupuesto ${numero} — ${vao} ${medida}`,
      item: (nome, valor) => `• ${nome}: ${valor}`,
      total: (valor) => `Total: ${valor}`,
      rodape: 'Armado en la demostración del sitio de NeoGlass.',
    },

    // Um rótulo por fase, na ordem em que o visitante os aperta.
    botoes: {
      usarVao: 'Usar este hueco',
      montando: 'Armando…',
      gerando: 'Generando el PDF…',
      gerarPdf: 'Generar el PDF del cliente',
      enviar: 'Enviar al cliente',
      naObra: 'Lo quiero en mi obra',
      incluido: 'Ver todo lo incluido',
      denovo: 'repetir',
      zap: 'Recibir el presupuesto por WhatsApp',
    },

    nota: {
      padrao: 'Valores de ejemplo. En el sistema salen de su lista de precios.',
      preco:
        'Este es el precio, no un rango. Los valores del presupuesto de arriba sí son de ejemplo.',
    },
  },

  // ── O cartão que troca de face na abertura ─────────────────────────────
  cartao: {
    ia: 'IA',
    otimizacao: {
      selo: 'Optimización de corte',
      plano: 'Plan 26-0431 · 8 mm incoloro',
      resumo: '7 piezas · 1 recorte',
    },
    expedicao: {
      selo: 'Expedición · carga 118',
      peca: 'Pieza P5 leída en la salida',
      medida: '600 × 1150 · 10 mm · templado',
      conferidas: '5 de 7 verificadas',
    },
    fechamento: {
      selo: 'Cierre del pedido',
      // O valor em reais é escrito no componente: aqui só entra a palavra.
      receita: (valor) => `26-0431 · ingreso ${valor}`,
      materia: 'Materia prima',
      producao: 'Producción y gastos',
      margem: 'Margen de este pedido',
    },
  },
}
