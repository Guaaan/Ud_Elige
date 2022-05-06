<script>
  import "../app.scss";
  import 'sweetalert2/src/sweetalert2.scss'
  import { onMount } from "svelte";  
  import { user } from "$lib/store.js";
  import { routeToPage } from "$lib/routeToPage.js";
  import PageHeader from "$lib/PageHeader.svelte";
  import { page } from '$app/stores'; // para obtener el nombre de la vista
  import BarraStickyBottom from "$lib/BarraStickyBottom.svelte";

  // Redireccion
  onMount(() => {
    if ($user == null) routeToPage("login", true);
  });


</script>

<svelte:head>
  <link href="/css/all.min.css" rel="stylesheet" />
  <link href="/css/fontawesome.css" rel="stylesheet" />
  <link href="/css/default.css" rel="stylesheet" />

  <link href="/css/nice-select.css" rel="stylesheet" />
  <link href="/css/jquery.nice-number.css" rel="stylesheet" />

  <link
    href="https://cdn.jsdelivr.net/npm/simple-datatables@latest/dist/style.css"
    rel="stylesheet"
    type="text/css"
  />

  <link href="/css/style.css" rel="stylesheet" />
  <link href="/css/responsive.css" rel="stylesheet" />
</svelte:head>

<div class="overlay" />

<PageHeader></PageHeader>

<slot />

{#if $page.routeId != "cart"}
  <BarraStickyBottom></BarraStickyBottom>
{/if}
<!-- footer-area-start -->
<div class="footer-area">
  <div id="footer-escritorio" class="d-xxl-block d-xl-block d-lg-block d-md-none d-sm-none d-xs-none">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="footer-fl">
            <div class="footer-logo">
              <a href="index.html"><img src="/img/site-logo.png" alt="" /></a>
            </div>
            <div class="single-footer">
              <h3>Menu</h3>
              <ul>
                <li>
                  <a href="/#" onClick={(e) => e.preventDefault()} >QUIENES SOMOS</a>
                </li>
                <li>
                  <a href="/#" onClick={(e) => e.preventDefault()} >MISIÓN Y VISIÓN</a>
                </li>
                <li>
                  <a href="/#" onClick={(e) => e.preventDefault()} >CONTACTO</a>
                </li>
                <li>
                  <a href="/#" onClick={(e) => e.preventDefault()} >TÉRMINO Y CONDICIONES</a>
                </li>
                <li>
                  <a href="/#" onClick={(e) => e.preventDefault()} >RECLAMOS</a>
                </li>
              </ul>
            </div>
            <div class="single-footer">
              <h3>Informacion</h3>
              <ul>
                <li>
                  <a href="/#" onClick={(e) => e.preventDefault()} >REGLAMENTO DE FARMACIAS</a>
                </li>
                <li>
                  <a href="/#" onClick={(e) => e.preventDefault()} >REGLAMENTO PRODUCTOS FARMACÉUTICOS</a>
                </li>
                <li>
                  <a href="/#" onClick={(e) => e.preventDefault()} >SUGERENCIAS Y RECLAMOS</a>
                </li>
                <li>
                  <a href="/#" onClick={(e) => e.preventDefault()} >TÉRMINO Y CONDICIONES</a>
                </li>
                <li>
                  <a href="/#" onClick={(e) => e.preventDefault()} >LIBRO DE RECLAMOS</a>
                </li>
              </ul>
            </div>
            <div class="footer-socail">
              <a href="/#" onClick={(e) => e.preventDefault()} ><i class="fab fa-facebook" /></a>
              <a href="/#" onClick={(e) => e.preventDefault()} ><i class="fab fa-twitter" /></a>
              <a href="/#" onClick={(e) => e.preventDefault()} ><i class="fab fa-instagram" /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="footer-mobile" class="d-xxl-none d-xl-none d-lg-none d-md-block d-sm-block d-xs-block">
      <div class="container">
        <div class="row">          
          <div class="col-3">
            <a href="/#" onClick={(e) => e.preventDefault()}>
              <img src="/img/a1.png" alt="">
              <p class="text-white">QUIENES SOMOS</p>
            </a>
          </div>
          <div class="col-3">
            <a href="/#" onClick={(e) => e.preventDefault()}>
              <img src="/img/a2.png" alt="">
              <p class="text-white">MISIÓN Y VISIÓN</p>
            </a>
          </div>
          <div class="col-3">
            <a href="/#" onClick={(e) => e.preventDefault()}>
              <img src="/img/a3.png" alt="">
              <p class="text-white">CONTACTO</p>
            </a>
          </div>
          <div class="col-3">
            <a href="/#" onClick={(e) => e.preventDefault()}>
              <img src="/img/a4.png" alt="">
              <p class="text-white">RECLAMOS</p>
            </a>
          </div>
        </div>
      </div>
  </div>
</div>

<!-- footer-area-end -->
<style>
  .header-menu li a,
  .header-user a {
    text-decoration: none;
  }
  .footer-area a {
    text-decoration: none;
  }
  .header-area {
    height: 110px;
    background: #ef0840;
    display: flex;
    align-items: center;
    transition: 0.3s;
  }
  .header-area.active {
    margin-top: -110px;
  }
  .footer-area{
    padding: 44px 10px 44px 0;
    /* margin-top: 100px; */
  }
  .footer-logo{
    margin-top: -20px;
  }
  #footer-mobile .row{
    text-align:center;
  }

@media only screen and (min-width: 320px) and (max-width: 767px) {
  #footer-escritorio{
    display: none;
  }
  #footer-mobile{
    display: block;
  }
  .footer-area{
    padding: 25px 10px 0 0;
    /* margin-top: 100px; */
  }
}
</style>
