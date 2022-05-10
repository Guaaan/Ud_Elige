<!-- SCRIPTS -->
<script>
    import { onMount } from 'svelte';
    import {DataTable} from "simple-datatables"
    import dateFormat, { masks } from "dateformat";
    import { user , endpoint } from '$lib/store';
    
    // "folioFactura": 184,
    // "fechaEmision": "2014-07-21T00:00:00",
    // "fechaVencimiento": "2014-09-04T00:00:00",
    // "monto": 228730,
    // "saldo": 0


    onMount(() => {
            
            fetch(endpoint+"/Cliente/"+$user.rutCliente+"/Cartola",
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${$user.token}`
                }
            }
            )
            .then(response => response.json())       
            .then(rows =>{
                console.log(rows);
                let dataTable = new DataTable('#myTable', {

                    data: {
                        headings: ["Número Factura","Fecha Emisión","Fecha Vencimiento","Monto","Saldo" ],
                        data: rows.map(x =>[x.folioFactura, dateFormat(x.fechaEmision, "dd/mm/yyyy"), dateFormat(x.fechaVencimiento, "dd/mm/yyyy"), x.monto.toLocaleString("es-CL"), x.saldo.toLocaleString("es-CL")])
                    },
                    labels: {
                        placeholder: "Buscar...", // The search input placeholder
                        perPage: "{select} resultados por p&aacute;gina", // per-page dropdown label
                        noRows: "No hay resultados", // Message shown when there are no records to show
                        noResults: "No hay resultados relacionados a la busqueda", // Message shown when there are no search results
                        info: "Mostrando {start} a {end} de {rows} resultados" //
                    }
                });
                
                
            })       
    }); 

    

</script>

<svelte:head>
    <!-- <script type="text/javascript" src="js/jstable.min.js"></script>   -->
</svelte:head>

<!-- HTML -->
<div class="container">
    <h1>CARTOLA</h1>
    <div class="table-responsive">
        <table id="myTable">
            <thead>
            <tr>
                <th>Número Factura</th>
                <th>Fecha Emisión</th>
                <th>Fecha Vencimiento</th>
                <th>Monto</th>
                <th>Saldo</th>
            </tr>
            </thead>
            <tbody>
            <!-- {#each rows as row}
            <tr>
                <td>{row.folioFactura}</td>
                <td>{row.fechaEmision}</td>
                <td>{row.fechaVencimiento}</td>
                <td>{row.monto}</td>
                <td>{row.saldo}</td>
            </tr>
            {/each} -->
            </tbody>
        </table>
    </div>
</div>



<!-- STYLES -->
<style>
    h1{
        margin-top: 2rem;
        margin-bottom: 1rem;
        font-family: var(--bs-body-font-family);
    }
    .container{
        margin-bottom: 2rem;
    }
</style>