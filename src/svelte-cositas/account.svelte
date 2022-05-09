<script>
  import { routeToPage } from "$lib/routeToPage.js";
  import Modal, { getModal } from "../lib/Modal.svelte";
  import Index from "./index.svelte";

  let locales = [
    {
      sucursal: 1,
      dirección: "calle 241",
      región: "13",
      ciudad: "santiago",
      resoluciones: "N° 741",
    },
    {
      sucursal: 1,
      dirección: "calle 241",
      región: "13",
      ciudad: "santiago",
      resoluciones: "N° 741",
    },
    {
      sucursal: 1,
      dirección: "calle 241",
      región: "13",
      ciudad: "santiago",
      resoluciones: "N° 741",
    },
    {
      sucursal: 1,
      dirección: "calle 241",
      región: "13",
      ciudad: "santiago",
      resoluciones: "N° 741",
    },
  ];

  let requestOptions = {
  method: 'GET',
};
let perfil = async () =>{

  let response = await fetch("https://api.cdr.cl/b2b/dev/Cliente/2950969/Cuenta", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  console.log(response);
}
perfil();
  let selection;
  // Callback function provided to the `open` function, it receives the value given to the `close` function call, or `undefined` if the Modal was closed with escape or clicking the X, etc.
  function setSelection(res) {
    selection = res;
  }
</script>

<!-- the modal without an `id` -->
<Modal>
  <h1>Registro Nuevo Local</h1>

  <div class="container">
    <form action="/action_page.php">
      <label for="regiones">Región:</label>
      <select name="regiones" id="cars">
        <option value="volvo">Metropolitana</option>
        <option value="saab">Valparaiso</option>
        <option value="opel">Concepción</option>
        <option value="audi">otra región</option>
      </select>
      <br /><br />
      <label for="ciudades">Ciudad:</label>
      <select name="ciudades" id="cars">
        <option value="volvo">santiago </option>
        <option value="saab">Valparaiso</option>
        <option value="opel">Concepción</option>
        <option value="audi">otra Ciudad</option>
      </select>
      <br /><br />
      <label for="direccion">Dirección:</label>
      <input type="text" name="direccion" />
      <br /><br />
      <label for="res-sanitaria">Res. Sanitaria:</label>
      <input type="text" name="res-sanitaria" />
      <!-- anchor to open a file -->
      <a href="/account"><i class="fas fa-upload" /></a>
    </form>
  </div>
  <br /><br />
  <!-- opening a model with an `id` and specifying a callback	 -->
  <button
    class="red-button"
    on:click={() => getModal("second").open(setSelection)}
  >
    Guardar
  </button>
  {#if selection}
    <p>
      Your selection was: {selection}
    </p>
  {/if}
</Modal>

<Modal id="second">
  <!-- Inner window -->
  <!-- Passing a value back to the callback function	 -->
  <button class="green" on:click={() => getModal("second").close(1)}>
    Select 1
  </button>
  <button class="green" on:click={() => getModal("second").close(2)}>
    Select 2
  </button>
</Modal>
<div class="container">
  <div class="row">
    <div class="col-md-4 col-xs-5 align-center">
      <img class="profile-pic" src="/img/profile-holder.png" alt="aaaaa" />
      <h2>Mi cuenta</h2>
    </div>
  </div>
  <br />
  <br />
  <form action="cuenta">
    <div class="row align-center ">
      <div class="col-md-3 col-xs-4">
        <label class="subtitle" for="razon-social">Razón Social:</label>
      </div>
      <div class="col-7">
        <input
          class="long-input"
          name="razon-social"
          type="text"
          placeholder="Juan"
          disabled
        />
      </div>
    </div>
    <br />
    <div class="row align-center ">
      <div class="col-3">
        <label class="subtitle" for="nombre-fantasia">Nombre Fantasía:</label>
      </div>
      <div class="col-7">
        <input
          name="nombre-fantasia"
          class="long-input"
          type="text"
          placeholder="Juan"
          disabled
        />
      </div>
    </div>
    <br />
    <div class="row align-center ">
      <div class="col-3">
        <label class="subtitle" for="rut">Rut:</label>
      </div>
      <div class="col-7">
        <input
          class="long-input"
          type="text"
          placeholder="26.806112-4"
          name="rut"
          disabled
        />
      </div>
    </div>
    <br />
    <div class="row align-center ">
      <div class="col-3">
        <label class="subtitle" for="telefonos">Teléfonos:</label>
      </div>
      <div class="col-3">
        <input
          class="long-input"
          type="text"
          placeholder="+56 9 47823445"
          name="telefonos"
          disabled
        />
      </div>
      <div class="col-3">
        <input
          class="long-input"
          type="text"
          placeholder="+56 9 47823445"
          name="telefonos"
          disabled
        />
      </div>
    </div>
    <br />
    <div class="row align-center ">
      <div class="col-md-3 col-xs-12">
        <label class="subtitle" for="correos">Correos:</label>
      </div>
      <div class="col-md-3 col-xs-12">
        <input
          class="long-input"
          type="text"
          placeholder="juan.john@gmail.com"
          name="correos"
          disabled
        />
      </div>
      <div class="col-md-3 col-xs-12">
        <input
          class="long-input"
          type="text"
          placeholder="juan.john@gmail.com"
          name="correos"
          disabled
        />
      </div>
    </div>
  </form>
  <br />
  <div class="row locales-tbl">
    <div class="col-md-6 col-xs-12">
      <h2>Locales</h2>
      <table>
        <thead>
          <tr>
            <th>Sucursal</th>
            <th>Dirección</th>
            <th>Región</th>
            <th>Ciudad</th>
            <th>Resoluciones</th>
            <th>Ver</th>
          </tr>
        </thead>
        <tbody>
          {#each locales as local, i}
            <tr>
              <td>{i}</td>
              <td>{local.dirección}</td>
              <td>{local.región}</td>
              <td>{local.ciudad}</td>
              <td>{local.resoluciones}</td>
              <td><a href="/local">ver</a></td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    <br />

    <div class="align-center botonera">
      <button class="red-button">
        <i class="fas fa-save" /> Guardar
      </button>&nbsp;&nbsp;
      <button on:click={() => getModal().open()} class="red-button">
        Registrar nuevo local
      </button>
    </div>
  </div>
  <br />
  <div class="row">
    <div class="col-4 align-center">
      <!-- <img class="profile-pic" src="/img/profile-holder.png" alt="aaaaa" /> -->
      <i class="fas fa-lock big-icon" />
      <h2>Contraseña</h2>
    </div>
  </div>
  <div class="password-container">
    <div class="row align-center ">
      <form action="change-password">
        <div class="row">
          <div class="col-1" />
          <div class="col-5">
            <label for="nueva">Nueva Contraseña:</label>
            <input type="text" name="nueva" />
          </div>
          <div class="col-6">
            <label for="confirma">Confirma Contraseña:</label>
            <input type="text" name="confirma" />
          </div>
        </div>
        <div class="row align-center ">
          <div class="col-1" />
          <div class="col-3">
            <button class="red-button">
              <i class="fas fa-save" /> actualizar
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>

  <br />
</div>

<style>
  table,
  td,
  th {
    border: 1px solid #ddd;
    text-align: left;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    overflow-x:auto;
  }

  th,
  td {
    padding: 5px;
  }
  h2 {
    margin-bottom: 0px;
  }
  .container {
    height: 120%;
    padding-top: 25px;
  }
  .subtitle {
    margin: auto;
    font-size: 1.4em;
    position: relative;
    /* top: 50%;
    left: 50%; */
    text-align: center;
  }
  .long-input {
    width: 100%;
    margin: 10px;
  }
  .profile-pic {
    width: 3.5em;
    height: 3.5em;
    border-radius: 50%;
    float: left;
    margin-right: 10px;
  }
  .align-center {
    display: flex;
    align-items: center;
  }
  .locales-tbl {
    /* width: 50%; */

    margin: auto;
  }
  .red-button {
    /* width: 80%; */
    height: 40px;
    cursor: pointer;
    font-size: 16px;
    font-family: "Lato", sans-serif;
    font-weight: 600;
    color: #202020;
    display: block;
    -webkit-box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
    box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
    border-radius: 12px;
  }

  .botonera {
    padding: 10px;
  }
  .big-icon {
    font-size: 2em;
    margin-right: 10px;
    margin-left: 20px;
    color: #be0004;
  }
  .label {
    font-size: 1.2em;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .password-container {
    width: 80%;
    height: 100%;
    border: #444444 solid 1px;
    border-radius: 10px;
    margin: auto;
    margin-bottom: 20px;
    margin-top: 10px;
    padding: 20px;
  }
</style>
