
export const USER_PHOTO =
"https://img.freepik.com/free-photo/3d-rendering-zoom-call-avatar_23-2149556778.jpg?w=900&t=st=1704570445~exp=1704571045~hmac=122dd5aa735ca401dccc2acf9d71e59f973f742b93eaf2b696ef42231e9e2f30"
export const API_OPTIONS  = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + process.env.REACT_APP_TMDB_KEY, 
    }
  };

export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w780/"

export const BG_IMG = "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%201600%20900%22%20preserveAspectRatio%3D%22xMidYMid%20slice%22%3E%3Cdefs%3E%3CradialGradient%20id%3D%22a%22%20cx%3D%2220%25%22%20cy%3D%2215%25%22%20r%3D%2260%25%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%235b21b6%22%20stop-opacity%3D%22.55%22/%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%235b21b6%22%20stop-opacity%3D%220%22/%3E%3C/radialGradient%3E%3CradialGradient%20id%3D%22b%22%20cx%3D%2285%25%22%20cy%3D%2285%25%22%20r%3D%2255%25%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%230e7490%22%20stop-opacity%3D%22.5%22/%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%230e7490%22%20stop-opacity%3D%220%22/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect%20width%3D%221600%22%20height%3D%22900%22%20fill%3D%22%230b0b12%22/%3E%3Crect%20width%3D%221600%22%20height%3D%22900%22%20fill%3D%22url%28%23a%29%22/%3E%3Crect%20width%3D%221600%22%20height%3D%22900%22%20fill%3D%22url%28%23b%29%22/%3E%3C/svg%3E"

export const SUPPORTED_LANGUAGES = [
  {identifier: "en", name: "Engish"},
  {identifier: "hindi", name: "Hindi"},
  {identifier: "spanish", name: "Spanish"}
];

export const GEMINI_KEY = process.env.REACT_APP_GEMINI_KEY;