import * as signalR from '@microsoft/signalr';

const log = console.log;
const error = console.error;

class PantallaPos {
    constructor(url) {
        this.url = url;
        this.mostrarTriadaCallback = null;

        let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiQ0FKQS0wMSIsImV4cCI6MTY1MDIyNzczNH0.9f6cOWtEFsp3yM34PryGoqCi2i5hqcT_TlkpQNRhGHU';
        this.hubConnect = new signalR.HubConnectionBuilder()
            .withUrl(url + '?access_token='+token, {
              
            })           
            .configureLogging(signalR.LogLevel.Information)
            .withAutomaticReconnect()
            .build();

        this.hubConnect.on("MostrarTriadaCall", (callid, id, triadas) => {
            //no s� que va aqui 
            let resultado = false;
            try
            {
                if (this.mostrarTriadaCallback != null)
                {
                    resultado = this.mostrarTriadaCallback(id, triadas);
                }           
                this.hubConnect.invoke("MostrarTriadaResponseHandler", callid, resultado);
            }
            catch (err)
            {
                error(err);
            }
        });
    }
    OnMostrarTriada(callback)
    {
        this.mostrarTriadaCallback = callback
    }
    NotificarTriada(id, codigoArticulo) {
        //invocar la funcion
        this.hubConnect.invoke("TriadaSeleccionadaNotificacion", id, codigoArticulo)
                   .catch(err => error(err));
    }
    async Start() {
        try {
            await this.hubConnect.start();
            log("SignalR Connected.");
        } catch (err) {
            error(err);
            setTimeout(this.Start, 5000);
        }
    }
}

export default PantallaPos;