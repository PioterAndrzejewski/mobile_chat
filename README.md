

  <div align="center">
    <h2>
      Mobile chat
    </h2>
    <br />
    <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/109315248/260535896-c66068d2-241c-42e1-875d-2ee1e331d5bd.png" alt="project image" />

  </div>
</div>

## Getting started

After cloning the repository and installing dependencies run the app using npm start command. 

  ```sh
  $ git clone https://github.com/PioterAndrzejewski/mobile_chat.git
  $ cd mobile_app
  $ npm i
  $ npm start
  ```

### Built With

- expo,
- typescript,
- react,
- react native,
- graphql,
- apollo/client,
- react-native-gifted-chat
- react-native-async-storage


## About The Project

This is a simple chat app that is using external chat API based on requirements provided by The Widlarz Group.

## UI

The appearance of the application was based on Firma mockup.

![image](https://github.com/PioterAndrzejewski/mobile_chat/assets/109315248/027628f2-c9aa-4866-8df2-96ba849126ed)


 ## Features
 
The mobile app consists of several screens:

 ### login screen
![image](https://github.com/PioterAndrzejewski/mobile_chat/assets/109315248/4d5caeb7-022e-4b4f-b758-e0c842aae482)

Login screen that allows to authenticate using email and password.
 
  ### register screen
 
![image](https://github.com/PioterAndrzejewski/mobile_chat/assets/109315248/c0150768-eb0d-472f-8dcd-6d17efd8756c)

Register screen with validation that allows to create new user account.

  ### Rooms screen

![image](https://github.com/PioterAndrzejewski/mobile_chat/assets/109315248/be44acc6-822f-4af2-8b47-f3b452e1409e)

With list of conversations that user takes part in. 
It displays the newest message and if user has read the message.

  ### Chat screen

![image](https://github.com/PioterAndrzejewski/mobile_chat/assets/109315248/8fc64ce1-5f1c-496d-88e8-1d76674ee8d9)


Chat screen created on base of Gifted Chat with custom-made components. 

 ## Project status
 
 The main core of the application is finished. Is has all the functions that were established at the beginning of the project. The architecture of the application allows to add more features without major interference with the current ones.

## Room for improvement

The main development opportunities are:

- tests
- communication with API via WS,
- another styleGuide implementation,
- logging out and clearing cache,
