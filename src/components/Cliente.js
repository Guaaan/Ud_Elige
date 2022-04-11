import React, { useState, useEffect } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useAuthContext } from "../providers/AuthProvider";
import SidePanel from './chat-page-comps/side-panel';
import { useApplicationContext } from "../providers/ApplicationProvider";

const Cliente = props => {
  let resultado = true;
  const [hubConnection, setHubConnection] = useState(null);

  useEffect(() => {

    const createHubConnection = async () => {
      const hubConnect = new HubConnectionBuilder()
        .withUrl("https://localhost:5001/PantallaPos", {
          accessTokenFactory: () => {
            return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkNBSkEtMDEiLCJpYXQiOjE1MTYyMzkwMjJ9.De6TyOWYgDz8bSRFjLeVBsNo-yYDoR3_yWtqa0-sd0I'
          }
        })
        .configureLogging(LogLevel.Information)
        .build();
      try {
        hubConnect.start().then(function () {
          console.log("connected to hub");
          hubConnect.invoke("MostrarTriadaResponseHandler", callid, resultado).catch(err => console.error(err));
        }).catch(function () {
          console.log("Error while connecting to hub");
        });

        hubConnect.on("MostrarTriadaCall", (callid, id, triadas) => {
          //no sé que va aqui 
          let resultado = true;
          try {
            hubConnect.invoke("MostrarTriadaResponseHandler", callid, resultado);
          } catch (err) {
            console.error(err);
          }
        });
      }
      catch (err) {
        alert(err);
        console.log('Error while establishing connection: ' + { err })
      }
      setHubConnection(hubConnect);
    }
    createHubConnection();
  })/*, acá faltaría algo después de la coma como un segund parametro */;
  const  invokeHubMessage= () => {
    hubConnection
      .invoke("TriadaSeleccionadaNotificacion", callid, articuloSeleccionado)
      .catch(err => console.error(err));
  }



}

export default Cliente;