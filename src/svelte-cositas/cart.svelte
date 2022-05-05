<script>
    import { carroResumen , carro , user , endpoint } from "$lib/store.js";
    import BotonEliminar from "$lib/BotonEliminar.svelte";
    import ModalPedido from "$lib/ModalPedido.svelte";
    import { goto } from "$app/navigation";
    import Select from "$lib/Select.svelte";
    import { onMount } from "svelte";  
    import Swal from 'sweetalert2';

    // Redireccion
    function routeToPage(route = "", replaceState = false) {
        goto(`/${route}`, { replaceState });
    }
    function onClickModal(evt) {
        evt.preventDefault();
        openModal = true;
    }
    async function onClickPedido(evt) {
        evt.preventDefault();
        // Creamos el pedido
        let pedido = await fetch( endpoint+"/CarroCompras/"+$user.rutCliente+"/Pedido",
        {
			method: 'POST',
            body: JSON.stringify({
                direccion: idDireccion
            }),
            headers: {
                Authorization: `Bearer ${$user.token}`,
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => response.json());
        console.log(pedido);
        let sic = await fetch( endpoint+"/Pedido/"+pedido+"/SIC",
        {
			method: 'POST',
            headers: {
                Authorization: `Bearer ${$user.token}`
            }
        })
        .then(response => response.json());        

        console.log(sic);
        // popup?
        Swal.fire({
                title: 'Pedido Confirmado',
                text: 'Su pedido fue realizado con éxito, se le contactará a la brevedad',
                icon: 'success',
                allowOutsideClick: false,
                allowEscapeKey: false,
                timer: 5000
            });
        routeToPage();
    }
    // TODO: SP para traer las direcciones
    let direcciones = [];
    let idDireccion;
    // Direcciones
    onMount(async () => {
        let response1 = await fetch(
            endpoint + "/Cliente/" + $user.rutCliente + "/Direccion",
            {
			method: "GET",
            headers: {
                Authorization: `Bearer ${$user.token}`
            }
        })
        .then((response) => response.json());
        // Asignacion valida?
        direcciones = response1;
    });
    let continuar = false;
    function onChangeDireccion(evt) {
        evt.preventDefault();
        continuar = false;
        if(idDireccion !== undefined)
        {
            if(idDireccion.length > 0 || idDireccion > 0)
            {
                continuar = true;
            }
        }
        /*
        dispatch("change", {
            selectedOrden: orden,
            selectedCantidad: cantidad,
            currentPage: pagina
        });
        */
    }
    const imgPlaceholder = "./img/placeholder.jpg";

    let totalProductos = 0;
    let total = 0;
    let totalSKU = 0;
    let openModal = false;
    let update = false;
    $: {
        totalSKU = $carroResumen.Sku;
        totalProductos = $carroResumen.Productos;
        total = $carroResumen.Total;
    }
</script>

<div class="container-lg">
    
    <div class="row py-4">
        <!-- ESCRITORIO -->
        <div class="desktop">
            <div class="card-group">
                <div class="card cw-70">
                    <h3 class="card-header text-white bg-cdr">Detalle de Carro</h3>
                    <div class="card-body">
                        
                        <h4>Seleccione la dirección de Despacho:</h4>
                        <Select
                            empty="Seleccione un valor"
                            options={direcciones}
                            value_func={(o) => o.id}
                            text_func={(o) => o.nombre}
                            on:change={onChangeDireccion}
                            bind:value={idDireccion}
                            error={!continuar}
                            errorMsg="Seleccione un valor"
                        />
                        <div class="clearfix"></div>
                        <hr />
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Imagen</th>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th>Precio Unidad</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {#if $carro == null}
                                cargando...
                                {:else}
                                    
                                    {#each $carro as producto, i}
                                        <tr>
                                            {#await producto}
                                                <td>..cargando</td>
                                                <td />
                                                <td />
                                                <td />
                                                <td />
                                            {:then producto}
                                                <td class="prod-img">
                                                    {#if producto.tieneFoto }                    
                                                        <img src="{endpoint}/Articulos/{producto.articuloCodigo}/imagen" alt="" />
                                                    {:else}                
                                                        <img src="{imgPlaceholder}" alt="" />
                                                    {/if}
                                                </td>
                                                <td class="prod-name">
                                                    <h3>{producto.articuloNombre}</h3>
                                                    <p>{producto.familia}</p>
                                                </td>
                                                <td>
                                                    <span
                                                        >{producto.articuloCantidad}</span
                                                    >
                                                </td>
                                                <td class="prod-price">
                                                    <span>${producto.precioNormal.toLocaleString("es-CL")}</span>
                                                </td>
                                                <td class="prod-action">
                                                    <BotonEliminar
                                                        bind:clicked={update}
                                                        linea={producto}
                                                    />
                                                </td>
                                            {/await}
                                        </tr>
                                    {/each}
                                
                                {/if}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="card cw-30">
                    <h3 class="card-header text-white bg-cdr">Total</h3>
                    <div class="card-body">
                        <div class="headers">
                            <span>Total SKU:</span>
                            <span>{totalSKU}</span>
                            <br>
                            <!-- <span>Total Productos:</span>
                            <span>{totalProductos}</span>
                            <br> -->
                            <span>Total Compra:</span>
                            <span class="tot-price">${total.toLocaleString("es-CL")}</span>
                        </div>
                        <div class="buttons btnGroup">
                            <button
                                on:click|preventDefault={() => routeToPage()}
                                class="button">Seguir Comprando</button
                            >
                            <!-- svelte-ignore a11y-invalid-attribute -->
                            <button
                                disabled={!continuar}
                                type="button"
                                class="button"
                                on:click={onClickModal}>Confirmar Pedido</button
                            >
                        </div>
                    </div>
                </div>
            </div>            
        </div>
        <ModalPedido bind:visible={openModal}>
            <div class="row">
                <div class="col-6">
                    <span>Total Pedido:</span>
                </div>
                <div class="col-6">
                    <span>${total.toLocaleString("es-CL")}</span>
                </div>
            </div>
            <hr/>
            <div class="row mx-0">
                <a href="/#" class="btn btn-danger float-end" on:click|preventDefault={onClickPedido}>Confirmacion</a>
            </div>
        </ModalPedido>
        <!-- MOBILE -->
        <div class="mobile">
            <div class="card">
                <h3 class="card-header text-white bg-cdr">Detalle de Carro</h3>

                <ul class="list-group list-group-flush">
                    <li class="list-group-item">

                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th>Precio Unidad</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {#if $carro == null}
                                cargando...
                                {:else}
                                    
                                    {#each $carro as producto, i}
                                        <tr>
                                            {#await producto}
                                                <td>..cargando</td>
                                                <td />
                                                <td />
                                                <td />
                                                <td />
                                            {:then producto}                                            
                                                <td class="prod-name">
                                                    <h3>{producto.articuloNombre}</h3>
                                                    <p>{producto.familia}</p>
                                                </td>
                                                <td class="prod-cant">
                                                    <span
                                                        >{producto.articuloCantidad}</span
                                                    >
                                                </td>
                                                <td class="prod-price">
                                                    <span>${producto.precioNormal.toLocaleString("es-CL")}</span>
                                                </td>
                                                <td class="prod-action">
                                                    <BotonEliminar
                                                        bind:clicked={update}
                                                        linea={producto}
                                                    />
                                                </td>
                                            {/await}
                                        </tr>
                                    {/each}
                                
                                {/if}
                            </tbody>
                        </table>
                        
                    </li>
                    <li class="list-group-item">
                        <div class="row">
                            <div class="col-lg-2 col-md-2 col-sm-3 col-4 my-auto">
                                <span> Despacho a:</span>
                            </div>                        
                            <div class="col-lg-10 col-md-10 col-sm-9 col-8">
                                <Select
                                    empty="Seleccione un valor"
                                    options={direcciones}
                                    value_func={(o) => o.id}
                                    text_func={(o) => o.nombre}
                                    on:change={onChangeDireccion}
                                    bind:value={idDireccion}
                                    error={!continuar}
                                    errorMsg="Seleccione un valor"
                                />
                            </div>
                        </div>                           
                    </li>
                    <li class="list-group-item">
                        <div class="row">
                            <div class="col-6">
                                <span>Total SKU:</span>
                                <span>{totalSKU}</span>
                            </div>                        
                            <div class="col-6">
                                <span>Total Compra:</span>
                                <span class="tot-price">${total.toLocaleString("es-CL")}</span>                            
                            </div>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div class="row">
                            <div class="col-6">
                                <button
                                    on:click|preventDefault={() => routeToPage()}
                                    class="button">Seguir Comprando</button
                                >
                            </div>
                            <div class="col-6">
                                <button
                                    disabled={!continuar}
                                    type="button"
                                    class="button"
                                    on:click={onClickModal}>Confirmar Pedido</button
                                >
                            </div>
                        </div>
                    </li>
                </ul>
                <!--
                <div class="card-body">                 
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Precio Unidad</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {#if $carro == null}
                            cargando...
                            {:else}
                                
                                {#each $carro as producto, i}
                                    <tr>
                                        {#await producto}
                                            <td>..cargando</td>
                                            <td />
                                            <td />
                                            <td />
                                            <td />
                                        {:then producto}                                            
                                            <td class="prod-name">
                                                <h3>{producto.articuloNombre}</h3>
                                                <p>{producto.familia}</p>
                                            </td>
                                            <td>
                                                <span
                                                    >{producto.articuloCantidad}</span
                                                >
                                            </td>
                                            <td class="prod-price">
                                                <span>${producto.precioNormal.toLocaleString("es-CL")}</span>
                                            </td>
                                            <td class="prod-action">
                                                <BotonEliminar
                                                    bind:clicked={update}
                                                    linea={producto}
                                                />
                                            </td>
                                        {/await}
                                    </tr>
                                {/each}
                            
                            {/if}
                        </tbody>
                    </table>
                    <span style="float:left; "> Despacho a:</span>
                        <Select
                            empty="Seleccione un valor"
                            options={direcciones}
                            value_func={(o) => o.id}
                            text_func={(o) => o.nombre}
                            on:change={onChangeDireccion}
                            bind:value={idDireccion}
                            error={!continuar}
                            errorMsg="Seleccione un valor"
                        />
                        <div class="clearfix"></div>
                        <hr />
                    <div class="headers">
                        <span>Total SKU:</span>
                        <span>{totalSKU}</span>
                        <br>                       
                        <span>Total Compra:</span>
                        <span class="tot-price">${total.toLocaleString("es-CL")}</span>
                    </div>
                    <div class="buttons btnGroup">
                        <button
                            on:click|preventDefault={() => routeToPage()}
                            class="button">Seguir Comprando</button
                        >
                        <button
                            disabled={!continuar}
                            type="button"
                            class="button"
                            on:click={onClickModal}>Confirmar Pedido</button
                        >
                    </div>
                </div>
                -->
            </div>
        </div>
    </div>
</div>

<style>
    a {
        text-decoration: none;
    }
    .bg-cdr {
        background-color: #ef0840;
    }
    a.button:focus {
        outline: 0;
        outline: 5px auto -webkit-focus-ring-color;
    }
    .mobile .button{
        width: 100% !important;
    } 
    .button {
        width: 80%;
        height: 40px;
        cursor: pointer;
        font-size: 16px;
        font-family: "Lato", sans-serif;
        font-weight: 600;
        color: #202020;
        display: block;
        -webkit-box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
        box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
        border-radius: 12px;
        margin: 2% auto; /* top otros*/
    }       
    .card-group .cw-30 {
        flex: 1 0 30%;
        max-width: 30%;
    }

    .card-group .cw-70 {
        flex: 1 0 70%;
        max-width: 70%;
    }
    .cart-header-icon {
        font-size: 70px;
        color: #ff0128;
        position: relative;
        display: inline;
        margin-left: 25px;
        margin-bottom: 10px;
    }
    .cart-header-icon span {
        font-size: 35px;
        color: #fff;
        position: relative;
        top: -21px;
        right: 64px;
    }
    .card-header-outside {
        transform: translate(18%, -50%);
        width: fit-content;
        background: white;
    }
    .prod-img {
        /* height: 220px; */
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: end;
        position: relative;
    }
    .prod-img img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        max-height: 68px;
    }
    .prod-cant{
        text-align: center;
    }
    .cart-list-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid #dbdbdb;
        border-radius: 5px;
        padding: 1em 1em 0.5em 1em;
        margin-bottom: 1em;
        position: relative;
        padding-left: 61px;
    }
    /* CSS molesto que agrega Svelte */
    .prod-actions a {
        text-decoration: none;
    }
    .prod-actions a span {
        position: relative;
        color: #fff;
        height: 50px;
        width: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #fff;
        border-radius: 50%;
        background: #ef0840;
        font-size: 16px;
    }
    .prod-price span {
        font-size: 1.2em !important;
        font-weight: bold;
        color: #cd2c2c !important;
    }
    .tot-price {
        font-size: 1.2em !important;
        font-weight: bold;
        color: #cd2c2c !important;
    }
    .prod-name h3 {
        font-size: 17px;
        color: #6d6d6d;
        font-weight: 700;
        margin-bottom: 0;
        text-transform: uppercase;
    }
    .prod-name p {
        font-size: 15px;
        color: #6d6d6d;
        margin: 0;
        text-transform: uppercase;
    }
    .prod-name {
        margin-bottom: 30px;
    }
    .btnGroup {
        margin-top: 2rem;
    }
    button:disabled,
    button[disabled]{
        border: 1px solid #999999;
        background-color: #cccccc;
        color: #666666;
        cursor: not-allowed !important;
    }
    @media only screen and (min-width: 320px) and (max-width: 767px) {
        .button{
            font-size: 14px;
        }
    }
    @media screen and (min-width: 1001px), print{
        .mobile{
            display: none !important;
        }
    }
    @media screen and (max-width: 1000px) {
        .desktop{
            display: none !important;
        }
    }
</style>
