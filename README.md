# Blue-Monday-Music
that is great

# APIs

 ## How to get access token
 - Sign in Spotify account on https://developer.spotify.com/dashboard/login and create an App.
 - Get your __Client ID__ and __Client Secret__.
 - Click __EDIT SETTINGS__ then enter any url in __Redirect URIs__ field.
 - You can find __Authorization Scope__ you need on https://developer.spotify.com/documentation/general/guides/scopes/ .
 - Enter this url https://accounts.spotify.com/authorize?client_id=[ClientID]&response_type=code&redirect_uri=[RedirectURIs]&scope=[AuthorizationScope] and the __code__ will be on the rear of url it response.
 - Enter the code below on terminal : 
 `curl -H "Authorization: Basic [Client ID : Client Secret]" -d grant_type=authorization_code -d code=[code] -d redirect_uri=[Redirect URIs]https://accounts.spotify.com/api/token`
 - The __access_token__ will be in the response.data object and it can make you get access to the API endpoint. 
 - You also can get __refresh_token__ from the same response.data, which can make you retrieve a new __access_token__ after the time expired.
 
  ## API used 
  - new releases : https://developer.spotify.com/documentation/web-api/reference/browse/get-list-new-releases/
  - album's tracks : https://developer.spotify.com/documentation/web-api/reference/albums/get-albums-tracks/



# App Display
![image](https://drive.google.com/uc?export=view&id=1Mt_uqoCqUOvwuDDmDLy29uDG23HXL6lm)

![image](https://drive.google.com/uc?export=view&id=17axi_UZH9MVcWCIKBrj3TOL_v7UWB9bI)

# Need To Be Done
 - favorite alumes 
 - music player
 - every week playlist
 

# Live Demo
[Live Demo](https://chia-hsing.github.io/Blue-Monday-Music/)
