# /backend/main.py

import uvicorn
    # ce que FastAPI utilise comme implémentation ASGI 
    # (Asynchronous Server Gateway Interface), 
    # ce qui signifie simplement qu'il nous configure 
    # pour être un serveur Web

# def point d'entrée pour exécuter l'application
if __name__=='__main__':
    # s'applique lorsqu'un module est appelé directement, 
    # c'est-à-dire si nous exécutons python app/main.py

    # execute un serveur Uvicorn sur le port 8000
    # le recharge à chaque modification de fichier
    uvicorn.run('app.api.api:app', host='0.0.0.0', port=5000, log_level="debug", reload=False)
        # gérera la réception des requêtes HTTP sur le port spécifié
        # & enverra le trafic à notre application FastAPI qui 
        # réside dans le fichier à l'emplacement relatif de app.api.api