<script>
  import { routeToPage } from "$lib/routeToPage.js";
  import Modal,{getModal} from '../lib/Modal.svelte';
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

  let name = 'world';
	
	let selection
	
	// Callback function provided to the `open` function, it receives the value given to the `close` function call, or `undefined` if the Modal was closed with escape or clicking the X, etc.
	function setSelection(res){
		selection=res
	}
</script>

<!-- the modal without an `id` -->
<Modal>
	<h1>Registrar un nuevo local {name}!</h1>
	<!-- opening a model with an `id` and specifying a callback	 -->
	<button on:click={()=>getModal('second').open(setSelection)}>
		Open Nested Popup
	</button>
	{#if selection}
	<p>
		Your selection was: {selection}
	</p>
	{/if}
</Modal>

<Modal id="second">
	Inner window
	<!-- Passing a value back to the callback function	 -->
	<button class="green" on:click={()=>getModal('second').close(1)}>
		Select 1
	</button>
	<button class="green" on:click={()=>getModal('second').close(2)}>
		Select 2
	</button>
	
</Modal>
<div class="container">
  <div class="row">
    <div class="col-4 align-center">
      <img class="profile-pic" src="/img/profile-holder.png" alt="aaaaa" />
      <h2>Mi cuenta</h2>
    </div>
  </div>
  <br />
  <br />
  <div class="row align-center ">
    <div class="col-3">
      <p class="subtitle">Razón Social:</p>
    </div>
    <div class="col-7">
      <input class="long-input" type="text" placeholder="Juan" disabled />
    </div>
  </div>
  <br />
  <div class="row align-center ">
    <div class="col-3">
      <p class="subtitle">Nombre Fantasía:</p>
    </div>
    <div class="col-7">
      <input class="long-input" type="text" placeholder="Juan" disabled />
    </div>
  </div>
  <br />
  <div class="row align-center ">
    <div class="col-3">
      <p class="subtitle">Rut:</p>
    </div>
    <div class="col-7">
      <input
        class="long-input"
        type="text"
        placeholder="26.806112-4"
        disabled
      />
    </div>
  </div>
  <br />
  <div class="row align-center ">
    <div class="col-3">
      <p class="subtitle">Teléfonos:</p>
    </div>
    <div class="col-3">
      <input
        class="long-input"
        type="text"
        placeholder="+56 9 47823445"
        disabled
      />
    </div>
    <div class="col-3">
      <input
        class="long-input"
        type="text"
        placeholder="+56 9 47823445"
        disabled
      />
    </div>
  </div>
  <br />
  <div class="row align-center ">
    <div class="col-3">
      <p class="subtitle">Correos:</p>
    </div>
    <div class="col-3">
      <input
        class="long-input"
        type="text"
        placeholder="juan.john@gmail.com"
        disabled
      />
    </div>
    <div class="col-3">
      <input
        class="long-input"
        type="text"
        placeholder="juan.john@gmail.com"
        disabled
      />
    </div>
  </div>
  <br />
  <div class="row locales-tbl">
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
            <td>{local.sucursal}</td>
            <td>{local.dirección}</td>
            <td>{local.región}</td>
            <td>{local.ciudad}</td>
            <td>{local.resoluciones}</td>
            <td><a href="/local">{i}</a></td>
          </tr>
        {/each}
      </tbody>
    </table>
    <br />

    <div class="align-center botonera">
      <button class="red-button">
        <!-- No logro mostrar el floppy disk -->
        <i class="fas fa-save" /> Guardar
      </button>
      <button on:click={()=>getModal().open()} class="red-button"> Registrar nuevo local </button>
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
      <div class="col-3">
        <p class="label">Teléfonos:</p>
      </div>
      <div class="col-3">
        <input
          class="long-input"
          type="password"
          placeholder="+56 9 47823445"
        />
      </div>
      <div class="col-3">
        <p class="label">Teléfonos:</p>
      </div>
      <div class="col-3">
        <input class="password" type="text" placeholder="+56 9 47823445" />
      </div>
      <div class="row align-center ">
        <div class="col-1"></div>
        <div class="col-3">

          <button class="red-button">
            <!-- No logro mostrar el floppy disk -->
            <i class="fas fa-save" /> actualizar
          </button>
        </div>
      </div>
    </div>
  </div>

  

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
    margin: 0px;
    font-size: 1.4em;
    position: relative;
    top: 50%;
    left: 50%;
  }
  .long-input {
    width: 100%;
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
    width: 50%;

    margin: auto;
  }
  .red-button {
    width: 80%;
    height: 40px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    color: #ffffff;
    border: 3px solid #020202;
    background-color: #be0004;
    display: block;
    -webkit-box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
    box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
    /* border-radius: 12px; */
    margin-right: 20px;
    margin-left: 20px;
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
