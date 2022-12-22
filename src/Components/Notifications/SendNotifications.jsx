const SendNotifications = (uid,title,body) => {
    var myHeaders = new Headers();
    // myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", "*"); 
    myHeaders.append("Authorization", "Bearer 66471889D82B7C1A418309AD9ABD6D46F6B55E83C45A368AFC90387526B1E0C9");


    var raw = JSON.stringify({
      "interests": [
        "148"
      ],
      "fcm": {
        "notification": {
          "title": "aur g Ha ",
          "body": "Hello, world!"
        }
      }
    });
    
    var requestOptions = {
        method: 'POST',
        // mode: 'no-cors',
        headers:myHeaders,
        body: raw,
    };
    
    fetch("https://37db41c0-37ec-4d3c-b420-ae32252f910f.pushnotifications.pusher.com/publish_api/v1/instances/37db41c0-37ec-4d3c-b420-ae32252f910f/publishes" ,requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
}

export default SendNotifications