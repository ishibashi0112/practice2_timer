const hour = document.getElementById("hour");
const mintues =  document.getElementById("mintues");
const seconds = document.getElementById("seconds");
const startTimer = document.getElementById("start_button");
const stopTimer = document.getElementById("stop_button");
const setView = document.getElementById("changeTimer");
const children =  setView.children ;

// 入力された時間の取得
function getValue(){
  const hourValue = hour.value ;
  const mintuesValue = mintues.value ;
  const secondsValue = seconds.value ;
  return {hour: hourValue, mintues: mintuesValue,seconds: secondsValue}
};

function returnView(){
  for (let i = 0; i < children.length; i++) {
    let a = children[i];
    console.log(a)
    let b = document.createElement("div")
    b.setAttribute("class",a.classList[0])
    console.log(b)
    // setView.appendChild(b)
    
  }
};

// セッテイング⇄タイマー 切替時のビュー削除
function deleteView(){
  const timer = document.getElementById("changeTimer")
  while (timer.firstChild) {
    timer.removeChild(timer.firstChild)
  }
};

// 桁数変換
function digitChange(hour,mintues,seconds){
  let timeArray = [hour,mintues,seconds]
  for (let i = 0; i < timeArray.length; i++) {
    if(timeArray[i]<10){
      timeArray[i] = "0" + timeArray[i] 
    }
  }
   return timeArray
};

// タイマーテキスト作成
function createTimeText(hour,mintues,seconds){
  const changeTime =  digitChange(hour,mintues,seconds);
  const text = changeTime[0] + ":" + changeTime[1] + ":" + changeTime[2];
  return text
}

function addView(){
  const c = document.createElement("div")
  const timeText = createTimeText(getValue().hour, getValue().mintues, getValue().seconds)
  c.setAttribute("class","timer_view")
  c.innerText = (timeText)
  setView.appendChild(c)
  

  console.log(timeText,getValue().hour)
  // c.innerText()
}



startTimer.addEventListener("click",function(){
  startTimer.textContent = "一時停止" ;
  deleteView() ;
  addView()

  setInterval(function(){
    const startedTimeTxet = createTimeText(getValue().hour, getValue().mintues, getValue().seconds - 1);
    setView.innerText = startedTimeTxet ;
  },"1000")
});

stopTimer.addEventListener("click",function(){
  
  console.log(children);
  returnView()
});