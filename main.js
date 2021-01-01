'use strict';

{
  //現在の月、日を取得
  const current = new Date();
  const cMonth = current.getMonth() + 1;
  const cDay = current.getDate();

  //結果表示用の元データ
  const fortunes = ['末吉', '小吉', '吉', '中吉', '大吉'];
  const messages = ['今日は微妙かも...', '今日は気をつけよう！', '運勢はまあまあ', '今日は良い日♪', 'すごい！良いことあるかも！'];

  const FortuneTeller = class{
    constructor(myFortune, message){
      this.myFortune = myFortune;
      this.message = message;
    }
  }
  
  //以下、ボタンクリック後
  document.getElementById('btn').addEventListener('click', function(){
    
    //入力された(=占う)誕生日を取得
    const birthday = document.getElementById('birthday').value;
    const fMonth = Number(birthday[0] + birthday[1]); //誕生月
    const fDay = Number(birthday[2] + birthday[3]); //誕生日

    //数字4桁で入力されていない時
    if(birthday.length !== 4){
      alert('誕生日は半角4ケタで入力してください。')
      return;
    } 

    //誕生月や誕生日が存在しない日にちの時
    if(fMonth >= 13){
      alert('誕生日に誤りがあります。')
      return;
    }else if(fMonth === 2 && fDay > 29){
      alert('誕生日に誤りがあります。')
      return;
    }else if(((fMonth < 8 && fMonth%2 === 0) || (fMonth >= 8 && fMonth%2 === 1)) && fDay > 30){
      alert('誕生日に誤りがあります。')
      return;
    }else if(((fMonth < 8 && fMonth%2 === 1) || (fMonth >= 8 && fMonth%2 === 0)) && fDay > 31){
      alert('誕生日に誤りがあります。')
      return;
    }
    
    //占い結果の数値
    let fToldMonth = Math.round((fMonth / cMonth)*10);
    let fToldDay = Math.round((fDay / cDay)*10);
    if(fMonth === cMonth){
      fToldMonth *= 10; 
    }
    if(fDay === cDay){
      fToldDay *= 10; 
    }
    
    //運勢の数値。吉凶や表示内容決定に利用
    const myNum = fToldMonth + fToldDay;
    
    //運勢の表示
    let i;
    if(myNum <= 99){
      i = 0;
    }else if(myNum <=129){
      i = 1;
    }else if(myNum <=159){
      i = 2;
    }else if(myNum <=189){
      i = 3;
    }else{
      i = 4;
    }
    
    const result = new FortuneTeller(fortunes[i], messages[i]);
    
    //結果の表示
    const target = document.getElementById('target');
    target.innerHTML = `
    <h1>${result.myFortune}</h1>
    <p>${result.message}</p>
    `;

    if(i === 4){
      target.querySelector('h1').style = 'color:red'
    }else if(i === 0){
      target.querySelector('h1').style = 'color:blue'
    }

  })
  
}

