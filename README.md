# Blue-Monday-Music

Fetch the newest released albums and singles from Spotify web API. All the UI and web structure is inspired by the fascinating music website [Noon Pacific](https://noonpacific.com/). 

There are still lots of parts that need to be improved, so I will keep updating this side project.

 - Use AJAX to fetch data from Spotify API endpoint.
 - RWD responsive web design.
 - Use Bootstrap as the UI design library.

# APIs

 ## How to get access token
 
 - Sign in your Spotify account on https://developer.spotify.com/dashboard/login and create an App.
 - Get the __Client ID__ and __Client Secret__.
 - Click __EDIT SETTINGS__ then enter any URL in the __Redirect URIs__ URIs field.
 - You can find __Authorization Scope__ you need on https://developer.spotify.com/documentation/general/guides/scopes/ .
 - Fill out the necessary parts of this URL in detail https://accounts.spotify.com/authorize?client_id=[ClientID]&response_type=code&redirect_uri=[RedirectURIs]&scope=[AuthorizationScope] and the __code__ will be on the rear of URL it responses.
 - Enter the snipet below on terminal : 
 `curl -H "Authorization: Basic [Client ID : Client Secret]" -d grant_type=authorization_code -d code=[code] -d redirect_uri=[Redirect URIs]https://accounts.spotify.com/api/token`
 - The __access_token__ will be in the __response.data__ object and it can make you get access to the Spotify API endpoint. 
 - You also can get __refresh_token__ from the same __response.data__, which can make you retrieve a new __access_token__ after the time expired.
 
  ## API used 
  
  - new releases : https://developer.spotify.com/documentation/web-api/reference/browse/get-list-new-releases/
  - album's tracks : https://developer.spotify.com/documentation/web-api/reference/albums/get-albums-tracks/



# App Display

![image](https://github.com/Chia-Hsing/Blue-Monday-Music/blob/master/1.png)

![image](https://github.com/Chia-Hsing/Blue-Monday-Music/blob/master/2.png)

# Need To Be Done

 - favorite alumes 
 - music player
 - every week playlist
 

# Live Demo

[Blue Monday Music](https://chia-hsing.github.io/Blue-Monday-Music/)
