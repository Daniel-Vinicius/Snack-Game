window.onload = function () {
    var jogo = document.getElementById("jogo");
    var contexto = jogo.getContext("2d");
    document.addEventListener("keydown", KeyPush);

    setInterval(game, 80);

    const velocidade = 1;

    var veloX = 0;
    var veloY = 0;

    var pontoX = 10;
    var pontoY = 10;

    var tamanhoPeca = 20;
    var quantidadePeca = 30;
    var macaX = 15;
    var macaY = 15;

    var rastro = [];
    cauda = 5;

    function game() {
      pontoX += veloX;
      pontoY += veloY;
      if (pontoX < 0) {
        pontoX = quantidadePeca - 1;
      }
      if (pontoX > quantidadePeca - 1) {
        pontoX = 0;
      }
      if (pontoY < 0) {
        pontoY = quantidadePeca - 1;
      }
      if (pontoY > quantidadePeca - 1) {
        pontoY = 0;
      }

      contexto.fillStyle = "#9f25fa";
      contexto.fillRect(0, 0, jogo.width, jogo.height);

      contexto.fillStyle = "#2771FF";
      contexto.fillRect(
        macaX * tamanhoPeca,
        macaY * tamanhoPeca,
        tamanhoPeca,
        tamanhoPeca
      );

      contexto.fillStyle = "#FFFFFF";
      for (var i = 0; i < rastro.length; i++) {
        contexto.fillRect(
          rastro[i].x * tamanhoPeca,
          rastro[i].y * tamanhoPeca,
          tamanhoPeca - 1,
          tamanhoPeca - 1
        );
        if (rastro[i].x === pontoX && rastro[i].y === pontoY) {
          veloY = 0;
          veloX = 0;
          cauda = 5;
        }
      }
      rastro.push({ x: pontoX, y: pontoY });
      while (rastro.length > cauda) {
        rastro.shift();
      }

      if (macaX == pontoX && macaY == pontoY) {
        cauda++;
        macaX = Math.floor(Math.random() * quantidadePeca);
        macaY = Math.floor(Math.random() * quantidadePeca);
      }
    }

    function KeyPush(event) {
      switch (event.keyCode) {
        case 37: // left
          veloX = -velocidade;
          veloY = 0;
          break;
        case 38: // up
          veloX = 0;
          veloY = -velocidade;
          break;
        case 39: // right
          veloX = velocidade;
          veloY = 0;
          break;
        case 40: // down
          veloX = 0;
          veloY = velocidade;
          break;
      }
    }
  };