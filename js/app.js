import { initPresence, initScrollProgress, initSignatureMoment } from "./motion.js";

function setYear(){
  const y = document.getElementById("year");
  if(y) y.textContent = String(new Date().getFullYear());
}

setYear();
initPresence();
initScrollProgress();
initSignatureMoment();
