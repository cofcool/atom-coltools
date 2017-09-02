'use babel';

import cheerio from 'cheerio';
import md5 from 'blueimp-md5';

export default class Covert {
  static covert() {
    let editor;
    if (editor = atom.workspace.getActiveTextEditor()) {
      try {
        const $ = cheerio.load(editor.getText());
        const allComms = []
        $('div.re_comm > p').each((idx, ele) => {
            allComms.push('* ' + $(ele).text());
        });
        editor.setText(allComms.join('\n'));
      } catch (err) {
        const notificationManager = atom.notifications;
        notificationManager.addError('The file is not HTML file!');
      }
    }
  }

  static upper() {
    Covert.covertSelectedText(true)
  }

  static lower() {
    Covert.covertSelectedText(false)
  }

  static covertSelectedText(upper = true) {
    let editor;
    if (editor = atom.workspace.getActiveTextEditor()) {
      const selectedText = editor.getSelectedText()
      if (selectedText) {
        const newText = Covert.covertCase(selectedText, upper)
        editor.insertText(newText)
      }
    }
  }

  static covertCase(word, upper = true) {
    return upper ? word.toUpperCase() : word.toLowerCase()
  }

  static md5() {
    let editor;
    if (editor = atom.workspace.getActiveTextEditor()) {
      const selectedText = editor.getSelectedText()
      if (selectedText) {
        const newStr = md5(selectedText)
        const notificationManager = atom.notifications;
        notificationManager.addInfo(newStr);
      }
    }
  }

  static splitKindleClippings() {
    let editor;
    if (editor = atom.workspace.getActiveTextEditor()) {
      const allText = editor.getText()
      if (allText) {
        let newStrs = ""
        const allStrs = allText.split("==========")
        allStrs.map((item, idx) => {
          const lineStrs = item.split("\n")

          let bookName = ""
          let content = ""
          if (lineStrs.length === 5) {
            bookName = lineStrs[0]
            content = lineStrs[3]
          } else if (lineStrs.length === 6) {
            bookName = lineStrs[1]
            content = lineStrs[4]
          }

          newStrs += `### ${idx}. ${bookName}\n\n${content}\n\n`
        })

        atom.workspace.open().then((newEditor) => {
          newEditor.setText(newStrs)
        })
      }
    }
  }
}
