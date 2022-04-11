const connection = new signalR.HubConnectionBuilder()
    .withUrl("/PantallaPos", {
		accessTokenFactory: () => {
                                  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkNBSkEtMDEiLCJpYXQiOjE1MTYyMzkwMjJ9.De6TyOWYgDz8bSRFjLeVBsNo-yYDoR3_yWtqa0-sd0I'
                              }
	})
    .configureLogging(signalR.LogLevel.Information)
	.withAutomaticReconnect()
    .build();

async function start() {
    try {
        await connection.start();
        console.log("SignalR Connected.");
    } catch (err) {
        console.log(err);
        setTimeout(start, 5000);
    }
};

connection.on("MostrarTriadaCall", (callid, id, triadas) => {
   //mostrar triadas 
   
   let resultado = true;
   try {
    await connection.invoke("MostrarTriadaResponseHandler", callid, resultado);
	} catch (err) {
		console.error(err);
	}
});

//en algun momento: cuando el cliente selecciona la triada
let articuloSeleccionado = '<articulo seleccionado por cliente>'
let id = '<el id recibido en MostrarTriadacall>';
try {
	await connection.invoke("TriadaSeleccionadaNotificacion", callid, articuloSeleccionado);
} catch (err) {
	console.error(err);
}

//esto para mantener la conexion viva
connection.onclose(async () => {
    await start();
});

// Start the connection.
start();


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import NavBar from './components/NavBar';
//import Products from './components/Products';
import Conne from './components/Conne';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';


const Cliente = () => {
  const [connection, setConnection] = useState();
  const mostrarTriadaResponseHandler = async (callid, id, triadas) => {
    async function start() {
      try {
          await connection.start();
          console.log("SignalR Connected.");
      } catch (err) {
          console.log(err);
          setTimeout(start, 5000);
      }
  };


    let resultado = true;
    try {
      //set the connection 
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:5001/PantallaPos", {
          accessTokenFactory: () => {
            return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkNBSkEtMDEiLCJpYXQiOjE1MTYyMzkwMjJ9.De6TyOWYgDz8bSRFjLeVBsNo-yYDoR3_yWtqa0-sd0I'
          }
        })
        .configureLogging(LogLevel.Information)
        .build();
      //set the handlers 
      connection.on("MostrarTriadaCall", (callid, id, triadas) => {
        let resultado = true;
        
        try {
          await connection.invoke("MostrarTriadaResponseHandler", callid, resultado);
        } catch (err) {
          console.error(err);
        }
        console.log('triada: ' + triadas);
      });

      await connection.start();
      
      setConnection(connection);
    } catch (e) {
      console.log(e);
    }
    start();
    return (
      <>
      </>
    );
  }
}

export default Cliente;