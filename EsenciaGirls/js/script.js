document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       JAVASCRIPT - FORMULARIO DE CONTACTO
       ===================================================== */

    const formulario =
        document.getElementById("formularioContacto");

    if (formulario) {

        formulario.addEventListener("submit", function (evento) {

            evento.preventDefault();

            const nombre =
                document.getElementById("nombre").value.trim();

            const correo =
                document.getElementById("correo").value.trim();

            const mensaje =
                document.getElementById("mensaje").value.trim();

            const resultado =
                document.getElementById("resultadoFormulario");


            if (nombre === "" || correo === "" || mensaje === "") {

                resultado.textContent =
                    "Por favor, completa todos los campos.";

                resultado.className =
                    "mensaje-formulario error";

                return;
            }


            const formatoCorreo =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!formatoCorreo.test(correo)) {

                resultado.textContent =
                    "Por favor, ingresa un correo electrónico válido.";

                resultado.className =
                    "mensaje-formulario error";

                return;
            }


            resultado.textContent =
                "¡Gracias, " +
                nombre +
                "! Hemos recibido tu mensaje. " +
                "Nos pondremos en contacto contigo pronto.";

            resultado.className =
                "mensaje-formulario exito";


            formulario.reset();

        });

    }


    /* =====================================================
       BOTÓN VOLVER ARRIBA
       ===================================================== */

    const botonArriba =
        document.createElement("button");

    botonArriba.id = "botonArriba";

    botonArriba.innerHTML = "↑";

    botonArriba.setAttribute(
        "aria-label",
        "Volver al inicio de la página"
    );

    document.body.appendChild(botonArriba);


    window.addEventListener("scroll", function () {

        if (window.scrollY > 350) {

            botonArriba.classList.add("visible");

        } else {

            botonArriba.classList.remove("visible");

        }

    });


    botonArriba.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    /* =====================================================
       REACT - CATÁLOGO INTERACTIVO
       ===================================================== */

    const contenedorReact =
        document.getElementById("catalogoReact");


    if (contenedorReact && window.React && window.ReactDOM) {

        const productos = [

            {
                id: 1,
                nombre: "Chaqueta Acolchada",
                precio: 55000,
                imagen: "img/producto1.jpg",
                categoria: "Chaquetas"
            },

            {
                id: 2,
                nombre: "Conjunto Infantil",
                precio: 48000,
                imagen: "img/producto2.jpg",
                categoria: "Conjuntos"
            },

            {
                id: 3,
                nombre: "Camisa Cuadros",
                precio: 40000,
                imagen: "img/producto3.jpg",
                categoria: "Camisas"
            },

            {
                id: 4,
                nombre: "Vestido Estampado",
                precio: 42000,
                imagen: "img/producto4.jpg",
                categoria: "Vestidos"
            },

            {
                id: 5,
                nombre: "Conjunto Amarillo",
                precio: 39000,
                imagen: "img/producto5.jpg",
                categoria: "Conjuntos"
            },

            {
                id: 6,
                nombre: "Conjunto Casual",
                precio: 68000,
                imagen: "img/producto6.jpg",
                categoria: "Conjuntos"
            }

        ];


        const e = React.createElement;


        function Catalogo() {

            const [busqueda, setBusqueda] =
                React.useState("");

            const [categoria, setCategoria] =
                React.useState("Todos");

            const [seleccionados, setSeleccionados] =
                React.useState([]);


            const categorias = [
                "Todos",
                "Conjuntos",
                "Vestidos",
                "Chaquetas",
                "Camisas"
            ];


            const productosFiltrados =
                productos.filter(function (producto) {

                    const coincideNombre =
                        producto.nombre
                            .toLowerCase()
                            .includes(
                                busqueda.toLowerCase()
                            );


                    const coincideCategoria =
                        categoria === "Todos" ||
                        producto.categoria === categoria;


                    return coincideNombre &&
                        coincideCategoria;

                });


            function cambiarSeleccion(id) {

                if (seleccionados.includes(id)) {

                    setSeleccionados(
                        seleccionados.filter(
                            function (productoId) {

                                return productoId !== id;

                            }
                        )
                    );

                } else {

                    setSeleccionados(
                        [...seleccionados, id]
                    );

                }

            }


            return e(
                "div",
                {
                    className: "catalogo-contenido"
                },


                e(
                    "div",
                    {
                        className: "catalogo-controles"
                    },


                    e(
                        "input",
                        {
                            type: "text",
                            placeholder:
                                "🔎 Buscar producto...",
                            value: busqueda,

                            onChange:
                                function (evento) {

                                    setBusqueda(
                                        evento.target.value
                                    );

                                },

                            className: "buscador"
                        }
                    ),


                    e(
                        "div",
                        {
                            className: "filtros"
                        },

                        categorias.map(
                            function (cat) {

                                return e(
                                    "button",
                                    {
                                        key: cat,

                                        className:
                                            categoria === cat
                                                ? "filtro activo"
                                                : "filtro",

                                        onClick:
                                            function () {

                                                setCategoria(cat);

                                            }

                                    },

                                    cat
                                );

                            }
                        )

                    ),


                    e(
                        "div",
                        {
                            className:
                                "contador-seleccion"
                        },

                        "Productos seleccionados: " +
                        seleccionados.length

                    )

                ),


                e(
                    "div",
                    {
                        className: "productos"
                    },


                    productosFiltrados.length > 0

                        ? productosFiltrados.map(
                            function (producto) {

                                const seleccionado =
                                    seleccionados.includes(
                                        producto.id
                                    );


                                return e(
                                    "article",
                                    {
                                        className:
                                            "producto",

                                        key:
                                            producto.id
                                    },


                                    e(
                                        "img",
                                        {
                                            src:
                                                producto.imagen,

                                            alt:
                                                producto.nombre
                                        }
                                    ),


                                    e(
                                        "h3",
                                        null,
                                        producto.nombre
                                    ),


                                    e(
                                        "p",
                                        null,

                                        "$" +
                                        producto.precio
                                            .toLocaleString(
                                                "es-CO"
                                            )
                                    ),


                                    e(
                                        "span",
                                        {
                                            className:
                                                "categoria-producto"
                                        },

                                        producto.categoria
                                    ),


                                    e(
                                        "button",
                                        {
                                            className:
                                                seleccionado
                                                    ? "boton seleccionado"
                                                    : "boton",

                                            onClick:
                                                function () {

                                                    cambiarSeleccion(
                                                        producto.id
                                                    );

                                                }
                                        },

                                        seleccionado
                                            ? "✓ Seleccionado"
                                            : "♡ Seleccionar"

                                    )

                                );

                            }
                        )


                        : e(
                            "p",
                            {
                                className:
                                    "sin-resultados"
                            },

                            "No encontramos productos con esa búsqueda."

                        )

                )

            );

        }


        const root =
            ReactDOM.createRoot(
                contenedorReact
            );


        root.render(
            e(Catalogo)
        );

    }

});