const news = (newsContent) => {
    return {
        "type": "bubble",
        "styles": {
          "header": {
            "backgroundColor": "#fa1616"
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
              "color": "#ff6b6b"
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