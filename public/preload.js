//fa da congiunzione tra backend e frontend
//da qui ho accesso ai moduli nodejs del backend (l'oggetto "window" è lo stesso che creo nel backend)
//e posso scrivere delle API accessibili dal frontend
//se usassi "contextIsolation: true" quando creo la "window" nel backend, l'oggetto "Window" sarebbe accessibile anche dal frontend. NON è SICURO. "contextIsolation: true" vuol dire che lo script "preload.js" è isolato dal dal renderer
//usando "contextBrige" collego preload.js con il renderer (front end) in modo sicuro
//l'oggetto "window" del front end non è lo stesso dell'oggetto "window" del backend

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('myAPI', {
    //backend to frontend
    funzFrontEnd: (callback) => ipcRenderer.on('nomeEvento', callback),//cosi da non esporre direttamente ipcRenderer. potrebbe essere pericoloso se usato dall'utente
    //frontend to backend
    sendVal: (val) => ipcRenderer.send('FrontToBack', val)
})