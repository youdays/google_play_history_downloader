# google_play_history_downloader

GooglePlayの購入履歴ページから課金額などを抽出してCSVでダウンロードするJavascript

このスクリプトではCSVファイルを作るだけなので、課金額の計算などはエクセルやGoogleスプレッドを利用してください

# はじめに
* Javascriptで動かしています
* 抽出したデータはどこにも送信してないので安心してください
* 情報を読み込む過程で画面が勝手に動きますが、すべての履歴を表示するための操作なので安心してください
  * 一番下までスクロールして次のデータの読み込みを促しています
* 不具合や改善要望ありましたら、気軽に  [@youdaysgame1(twitter)](https://twitter.com/youdaysgame1) までご連絡ください

# 動作環境
Mac x Chrome
# 使い方
## 準備
* ブックマークバーを右クリックし、「ページを追加...」を選択
* 以下の文字を入力して「保存」を選択
   *  名前 | google_play_history_downloader
       ----|-----
       URL | `javascript:(()=>{const a=()=>{return t=3,new Promise(e=>{setTimeout(()=>{e()},1e3*t)});var t},l=()=>{var e=document.documentElement,e=e.scrollHeight-e.clientHeight;window.scroll(0,e)},o=()=>document.documentElement.scrollHeight,r=()=>document.getElementsByClassName("NVOyre")[0].querySelector('[role="button"]'),c=()=>document.getElementsByClassName("U6fuTe"),s=e=>{return{img:e.getElementsByClassName("T75of")[0].getAttribute("src"),date:e.getElementsByClassName("goeMJb")[0].textContent,detail:e.getElementsByClassName("XqqpEd")[0].textContent,price:e.getElementsByClassName("mshXob")[0].textContent.replace(/[^0-9]/g,"")}},t=e=>'"'+e.replaceAll('"','""')+'"';(async()=>{confirm("CSVファイルを作る前にすべての履歴を読み込みますか?")&&(alert("すべての履歴を読み込みます。しばらく画面が動きますが、CSV完成までそのままお待ち下さい。"),await(async()=>{let e=o();for(;;){l(),await a();const n=r();n&&(n.click(),await a());var t=o();if(t===e)break;e=t}})());var e="date, price, img, detail\n"+(()=>{const t=[];var n=c();for(let e=0;e<n.length;e++){var a=n[e];t.push(s(a))}return t})().map(e=>[e.date,e.price,e.img,e.detail].map(t).join(",")).join("\n");(e=>{var t=`google_play_history_${(new Date).getTime()}.csv`,n=new Uint8Array([239,187,191]),e=new Blob([n,e],{type:"text/csv"});const a=document.createElement("a");e=URL.createObjectURL(e);a.href=e,a.download=t,a.style.visibility="hidden",document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(e)})(e)})()})();`
          
    * <img src="https://user-images.githubusercontent.com/5615266/147882897-6fdda9ae-c797-47ad-9077-e797d544fcaf.png" width="320px">
* ブックマークに `google_play_history_downloader` が追加されれば完了

### 実行
* [注文履歴 - Google Play](https://play.google.com/store/account/orderhistory)を開く
* 準備で作成したブックマーク `google_play_history_downloader` を選択
* 処理が完了すると自動的に `google_play_history_xxxxxx.csv` のようなファイルがダウンロードされる
  * a. 処理の途中で `CSVファイルを作る前にすべての履歴を読み込みますか?"` と選択肢がでる
    * **OK** => 読み込みの自動操作が行われて、**全履歴の情報を含んだ**CSVを作成
    * **キャンセル** => 自動操作は行われず、 **現時点で表示されている情報**のみのCSVを作成

# 作成されるCSVについて
## 内容
作成されたCSVには以下の情報が記録されます

ヘッダー | 内容 | 例
--------|------|------
date | 課金日 | 2021/12/29
price | 課金額 | 980
img | 画像URL | `https://play-lh.googleusercontent.com/XCFdLox0zVZKcinipXpp9p17fyRhX3LevGYIsbpSaYl-W8PUb1CmIy0NCPhr-efuTg=s50-rw` <br> (↑はラグマスのURL)
detail | 商品名 | VIPチケット

<img src="https://user-images.githubusercontent.com/5615266/147883198-bc8b8150-4b10-4bbe-80cc-b386d3f4fce7.png" >

**アプリ名は取得できないため、画像URLでアプリを識別してください** :pray: 

## 使用例)2021年の総課金額

Googleスプレッドシートで開いたときの操作方法

1. フィルターの作成
2. `date`のフィルターを選択
3. `2021`で`始まるテキスト`を設定
4. `OK`でフィルタリング
5. `price`の列を選択すると、右下に合計金額が表示される

<img src="https://user-images.githubusercontent.com/5615266/147883445-fab3adb9-5571-4ad2-bbbd-b8c4708793c5.png" width="320px" >
<br>
<img src="https://user-images.githubusercontent.com/5615266/147883722-092e7df4-448b-4395-b91c-1d9fe8466d16.png" width="320px" >
