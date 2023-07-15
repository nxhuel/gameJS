let planoDeNivel = `
......................
..#................#..
..#..............=.#..
..#.........o.o....#..
..#.@......#####...#..
..#####............#..
......#++++++++++++#..
......##############..
......................`;

// La siguiente clase guarda un objeto de nivel. Su argumento debe ser la cadena de carateres que define el nivel
class Nivel {
    constructor (plano) {
        let filas = plano.trim().split("\n").map(l => [...l]);
        this.height = filas.length;
        this.widht = filas [0].length;
        this.iniciarActores = [];

        this.filas = filas.map ((fila, y) => {
            return fila.map ((car, x) => {
                let tipo = caracteresDelNivel [car];
                if (typeof tipo == "string") return tipo;
                this.iniciarActores.push (
                    tipo.create (new Vector (x, y), car));
                return vacio;
            })
        });
    }
}

// Usaremos una clase Estado para dar seguimiento al estado de un juego que esta en ejecución
class Estado {
    constructor (nivel, actores, estatus) {
        this.nivel = nivel;
        this.actores = actores;
        this.estatus = estatus;
    }

    static start (nivel) {
        return new Estado (nivel, nivel.iniciarActores, "jugando");
    }

    get jugador () {
        return this.actores.find (a => a.tipo == "jugador");
    }
}
