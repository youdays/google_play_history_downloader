(() => {
  const sleep = (waitSec) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, waitSec * 1000)
    })
  }
  const waitDataLoad = () => {
    // 3秒待ち
    return sleep(3)
  }
  const moveToBottom = () => {
    const element = document.documentElement
    const bottom = element.scrollHeight - element.clientHeight
    window.scroll(0, bottom)
  }

  const getScrolHeight = () => {
    return document.documentElement.scrollHeight
  }

  const getMoreWrapper = () => {
    return document.getElementsByClassName('NVOyre')[0]
  }
  const getMoreViewButton = () => {
    return getMoreWrapper().querySelector('[role="button"]')
  }

  const getHistoryRows = () => {
    return document.getElementsByClassName('U6fuTe')
  }

  const parseHistoryRow = (rowDiv) => {
    const img = rowDiv.getElementsByClassName('T75of')[0].getAttribute('src')
    const date = rowDiv.getElementsByClassName('goeMJb')[0].textContent
    const detail = rowDiv.getElementsByClassName('XqqpEd')[0].textContent
    const price = rowDiv
      .getElementsByClassName('mshXob')[0]
      .textContent.replace(/[^0-9]/g, '')

    return {
      img,
      date,
      detail,
      price
    }
  }

  // カンマやダブルクォーテーションが含まれる文字を出力するとCSVが崩壊してしまうので、それらの調整
  //  * 全体を"でくくる
  //  * 中の"を""へ変換
  const convertToCSVCellString = (str) => {
    return '"' + str.replaceAll('"', '""') + '"'
  }

  // dataArrayはデータの配列
  // [{'src': 'xxx', 'date': 'yyy', 'price': 'zzz'}, ...]
  const convertCSVData = (dataArray) => {
    const header = 'date, price, img, detail\n'
    return (
      header +
      dataArray
        .map((data) => {
          return [data.date, data.price, data.img, data.detail]
            .map(convertToCSVCellString)
            .join(',')
        })
        .join('\n')
    )
  }

  const downloadCSV = (csvData) => {
    const fileName = `google_play_history_${new Date().getTime()}.csv`

    const bom = new Uint8Array([0xef, 0xbb, 0xbf])
    const blob = new Blob([bom, csvData], { type: 'text/csv' })

    const downloadElem = document.createElement('a')
    const url = URL.createObjectURL(blob)
    downloadElem.href = url
    downloadElem.download = fileName
    downloadElem.style.visibility = 'hidden'

    document.body.appendChild(downloadElem)
    downloadElem.click()

    document.body.removeChild(downloadElem)
    URL.revokeObjectURL(url)
  }

  const loadAll = async () => {
    let scrollHeight = getScrolHeight()
    while (1) {
      moveToBottom()
      await waitDataLoad()

      // 読み込み後に「さらに読み込み」ボタンが存在するなら押してロードする
      const moreViewButton = getMoreViewButton()
      if (moreViewButton) {
        moreViewButton.click()
        await waitDataLoad()
      }

      const currentHeight = getScrolHeight()
      // 高さが変わらないならば、読み込み完了
      if (currentHeight === scrollHeight) {
        break
      }
      scrollHeight = currentHeight
    }
  }

  const parseAllHitory = () => {
    const result = []
    const historyRows = getHistoryRows()
    for (let i = 0; i < historyRows.length; i++) {
      const row = historyRows[i]
      result.push(parseHistoryRow(row))
    }
    return result
  }

  const main = async () => {
    if (confirm('CSVファイルを作る前にすべての履歴を読み込みますか?')) {
      alert(
        'すべての履歴を読み込みます。しばらく画面が動きますが、CSV完成までそのままお待ち下さい。'
      )
      await loadAll()
    }
    const parsedData = parseAllHitory()
    const csvData = convertCSVData(parsedData)
    downloadCSV(csvData)
  }

  main()
})()
