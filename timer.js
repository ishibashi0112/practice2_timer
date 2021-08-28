const hour = document.getElementById("hour");
const mintues =  document.getElementById("mintues");
const seconds = document.getElementById("seconds");
const startTimer = document.getElementById("start_button");
const stopTimer = document.getElementById("stop_button");
const setView = document.getElementById("changeTimer");


// 入力された時間の取得
function getValue(){
  const hourValue = hour.value ;
  const mintuesValue = mintues.value ;
  const secondsValue = seconds.value ;
  return {hour: hourValue, mintues: mintuesValue,seconds: secondsValue}
};

// セッテイング⇄タイマー 切替時のビュー復元
function returnView(){
  const divs =  setView.children ;
  startTimer.textContent = "開始" ;
  deleteView()
  const fr = document.createDocumentFragment();
  for (let i = 0; i < 3; i++) {
    const div = document.createElement("div");
    div.setAttribute("class","timer_input");
    fr.appendChild(div)
  }
  setView.appendChild(fr)
  console.log(fr)
  const array1 = ["hour","minutues","seconds"]
  const array2 = ["時間","分","秒"]
  for (let i = 0; i < divs.length; i++) {
    const input = document.createElement("input") 
    input.setAttribute("id",array1[i]);
    input.setAttribute("maxlength","2");
    input.setAttribute("value","0");
    divs[i].appendChild(input)
    divs[i].insertAdjacentHTML("beforeend", array2[i])
    console.log(divs[i])
    
  };
};

// セッテイング⇄タイマー 切替時のビュー削除
function deleteView(){
  const timer = document.getElementById("changeTimer")
  while (timer.firstChild) {
    timer.removeChild(timer.firstChild)
  }
};

// セッテイング⇄タイマー 切替時のビュー切替
function addView(){
  const timeText = createTimeText(getValue().hour, getValue().mintues, getValue().seconds)
  const c = document.createElement("div")
  c.setAttribute("id","timer_view")
  c.innerText = (timeText)
  setView.appendChild(c)
}

// テキスト作成時の桁数変換
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
  return text ;
}

// タイムテキストの変更
function changeText(now,i){
  const startedTimeTxet = createTimeText(getValue().hour, getValue().mintues, getValue().seconds - i);
  now.innerText = startedTimeTxet ;
}

let timerMove;
const m = { moveT:  function(now, i){
                      timerMove = setInterval(
                      function(){ 
                        i = i + 1
                        changeText(now,i);
                        if(now.textContent == "00:00:00"){
                          clearInterval(timerMove);
                        }
                      },"1000")
                    },
            stopT: function(){
              clearInterval(timerMove)
            }
          };


function timerMovement(now){
  let i = 0
  m.moveT(now, i)
}


startTimer.addEventListener("click",function(e){
  const child = setView.children[0].getAttribute("class")
  if (child == "timer_input") {
    e.preventDefault
  }else if(startTimer.textContent == "開始"){
    startTimer.textContent = "一時停止" ;
    deleteView() ;
    addView() ;
    const now = document.getElementById("timer_view");
    timerMovement(now) ;
  }else if(startTimer.textContent == "一時停止"){
    startTimer.textContent = "再開" ;
    m.stopT()
  }else if(startTimer.textContent == "再開"){
    startTimer.textContent = "一時停止" ;
    const progress = document.getElementById("timer_view");
    console.log(progress)
    timerMovement(progress) 
  }
});

stopTimer.addEventListener("click",function(){
  m.stopT()
  returnView()
});