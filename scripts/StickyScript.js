var dragEl = null;
// methods
var onDragStart = null;
var onDrag = null;
var onDragEnd = null;
var createNode = null;
// /////////////////////////////////////////////////

var grabY = null;
var grabX = null;
var addNodeBtnEl = null;
var IsStickyNoteMoving = false;

var StickyNotes = document.querySelector(".StickyOption");
var board = document.getElementById("board");
// last in sticky Script
onDragStart = function(ev) {
  var boundingClientRect;
  IsStickyNoteMoving = true;
  if (ev.target.className.indexOf("bar") === -1) return;
  dragEl = this;
  boundingClientRect = dragEl.getBoundingClientRect();
  grabY = boundingClientRect.top - ev.clientY;
  grabX = boundingClientRect.left - ev.clientX;
};
onDrag = function(ev) {
  if (dragEl === null || IsStickyNoteMoving === false) return;
  let posX = ev.clientX + grabX;
  let posY = ev.clientY + grabY;
  if (posX < 10) posX = 10;
  if (posY < 90) posY = 90;
  dragEl.style.transform =
    "translateX(" + posX + "px) translateY(" + posY + "px)";
  dragEl.style.zIndex = "1";
};
onDragEnd = function() {
  IsStickyNoteMoving = false;
  dragEl = null;
  grabX = null;
  grabY = null;
};

////////////////////////

CloseEvent = function(event) {
  let Parent = this.parentNode.parentNode;
  Parent.removeChild(this.parentNode);
};
MinimizeEvent = function(event) {
  let Parent = this.parentNode;
  if (Parent.children[3].style.display !== "none") {
    Parent.children[3].style.display = "none";
  } else {
    Parent.children[3].style.display = "";
  }
};
createNode = function() {
  // const parentEle = document.getElementById("Sticky");
  // html
  const stickerEl = document.createElement("div");
  const TextBlock = document.createElement("div");
  const barEl = document.createElement("div");
  const textareaEl = document.createElement("textarea");
  const close = document.createElement("div");
  const minimize = document.createElement("div");
  // css
  TextBlock.classList.add("textBlock");
  stickerEl.classList.add("sticker");
  barEl.classList.add("bar");
  textareaEl.classList.add("show");
  close.classList.add("close");
  minimize.classList.add("minimize");
  // added to stickerEL
  stickerEl.appendChild(barEl);
  stickerEl.appendChild(close);
  stickerEl.appendChild(minimize);
  TextBlock.appendChild(textareaEl);
  stickerEl.appendChild(TextBlock);
  // Event Listeners
  // for dragging
  stickerEl.addEventListener("mousedown", onDragStart, false);
  stickerEl.addEventListener("mousemove", onDrag, false);
  stickerEl.addEventListener("mouseup", onDragEnd, false);
  stickerEl.addEventListener("mouseleave", onDragEnd, false);
  // create and delete
  close.addEventListener("click", CloseEvent, false);
  minimize.addEventListener("click", MinimizeEvent, false);
  // to place it in a particular position on board
  onStart(stickerEl);
  // added sticky  to document
  document.body.appendChild(stickerEl);
};

StickyNotes.addEventListener("click", createNode, false);
//?? need to check if i really need to make a function or it could be directly done
onStart = function(Ele) {
  if (!Ele) return;
  const posX = board.width / 2;
  const posY = board.height / 2;
  Ele.style.transform = "translateX(" + posX + "px) translateY(" + posY + "px)";
  Ele.style.zIndex = "1";
};
