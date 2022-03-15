// Sending Notification to the Device using Firebase Admin
// const admin = require("firebase-admin");
const Notification = require("../models/notification");

module.exports.saveNotificationData = (req, res) => {
  const notification = new Notification(req.body);
  notification.save((err, noti) => {
    if (err) {
      return res.status(400).json({
        error: "Unable to send the Notification.",
      });
    }
    res.json(noti);
  });
};

module.exports.sendNotification = (req, res) => {
  // notification object with title and text
  var notification = {
    title: "Todays Deal",
    text: "Mobile Devices at 50% off. Only for today.",
  };
  let FCMData = [];
  Notification.find().exec((err, item) => {
    if (err) {
      return res.status(400).json({
        err: "Cannot Get the Notification.",
      });
    }

    item.map((i) => {
      FCMData.push(i.deviceId);
    });

    var notification_body = {
      notification: notification,
      registration_ids: FCMData,
    };
    fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      headers: {
        // replace authorization key with your key
        Authorization:
          "key=" +
          "AAAAbEaUnh8:APA91bEo1RPU6HB94TvAKGP-BQvK25hsLX4dLMjpGqgOvIAYVX6qfGA0muYdl_QqeJBzh-b0NNP9wXLnSGeVJKZdIk1-_5qirUHct9F69HsHcSumdq7wZOslHzSwQdKRKUM2yyzPzeiH",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(notification_body),
    })
      .then(function (response) {
        res.json(response);
      })
      .catch(function (error) {
        if (error) {
          return res.status(400).json({
            err: "Cannot Get the Notification.",
          });
        }
      });
  });
  // fcm device tokens array
  // var fcm_tokens = [
  //   "fmgfJpwpTjyC1FGpiLI1o5:APA91bG-vpHq-mb3lgjgj_jxkS7GiXbkTeEikK8rtx_4AVFRYA3k6343HkYP4Qtn8V1hPVUZI1NkQUsI4qZPtHlZ3gMyPS2ugG3NEsE1qSUwZa2wPeen9hXYzf5wFd-WR0ruwl1_6Tabb8WV",
  //   "fmgfJpwpTjyC1FGpiLI1o5:APA91bG-vpHq-mb3l_jxkS7GiXbkTeEikK8rtx_4AVFRYA3k6343HkYP4Qtn8V1hPVUZI1NkQUsI4qZPtHlZ3gMyPS2ugG3NEsE1qSUwZa2wPeen9hXYzf5wFd-WR0ruwl1_6Tabb8WV",
  // ];
};
