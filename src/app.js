const pieces = [
  { type: "wr", row: 0, col: 0 },
  { type: "wn", row: 0, col: 1 },
  { type: "wb", row: 0, col: 2 },
  { type: "wk", row: 0, col: 3 },
  { type: "wq", row: 0, col: 4 },
  { type: "wb", row: 0, col: 5 },
  { type: "wn", row: 0, col: 6 },
  { type: "wr", row: 0, col: 7 },

  { type: "wp", row: 1, col: 0 },
  { type: "wp", row: 1, col: 1 },
  { type: "wp", row: 1, col: 2 },
  { type: "wp", row: 1, col: 3 },
  { type: "wp", row: 1, col: 4 },
  { type: "wp", row: 1, col: 5 },
  { type: "wp", row: 1, col: 6 },
  { type: "wp", row: 1, col: 7 },

  { type: "bp", row: 6, col: 0 },
  { type: "bp", row: 6, col: 1 },
  { type: "bp", row: 6, col: 2 },
  { type: "bp", row: 6, col: 3 },
  { type: "bp", row: 6, col: 4 },
  { type: "bp", row: 6, col: 5 },
  { type: "bp", row: 6, col: 6 },
  { type: "bp", row: 6, col: 7 },

  { type: "br", row: 7, col: 0 },
  { type: "bn", row: 7, col: 1 },
  { type: "bb", row: 7, col: 2 },
  { type: "bk", row: 7, col: 3 },
  { type: "bq", row: 7, col: 4 },
  { type: "bb", row: 7, col: 5 },
  { type: "bn", row: 7, col: 6 },
  { type: "br", row: 7, col: 7 },
];

const handleDrag = (event) => {
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.setData("pieceId", event.target.id);
};

const handleDragOver = (event) => {
  event.preventDefault();
};

const handleDrop = (event) => {
  event.preventDefault();
  const pieceId = event.dataTransfer.getData("pieceId");

  const squareWidth = event.currentTarget.offsetWidth / 8.0;
  pieces[pieceId].row = Math.floor(event.pageY / squareWidth);
  pieces[pieceId].col = Math.floor(event.pageX / squareWidth);

  placePieces(pieces);
};

const board = document.querySelector("#board");
board.addEventListener("dragover", handleDragOver);
board.addEventListener("drop", handleDrop);

const placePieces = (pieces) => {
  board.innerHTML = "";
  pieces.forEach((piece, index) => {
    const pieceElement = document.createElement("div");
    pieceElement.id = index;

    pieceElement.classList.add("piece");
    pieceElement.classList.add(piece.type);

    const translate = `translate(${piece.col * 100}%,${piece.row * 100}%)`;
    pieceElement.style.transform = translate;

    pieceElement.draggable = true;
    pieceElement.addEventListener("dragstart", handleDrag);

    board.appendChild(pieceElement);
  });
};

placePieces(pieces);
