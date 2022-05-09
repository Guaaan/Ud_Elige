<!-- SCRITPS -->
<script context="module">
    import {carro, endpoint} from '$lib/store.js' //url del endpoint
    
    /** @type {import('./[articulo]').Load} */
    export async function load({ params, fetch, session, stuff }) 
    {
        const url = endpoint + `/articulos/${params.articulo}`;
        const response = await fetch(url);
        return {
            status: response.status,
            props: {
                articulo: response.ok && (await response.json())
            }
}       ;
    }
</script>
<script>
    import { routeToPage } from "$lib/routeToPage.js";
    import Swal from 'sweetalert2';
    import BotoneraSimple from '$lib/BotoneraSimple.svelte';

    const imgPlaceholder = "./img/placeholder.jpg";
    export let articulo;

    function onClickCarro(evt)
    {
        carro.add(articulo.articuloCodigo, articulo.unidad)
        .then(data => {
            //console.log(data);
        })
        .catch(error => {
            console.log(error);
        });
        
        Swal.fire({
            title: 'Producto Agregado al Carro',
            text: `${articulo.articuloNombre} x ${articulo.unidad} en el carro`,
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#BE0D19',
            confirmButtonText: 'Seguir Comprando',
            cancelButtonText: 'Ir al carrito 🛒',
        }).then((result) => {
            if (!result.isConfirmed) {
                routeToPage("cart")
            }
        });
    }
</script>

<!-- HTML -->
<div class="container-md my-5">
    <div class="row rowDetail">

        <!-- IMAGEN   -->
        <div class="col-lg-4 col-md-12 container-img">
            {#if articulo.tieneFoto }   
                <img src="{endpoint}/Articulos/{articulo.articuloCodigo}/imagen" alt="foto" class="img-producto" />
            {:else}                
                <img src="{imgPlaceholder}" alt="foto" class="img-producto" />
            {/if}
        </div>
    
        <!-- DETALLE PRODUCTO -->
        <div class="col-lg-4 col-md-6">
            <div class="txt-sku">
                SKU <!-- 52525252 -->
                {articulo.articuloBarra}
            </div>
            <div class="prod-name">
                <!-- VITALAGENO BEAUTY 30 SOBRES -->
                {articulo.articuloNombre}
            </div>
            <div class="alt-txt">
                <!--COLAGENO, BIOTINA, VITAMINA E-->
                {#each articulo.principioActivos as activos, i}
                    {activos.activo}
                    {#if i < (articulo.principioActivos.length-1) }
                        {" , "}
                    {/if}
                {/each}
            </div>

            <div class="columns-pq">
                <div class="price-simple">
                    <!-- $7.190 -->
                    ${(articulo.unidad * articulo.precioNormal).toLocaleString("es-CL")}
                </div>
                <div class="quant">
                    <BotoneraSimple title="Cantidad:" bind:value={articulo.unidad} />
                </div>
            </div>

            <div class="btn-addcart">
                <a class="" href="/#" on:click|preventDefault="{onClickCarro}"><i class="fas fa-cart-plus mr-3" aria-hidden="true"></i>Agregar al Carro</a>
            </div>
            <div class="btn-back">
                <a href="/#" on:click|preventDefault="{()=>routeToPage("")}" class=""><i class="fas fa-long-arrow-left mr-3" aria-hidden="true"></i>  Volver</a>
            </div>
        </div>

        <!-- FICHA TECNICA -->
        <div class="col-lg-4 col-md-6">
            <div class="ficha-tecnica">
                <h5 class="title">FICHA TECNICA</h5>
                <div class="detail">
                    <div class="detail-title">
                        <span>Bioequivalente:</span>
                    </div>
                    <div class="detail-value">
                        <span>{articulo.Bioequivalente?"Si":"No"}</span>
                    </div>
                </div>
                <div class="detail">
                    <div class="detail-title">
                        <span>Dosis Farmacéutica:</span>
                    </div>
                    <div class="detail-value">
                        <span>{articulo.dosisFormaFarmaceutica}</span>
                    </div>
                </div>
                <div class="detail">
                    <div class="detail-title">
                        <span>Forma Farmacéutica:</span>
                    </div>
                    <div class="detail-value">
                        <span>{articulo.formaFarmaceutica}</span>
                    </div>
                </div>
                <div class="detail">
                    <div class="detail-title">
                        <span>Registro Sanitario:</span>
                    </div>
                    <div class="detail-value">
                        <span>{articulo.registroISP}</span>
                    </div>
                </div>
                <div class="detail">
                    <div class="detail-title">
                        <span>Vía de Administración:</span>
                    </div>
                    <div class="detail-value">
                        <span>{articulo.viaAdministracion}</span>
                    </div>
                </div>
                <div class="detail">
                    <div class="detail-title">
                        <span>Precio Fraccionado:</span>
                    </div>
                    <div class="detail-value">
                        <span>{articulo.precioFracionado}</span>
                    </div>
                </div>
            </div>
        </div> 
    </div>
</div>


<!-- STYLES -->
<style>
/* DETALLE PRODUCTO */
.rowDetail {
    align-items: center;
    border: 0 !important;
}
.ficha-tecnica {
    border: 1.5px solid #ff0129;
    border-radius: 15px;
    font-size: .9em;
    color: #848484;
    background: #fff;
    padding: 20px;
    margin: 0;
}

.container-img {
    align-content: center;
    justify-content: center;
    display: flex;
}
.img-producto {
    width: 75%;
    margin: 0;
}
.title {
    color: #565656;
    font-size: 1.25rem;
    font-weight: 700;
}
.detail {
    background: #e7e7e7;
    display: flex;
    margin: 0 0 10px 0;
    border-radius: 5px;
    padding: 10px 10px;
}
.detail-title {
    flex: 1;
}
.detail-value {
    width: 130px;
}
.txt-sku {
    font-size: 0.8em;
    color: #848484;
    font-style: italic;
    font-weight: bold;
}
.prod-name {
    color: #565656;
    font-weight: bold;
    text-decoration: none;
    font-size: 1em;
    margin: 0.3em 0
}
.alt-txt {
    color: #848484;
    font-size: 0.8em;
    margin: 0 0 10px 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-decoration: none;
    display: block;
}
.price-simple {
    min-height: 20px;
    /* position: relative; */
    font-size: 1.1em;
    font-weight: bold;
    color: #cd2c2c;
    line-height: 1.5em;
}
.columns-pq {
    display: flex;
    justify-content: space-between;
}
.btn-addcart {
    display: inline-block;
    padding: 15px 30px 15px 25px;
    margin: 20px 0;
    background-color: #ff0129;
    text-align: center;
    border-radius: 5px;
    width: 100%;
}
.btn-addcart a {
    color: #fff;
    font-weight: bold;
    font-size: 1em;
    text-decoration: none;
    transition: all 0.1s ease-in;
}
.btn-back {
    padding: 15px 30px 15px 25px;
    margin: 0 0 20px;
    background-color: #ff0129;
    text-align: center;
    border-radius: 5px;
    width: 100%;
}
.btn-back a {
    color: #fff;
    font-weight: bold;
    font-size: 1em;
    text-decoration: none;
    transition: all 0.1s ease-in;
}
</style>