<script>
  import { routeToPage } from "$lib/routeToPage.js";
  let locales = 
</script>

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
  <br>
  <div class="row align-center">
      
    <table>
      <thead>
        <tr>
          <th>Browser code</th>
          <th>Browser</th>
          <th>Browser version</th>
          <th>Platform</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><div id="r1" /></td>
          <td><div id="r2" /></td>
          <td><div id="r3" /></td>
          <td><div id="r4" /></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<style>
  h2 {
    margin-bottom: 0px;
  }
  .container {
    height: 120vh;
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
</style>
