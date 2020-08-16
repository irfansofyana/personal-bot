const news = (newsContent) => {
    return {
        "type": "bubble",
        "styles": {
          "header": {
            "backgroundColor": "#006494"
          }
        },
        "header": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "Indonesia Headline News",
              "align": "center",
              "color": "#ffffff"
            },
            {
              "type": "separator"
            }
          ]
        },
        "body": {
          "type": "box",
          "layout": "vertical",
          "spacing": "md",
          "contents": newsContent
        }
    };
}

const commands = () => {
  const commandsVar = [
    'Here are some commands that you can use:',
    '- /commands: show all commands that you can use with me',
    '- /news: show 5 random hot news in Indonesia',
    '- /whoareyou: tell you who am I'
  ];

  return commandsVar.reduce((res, command) => {
    res = res.concat(command).concat('\n');

    return res;
  }, '');
}

const aboutMe = () => {
  return "Hi, I'm a personal assistant bot created by irfansofyana. For more information, you can use /commands";
}

const notUnderstand = () => {
  return "Sorry boss, I don't understand what you mean. You can check /commands to use me effectively";
}

module.exports = {
  news,
  commands,
  aboutMe,
  notUnderstand
};