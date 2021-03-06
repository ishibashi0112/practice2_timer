const setView = document.getElementById("changeTimer");

// ↓◉関数◉↓

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
  const array1 = ["hour","mintues","seconds"]
  const array2 = [" 時間"," 分"," 秒"]
  for (let i = 0; i < divs.length; i++) {
    const input = document.createElement("input") 
    input.setAttribute("id",array1[i]);
    input.setAttribute("maxlength","2");
    input.setAttribute("value","0");
    divs[i].appendChild(input)
    divs[i].insertAdjacentHTML("beforeend", array2[i])  
  };
};

// セッテイング⇄タイマー 切替時のビュー削除
function deleteView(){
  const timer = document.getElementById("changeTimer")
  while (timer.firstChild) {
    timer.removeChild(timer.firstChild)
  }
};

// セッテイング⇄タイマー 切替時のビュー挿入
function addView(hour,mintues,seconds){
  const timeText = createTimeText(hour, mintues, seconds)
  const div = document.createElement("div")
  div.setAttribute("id","timer_view")
  div.innerText = timeText;
  setView.appendChild(div)
};

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
  const changeTime =  digitChange(hour, mintues ,seconds);
  const text = changeTime[0] + ":" + changeTime[1] + ":" + changeTime[2];
  return text ;
};

// タイマーテキストの変更(毎秒)
function changeText(now,i,hour,mintues,seconds){
  const startedTimeTxet = createTimeText(hour, mintues, seconds - i);
  now.innerText = startedTimeTxet ;
};

// タイマーカウント制御
let timeOut;
let i = 0 ;
function countTime(now,hour,mintues,seconds){
  changeText(now,i,hour,mintues,seconds);
  i = i + 1
  timeOut = setTimeout(function(){
    countTime(now,hour,mintues,seconds)
  },"1000")
  // タイマー単位切替(01:00:00→00:59:59  01:00→:00:59)
  if(mintues > 0 && seconds - i == -1 ){
    i = 0;
    mintues -= 1;
    seconds = 59;
    Mintues = mintues
    Seconds = seconds
  }if(hour > 0 && mintues == 0  &&  seconds - i == -1 ){
    i = 0 ;
    hour -= 1 ;
    mintues = 59;
    seconds = 59;
    Mintues = mintues
    Seconds = seconds
  }else if(now.textContent == "00:00:00"){
    i = 0 ;
    clearTimeout(timeOut);
    setTimeout(function(){alert("終了")},50);
    returnView();
    hour = mintues = seconds = "";
    startTimer.setAttribute("id","start_button");
  };
};

// タイマーキャンセル
function cansel(){
  clearTimeout(timeOut);
  returnView();
  i = 0 ;
  hour = mintues = seconds = "";
  startTimer.setAttribute("id","start_button");
}


// ↓◉イベント◉↓

// タイマー開始イベント
const startTimer = document.getElementById("start_button");
const cancelTimer = document.getElementById("cancel_button");
let Hour, Mintues, Seconds ;
document.addEventListener("click",function(e){
  if(e.target.id == "start_button"){
    Hour = document.getElementById("hour").value;
    Mintues =  document.getElementById("mintues").value;
    Seconds = document.getElementById("seconds").value;
    console.log(Hour , Mintues ,Seconds)
    if(Hour == 0 && Mintues == 0 && Seconds == 0){  //00:00:00は無効
      e.preventDefault();
    }else {
    startTimer.textContent = "一時停止"
    startTimer.setAttribute("id","stop_button")
    deleteView();
    addView(Hour, Mintues, Seconds);
    const now = document.getElementById("timer_view");
    countTime(now,Hour,Mintues,Seconds);
    }
  }else if(e.target.id == "stop_button"){
    startTimer.textContent = "再開"
    startTimer.setAttribute("id","restart_button")
    clearTimeout(timeOut);
  }else if(e.target.id == "restart_button"){
    startTimer.textContent = "一時停止" ;
    startTimer.setAttribute("id","stop_button")
    console.log(Hour, Mintues, Seconds)
    const progress = document.getElementById("timer_view");
    countTime(progress,Hour, Mintues, Seconds);
    console.log(progress)
  }
})


// タイマーキャンセルイベント
cancelTimer.addEventListener("click",function(e){
  const child = setView.children[0].getAttribute("class");
  if (child == "timer_input"){
    e.preventDefault();
  } else {
    cansel();
  };
});

// ENTERタップ→次のフォームをフォーカス。
document.addEventListener("keyup",function(e){
  if(e.target.tagName == "INPUT" && e.key == "Enter"){
    if(e.target.id == "hour" || e.target.id == "mintues"){
      const selectInput = e.path[0] ;
      const nextInput = e.path[1].nextElementSibling.firstElementChild;
      nextInput.focus()
      nextInput.select()
      if(selectInput.value == ""){
        selectInput.value = "0"
      };
    };
  };
});

// フォーム選択時にテキストを自動選択
document.addEventListener("click",function(e){
  if(e.target.tagName == "INPUT"){
    e.path[0].select()
  }
})

// 入力制限
document.addEventListener("input",function(e){
  const inputData = e.data ;          //入力された数値を取得
  const numberCheck = /^[0-9]+$/ ;    //半角0-9のみ
  const formValue = e.path[0].value;  
  const formId = e.path[0].id

  if(e.target.tagName == "INPUT"){
    if(numberCheck.test(inputData)){
      if(formValue.length == 2 && formValue.slice(0,1) == "0"){
        e.path[0].value = formValue.slice(1);
      }else if(formValue > 59 && formId == "mintues" || formValue > 59 && formId == "seconds" ){
        e.path[0].value = "";
      }
    }else if(isNaN(formValue)){
      e.path[0].value = "";
    };
  };
});
