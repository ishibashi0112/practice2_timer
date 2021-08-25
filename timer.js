const hour = document.getElementById("hour");
const mintues =  document.getElementById("mintues");
const seconds = document.getElementById("seconds");
const start = document.getElementById("start_button");
const stop = document.getElementById("stop_button");

// function addHTML(){

//   const HTML = 
// }
const timer = document.getElementById("changeTimer")
const children =  timer.children ;
console.log(children)
function deleteInput(){
  const timer = document.getElementById("changeTimer")
  while (timer.firstChild) {
    timer.removeChild(timer.firstChild)
  }
  // const children =  timer.children ;
  // console.log(children)
};

start.addEventListener("click",function(){
  const hourValue = hour.value
  const mintuesValue = mintues.value
  const secondsValue = seconds.value
  console.log(hourValue,mintuesValue)
  
  deleteInput()
  console.log(children)
});

stop.addEventListener("click",function(){
  console.log();
  
});