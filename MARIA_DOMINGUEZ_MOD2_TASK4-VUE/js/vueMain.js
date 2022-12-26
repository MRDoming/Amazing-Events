//CAMBIAR LA FUNCION EN LA TABLA DE UPCOMING + .toFixed(2)

const app = Vue.createApp({
    data() {
        return {
            eventos: [],
            eventosBackUp: [],
            textoBuscar: "",
            categorias: [],
            filtroCheck: [],
            eventosPasados: [],
            eventosPBU: [],
            eventosFuturos: [],
            eventosFBU: [],
            tablaDos: [],
            eventoDetalle: [],
            
        }
    },
    created() {

        this.eventos = data.events
        console.log(this.eventos)

        this.eventosBackUp = this.eventos
        this.eventos.forEach(evento => !this.categorias.includes(evento.category) ? this.categorias.push(evento.category) : "")
        this.eventosFuturos = data.events.filter(evento => data.currentDate < evento.date)
        this.eventosFBU = this.eventosFuturos
        this.eventosPasados = data.events.filter(evento => evento.date < data.currentDate)
        this.eventosPBU = this.eventosPasados
        let QUERYSTRING = location.search.substring(4,)
        this.eventoDetalle = this.eventos.find(evento => evento._id == QUERYSTRING)
    
        /*fetch('https://amazing-events.herokuapp.com/api/events')
            .then(res => res.json())
            .then(data => {
                this.eventos = data.events
                this.eventosBackUp = this.eventos
                this.eventos.forEach(evento => !this.categorias.includes(evento.category) ? this.categorias.push(evento.category) : "")
                this.eventosFuturos = data.events.filter(evento => data.currentDate < evento.date)
                this.eventosFBU = this.eventosFuturos
                this.eventosPasados = data.events.filter(evento => evento.date < data.currentDate)
                this.eventosPBU = this.eventosPasados
                let QUERYSTRING = location.search.substring(4,)
                this.eventoDetalle = this.eventos.find(evento => evento._id == QUERYSTRING)
            })
            .catch(err => console.log(err))*/
    },
    mounted() {

    },
    methods: {
        bajaAsistencia(eventos) {
            function porcentaje(eventos) {
                let porcentaje = eventos.map(elemento => {
                    elemento['percentajeAtendance'] = (parseInt(elemento.assistance || elemento.estimate) / parseInt(elemento.capacity)) * 100
                })
                return porcentaje
            }
            porcentaje(eventos)
            let total = eventos.map((evento) => evento.percentajeAtendance).sort(function (a, b) { return a - b })
            let numeroFinal = total[0]
            let eventoMenorPorcentaje = eventos.find(evento => evento.percentajeAtendance == numeroFinal)
            console.log(eventoMenorPorcentaje)
            if (eventoMenorPorcentaje != undefined) {
                return eventoMenorPorcentaje.name
            }
        },
        altaAsistencia(eventos) {
            function porcentaje(eventos) {
                let porcentaje = eventos.map(elemento => {
                    elemento['percentajeAtendance'] = (parseInt(elemento.assistance || elemento.estimate) / parseInt(elemento.capacity)) * 100
                })
                return porcentaje
            }
            porcentaje(eventos)
            let total = eventos.map((evento) => evento.percentajeAtendance).sort(function (a, b) { return a - b })
            let numeroFinal = total[total.length - 1]
            let eventoMayorPorcentaje = eventos.find(evento => evento.percentajeAtendance == numeroFinal)
            if (eventoMayorPorcentaje != undefined) {
                return eventoMayorPorcentaje.name
            }
        },
        capacidadMaxima(evento) {
            let total = evento.map((evento) => parseInt(evento.capacity)).sort(function (a, b) { return a - b })
            let numeroFinal = total[total.length - 1]
            let eventoMayorCapacity = evento.find(evento => evento.capacity == numeroFinal)
            if (eventoMayorCapacity != undefined) {
                return eventoMayorCapacity.name
            }
        },
        crearArrayTabla(evento) {
            function conseguirCategorias(evento) {
                let categorias = evento.map(event => event.category)
                let filtradas = categorias.filter((categoria, indexCategoria) => categorias.indexOf(categoria) === indexCategoria)
                return filtradas
            }

            function sumaPorCategorias(evento, categoria) {
                let categoria2;
                let sumaAsistencias = 0
                let sumaCapacidad = 0
                let ganancias = 0
                let nuevoObjeto = { categoria: categoria, gananciasTotales: 0, porcentajeTotal: 0 }
                evento.filter(elemento => elemento.category == categoria).forEach(elemento2 => {
                    ganancias = parseInt(elemento2.price) * parseInt(elemento2.assistance || elemento2.estimate)
                    nuevoObjeto.gananciasTotales += ganancias
                    sumaAsistencias += parseInt(elemento2.assistance || elemento2.estimate)
                    sumaCapacidad += parseInt(elemento2.capacity)
                    categoria2 = nuevoObjeto
                })
                nuevoObjeto.porcentajeTotal = (sumaAsistencias / sumaCapacidad) * 100
                return categoria2

            }
            let arrayTablaDos = conseguirCategorias(evento).map(elemento => sumaPorCategorias(evento, elemento))
            return arrayTablaDos
        },
    },
    computed: {
        filtroDoble() {
            let primerFiltro = this.eventosBackUp.filter(evento => evento.name.toLowerCase().includes(this.textoBuscar.toLowerCase()))
            if (this.filtroCheck.length) {
                this.eventos = primerFiltro.filter(event => this.filtroCheck.includes(event.category))
            } else {
                this.eventos = primerFiltro
            }
        },
        filtroDoblePasado() {
            let primerFiltro = this.eventosPBU.filter(evento => evento.name.toLowerCase().includes(this.textoBuscar.toLowerCase()))
            if (this.filtroCheck.length) {
                this.eventosPasados = primerFiltro.filter(event => this.filtroCheck.includes(event.category))
            } else {
                this.eventosPasados = primerFiltro
            }
        },
        filtroDobleFuturo() {
            let primerFiltro = this.eventosFBU.filter(evento => evento.name.toLowerCase().includes(this.textoBuscar.toLowerCase()))
            if (this.filtroCheck.length) {
                this.eventosFuturos = primerFiltro.filter(event => this.filtroCheck.includes(event.category))
            } else {
                this.eventosFuturos = primerFiltro
            }
        },
        contact() {
            alert("Thank you for communicating with us. We will answer you as soon as possible.")
        },
    }
}).mount('#app')