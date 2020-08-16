const news = (newsContent) => {
    return {
        "type": "bubble",
        "styles": {
          "header": {
            "backgroundColor": "#fedc97"
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
              "color": "#000000"
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

module.exports = {
    news
};