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
    '- /whoareyou: tell you who am I',
    '- /fact today: tell you about fact there is happen in the world',
    '- /fact random: tell you one random fact there is happen in the world',
    '- /calc <expression>: compute given mathematics expression'
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

const calc = (question, answer) => {
  return {
    "type": "bubble",
    "header": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "Calculator",
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
      "contents": [
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "text",
              "text": "Question",
              "align": "center",
              "wrap": true
            },
            {
              "type": "separator"
            },
            {
              "type": "text",
              "text": "Answer",
              "align": "center",
              "wrap": true
            }
          ]
        },
        {
          "type": "separator"
        },
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "text",
              "text": `${question}`,
              "wrap": true
            },
            {
              "type": "separator"
            },
            {
              "type": "text",
              "text": `${answer}`,
              "wrap": true
            }
          ]
        }
      ]
    },
    "styles": {
      "header": {
        "backgroundColor": "#006494"
      }
    }
  };
}

module.exports = {
  news,
  commands,
  aboutMe,
  notUnderstand,
  calc
};