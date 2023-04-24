
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
  
  const bodyPage = document.querySelector('body');
  const startBtn = document.querySelector('button[data-start]');
  const stopBtn = document.querySelector('button[data-stop]');
  
  stopBtn.disabled = true;
  let colorChangeInterval = null;
  
  let start = () =>{
      colorChangeInterval = setInterval(() => {
          bodyPage.style.backgroundColor = getRandomHexColor();
          startBtn.disabled = true;
          stopBtn.disabled = false;
      }, 500);
  };
  
  let stop = () =>{
      clearInterval(colorChangeInterval);
      startBtn.disabled = false;
      stopBtn.disabled = true;
  };
  startBtn.addEventListener('click', start);
  stopBtn.addEventListener('click', stop);
  