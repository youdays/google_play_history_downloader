# google_play_history_downloader

GooglePlayの購入履歴ページから課金額などを抽出してCSVでダウンロードするJavascript

このスクリプトではCSVファイルを作るだけなので、エクセルなどを駆使して課金合計金額などを計算してみましょう

# はじめに
* Javascriptで動かしています
* 抽出したデータはどこにも送信してないので安心してください
* 動けばいいくらいの気持ちで作っているので、色々雑です
* 不具合や改善要望ありましたら、気軽に  [@youdaysgame1(twitter)](https://twitter.com/youdaysgame1) までご連絡ください

# 動作環境
Mac x Chrome
# 使い方
## 準備
1. <a href="javascript:(function(){var a='https://rawgithub.com/youdays/google_play_history_downloader/dist/bookmarklet.js?'+(new Date()).getTime();var d=document;var e=d.createElement('script');e.charset='utf-8';e.src=a;d.getElementsByTagName('head')[0].appendChild(e);})();">google_play_history</a>
1. [注文履歴 - Google Play](https://play.google.com/store/account/orderhistory)へアクセスしてください
2. 