<!-- SCRIPTS -->
<script>
    import { onMount } from 'svelte';
    import {DataTable} from "simple-datatables";
    import dateFormat, { masks } from "dateformat";
    import { user , endpoint } from '$lib/store';

    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    // Para cambiar el formato
    function toJSONLocal(date) 
    {
        var local = new Date(date);
        local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        return local.toJSON().slice(0, 10);
    }

    let fechaInicio = toJSONLocal(firstDay); // '2022-04-01';
    let fechaTermino = toJSONLocal(today);   // '2022-04-18'
    let dataTable = null;
    let dataLength = 0;

    function historial() {
            fetch(endpoint+"/Cliente/"+$user.rutCliente+"/Pedidos"+"?fechaInicio="+fechaInicio+"&fechaTermino="+fechaTermino,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${$user.token}`
                }
            }
            )
            .then(response => response.json())       
            .then(rows =>{
                let data = rows.map(x =>[
                        x.folio,
                        x.vendedor,
                        dateFormat(x.fechaEmision, "dd/mm/yyyy"),
                        x.horaEmision,
                        x.cliente,
                        x.razonSocial,
                        x.observaciones,
                        x.factura,
                        x.estado,
                        "$ "+x.valorPedido.toLocaleString()
                    ]);
                    dataLength = data.length;
                if (dataTable != null) dataTable.destroy();
                //if (dataTable == null)
                {
                    dataTable = new DataTable('#myTable', {
                    data: {
                        headings: ["Folio","Vendedor","Fecha Emisión","Hora Emisión","Cliente","Razón Social","Observaciones","Factura","Estado","Valor Pedido"],
                        data: data
                    },
                    labels: {
                        placeholder: "Buscar...", // The search input placeholder
                        perPage: "{select} resultados por p&aacute;gina", // per-page dropdown label
                        noRows: "No hay resultados", // Message shown when there are no records to show
                        noResults: "No hay resultados relacionados a la busqueda", // Message shown when there are no search results
                        info: "Mostrando {start} a {end} de {rows} resultados" //
                    }
                });
                }
                // else
                // {
                //     for(let i=0;i<dataLength;i++)                    
                //         dataTable.rows().remove(i);
                //     dataTable.rows().add(data);
                //     dataTable.refresh();
                // }
                
                
            })       
        }

    onMount(() => {
        historial();
    }); 
</script>

<!-- HTML -->

<!-- FILTERS -->
<div class="container">
    <div class="title">
        <h1>HISTORIAL DE PEDIDOS</h1>
    </div>
    <div>
        <form class="form-horizontal">
            <div class="row">
                <div class="form-group col-md-2">
                    <label for="Fecha Desde" class="control-label">Fecha Desde: </label>
                    <input type="date" class="form-control" id="startDate" bind:value={fechaInicio}>
                </div>
                <div class="form-group col-md-2">
                    <label for="Fecha Desde" class="control-label">Fecha Hasta: </label>
                    <input type="date" class="form-control" id="endDate" bind:value={fechaTermino}> 
                </div>
                <div class="form-group col-md-2 btnSearch">
                    <button type="submit" class="btn btn-primary" on:click|preventDefault={historial}><i class="fa fa-search"></i></button>
                </div>   
            </div>
        </form>
    </div>
    <hr>
    <!-- TABLE -->
    <div class="table-responsive">
        <div class="tableCont">
            <table id="myTable">
                <thead>
                <tr>
                    <!-- <th>Folio</th>
                    <th>Vendedor</th>
                    <th>Fecha Emisión</th>
                    <th>Hora Emisión</th>
                    <th>Cliente</th>
                    <th>Razón Social</th>
                    <th>Observaciones</th>
                    <th>Factura</th>
                    <th>Estado</th>
                    <th>Valor Pedido</th>
                    -->
                </tr>
                </thead>
                <tbody>
                <!-- {#each rows as row}
                <tr>
                    <td>{row.folioFactura}</td>
                    <td>{row.fechaEmision}</td>
                    <td>{row.fechaVencimiento}</td>
                </tr>
                {/each} -->
                </tbody>
            </table>
        </div>
    </div>
</div>


<!-- STYLES -->
<style>
    .title {
        margin: 20px 0 20px;
        font-family: var(--bs-body-font-family);
    }
    .btnSearch {
        align-self: flex-end;
    }
    .tableCont {
        margin: 10px 0 20px;
    }
    @media only screen and (min-width: 320px) and (max-width: 767px) {
        .btnSearch {
            text-align: center;
            margin-top: 0.8rem;  
        }
        .btn-primary {
            width: 80%;
        }
    }
</style>