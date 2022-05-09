<script>
    import FiltroLateral from "$lib/FiltroLateral.svelte";
    import HeaderBottomArea from "$lib/HeaderBottomArea.svelte";
    import HeroArea from "$lib/HeroArea.svelte";
    import ProductTopRight from "$lib/ProductTopRight.svelte";
    import ProductoGrilla from "$lib/ProductoGrilla.svelte";
    import ProductoLista from "$lib/ProductoLista.svelte";
    import ProductTopLeft from "$lib/ProductTopLeft.svelte";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import {
        categorias,
        laboratorios,
        productos,
        paginas,
        user,
        endpoint
    } from "$lib/store.js";
    import BotonSidebar from "$lib/BotonSidebar.svelte";
    import CollapseCart from "$lib/CollapseCart.svelte";

    let categoriasFiltro = [];
    let laboratoriosFiltro = [];

    // Categorias
    onMount(async () => {
        if($user.token != null)
        {
            fetch(endpoint + "/Categorias",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${$user.token}`
                    }
                })
                .then((response) => response.json())
                .then((data) => {
                    data = data.map((c) => c.nombre); //achicar los datos
                    categorias.set(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    });
    // Laboratorios
    onMount(async () => {
        if($user.token != null)
        {
            fetch( endpoint +"/Laboratorios",
            {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${$user.token}`
                    }
                })
                .then((response) => response.json())
                .then((data) => {
                    data = data.map((c) => c.nombre); //achicar los datos
                    laboratorios.set(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    });
    // Redireccion
    function routeToPage(route = "", replaceState = false) {
        goto(`/${route}`, { replaceState });
    }
    let modoLista = false;
    // Productos
    let nombre = "";
    let cantidad = 8;
    let page = 1;
    let orderBy = 0;
    let soloOfertas = false;
    let soloBioequivalentes = false;
    let soloNuevos = false;
    let labs = "";
    let cats = "";
    let dias = "";

    // TODO: arreglar que los parametros solo se concatenen a la URL del fetch si tienen un valor.

    $: {
        // ya que soloNuevos es una variable no reactiva
        dias = soloNuevos ? "3" : "";
        labs = laboratoriosFiltro.map((x) => `laboratorio=${x}`).join("&");
        cats = categoriasFiltro.map((x) => `categoria=${x}`).join("&"); //miau
        if( $user != null)
        {
            if( $user.token != null)
            {
                fetch(
                    endpoint +
                    `/Articulos?nombre=${nombre}&${labs}&${cats}&pagina=${page}&cantidad=${cantidad}&orderBy=${orderBy}&soloOfertas=${soloOfertas}&soloBioequivalentes=${soloBioequivalentes}&diasCreacion=${dias}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${$user.token}`
                    }
                })
                .then(function (response) {
                    //statusText = response.status;
                    return response.json();
                })
                .then((data) => {
                    // Para pasarlo al componente de Paginacion
                    paginas.set([
                        {
                            pagina: data.pagina,
                            paginas: data.paginas,
                            total: data.total,
                            items: cantidad,
                        },
                    ]);
                    // Variables para Botonera de ProductoLista
                    let t_res = data.resultados.map((x) => {
                        return { ...x, unidad: 1, aprietaUnidad: false, compraEmbalaje: 1, aprietaEmbalaje: false, popup: false };
                    });

                    productos.set(t_res);
                })
                .catch((error) => {
                    console.log(error);
                    return [];
                });
            }
        }
        modoLista = modoLista;
    }
</script>

<HeaderBottomArea bind:busqueda={nombre} />

<HeroArea />

<!-- product-area-start -->
<div class="product-area">
    <div class="container wd">
        <div class="row">
            <div class="col-lg-12">
                <div class="product-fl">
                <!--
                    {//"Para despues, quizas se pueda generalizar"} 
                    <BotonSidebar>
                        <div class="product-left">
                            <FiltroLateral
                                titulo="Categoria de Productos"
                                nombres={$categorias}
                                bind:nombresSelec={categoriasFiltro}
                            />

                            <FiltroLateral
                                titulo="Laboratorios"
                                nombres={$laboratorios}
                                bind:nombresSelec={laboratoriosFiltro}
                            />
                        </div>
                    </BotonSidebar>
                -->
                    <div class="product-left mobile">
                        <BotonSidebar>

                            <FiltroLateral
                                titulo="Categoria de Productos"
                                nombres={$categorias}
                                bind:nombresSelec={categoriasFiltro}
                            />
                            <FiltroLateral
                                titulo="Laboratorios"
                                nombres={$laboratorios}
                                bind:nombresSelec={laboratoriosFiltro}
                            />

                        </BotonSidebar>
                    </div>       

                    <div class="product-left desktop">
                        <FiltroLateral
                            titulo="Categoria de Productos"
                            nombres={$categorias}
                            bind:nombresSelec={categoriasFiltro}
                        />

                        <FiltroLateral
                            titulo="Laboratorios"
                            nombres={$laboratorios}
                            bind:nombresSelec={laboratoriosFiltro}
                        />
                    </div>

                    <div class="product-right">
                        <div class="product-top">
                            <!-- TODO: cambiar bind doble por evento -->
                            <ProductTopLeft
                                on:change={(evt) => {
                                    soloOfertas = evt.detail.ofertasActive;
                                    soloNuevos = evt.detail.nuevosActive;
                                }}
                            />

                            <ProductTopRight
                                pagination={$paginas[0]}
                                bind:listaActive={modoLista}
                                on:change={(evt) => {
                                    orderBy = evt.detail.selectedOrden;
                                    cantidad = evt.detail.selectedCantidad;
                                    page = evt.detail.currentPage;
                                }}
                            />
                        </div>
                        <ProductoGrilla
                            visible={modoLista}
                            vitrina={$productos}
                        />

                        <ProductoLista visible={modoLista} lista={$productos} />

                        <div class="product-top botom">
                            <ProductTopRight
                                pagination={$paginas[0]}
                                bind:listaActive={modoLista}
                                on:change={(evt) => {
                                    orderBy = evt.detail.selectedOrden;
                                    cantidad = evt.detail.selectedCantidad;
                                    page = evt.detail.currentPage;
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- product-area-end -->

<CollapseCart></CollapseCart>

<style>
    a {
        text-decoration: none;
    }
@media only screen and (min-width: 320px) and (max-width: 767px) {
    .product-left.desktop{
        display: none;
    }
    .product-left{
        margin-right: 0;
    }
}
@media (min-width: 768px) {
    .product-left.mobile{
        display: none;
    }
    .product-left{
        margin-right: 2%;
    }
}
</style>
