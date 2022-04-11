//import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import {Form, Button} from 'react-bootstrap';
import React, { useState } from "react";

export const Conne = ({MostrarTriadaResponseHandler}) => {
  // Set the initial input values
  const [triadas, setTriadas] = useState();
  const [id, setId] = useState();
  const [callid, setCallid] = useState();
  return (
    <>
    {/*submit the input values */}
      <Form className="Triada"
      onSubmit={e => {
        e.preventDefault();
        MostrarTriadaResponseHandler(triadas, id, callid);
      }}>
        <Form.Control type="text" placeholder="Triada" onChange={e => setTriadas(e.target.value)}/>
        <Form.Control type="text" placeholder="Id" onChange={e => setId(e.target.value)}/>
        <Form.Control type="text" placeholder="Callid" onChange={e => setCallid(e.target.value)}/>
      </Form>
      <Button variants='success' type="submit" disabled={!triadas}>Click to submit</Button>
    </>
  );
};


export default Conne;