const { register, listen } = require('push-receiver');
const senderId = "632057595650"; // This is the `project_number` from the google-services.json (It is possible to extract it from apk!)

if (!senderId) {
  console.error('Missing senderId');
  return;
}

(async () => {
  
  // Register to FCM and get Token
  const credentials = await register(senderId); // You should call register only once and then store the credentials somewhere
  const fcmToken = credentials.fcm.token; // <-- Token to use to send notifications
  console.log('Your Token: ', fcmToken);
  
  // persistentIds is the list of notification ids received to avoid receiving all already received notifications on start.
  const persistentIds = []; // get all previous persistentIds from somewhere (file, db, etc...)
  await listen({ ...credentials, persistentIds }, onNotification);
  
})();

// called on new notification
function onNotification({ notification }) {
  // Do someting with the notification
  console.log('Notification received!!');
  console.log(notification);
}
