

  <div align="center">
    <h2>
      Mobile chat
    </h2>
    <br />
    <img src="https://github.com/PioterAndrzejewski/mobile_chat/assets/109315248/5735c18c-c328-49d4-bece-e3be3ada3340" alt="project image" />

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

![image](https://github.com/PioterAndrzejewski/mobile_chat/assets/109315248/0b3e494a-4815-4389-9dad-184ee9dfa89e)


 ## Features
 
The mobile app consists of several screens:

 ### login screen
![image](https://github.com/PioterAndrzejewski/mobile_chat/assets/109315248/1afdb452-879e-4c5d-bfde-b43d96e7e6b3)


Login screen that allows to authenticate using email and password.
 
  ### register screen
 
![image](https://github.com/PioterAndrzejewski/mobile_chat/assets/109315248/398058f4-adde-4896-8fb9-eb712659e11e)


Register screen with validation that allows to create new user account.

  ### Rooms screen

![image](https://github.com/PioterAndrzejewski/mobile_chat/assets/109315248/654660b8-f7fc-4e52-9add-87eff4c412fd)


With list of conversations that user takes part in. 
It displays the newest message and if user has read the message.

  ### Chat screen

![image](https://github.com/PioterAndrzejewski/mobile_chat/assets/109315248/6d493084-2982-4f50-a385-bc97c2a86a7c)


Chat screen created on base of Gifted Chat with custom-made components. 

 ## Project status
 
 The main core of the application is finished. Is has all the functions that were established at the beginning of the project. The architecture of the application allows to add more features without major interference with the current ones.

## Room for improvement

The main development opportunities are:

- tests
- communication with API via WS,
- another styleGuide implementation,
- logging out and clearing cache,
