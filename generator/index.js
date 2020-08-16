const newsMessage = (res) => {
    let newsContent = [];
    res.forEach((news, i) => {
      let content = {
        "type": "box",
        "layout": "horizontal",
        "contents": [
          {
            "type": "text",
            "text": news.title,
            "wrap": true
          },
          {
            "type": "separator"
          },
          {
            "type": "button",
            "style": "link",
            "action": {
              "type": "uri",
              "label": "Visit Link",
              "uri": news.url
            }
          }
        ]
      };
      newsContent.push(content);
      if (i != res.length - 1) {
        newsContent.push({
          "type": "separator"
        });
      }
    });

    return newsContent;
};


module.exports = {
    newsMessage
};