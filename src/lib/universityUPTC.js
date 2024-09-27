class Semester {
    constructor(subjects, state){
        this.subjects = subjects;
        this.state = state;
    }
}

class Subject {
    constructor(code, name, credits, note, pdf){
        this.code = code;
        this.name = name;
        this.credits = credits;
        this.note = note;
        this.pdf = pdf;
    }
}      

const first = new Semester([
    new Subject("8107550", "Algoritmos y Programación", 4, 44, "/algoritmos.pdf"),
    new Subject("8107351", "Cálculo 1", 4, 31, "/calculo1.pdf"),
    new Subject("8107349", "Catedra Universidad y Entorno", 3, 41, "/catedra.pdf"),
    new Subject("8107565", "Competencias Comunicativas", 4, 39, "/competencias.pdf"),
    new Subject("8107533", "Socio Humanística I", 3, 44, "/socio1.pdf"),
], true);

const second = new Semester([
    new Subject("8107568", "Álgebra Lineal", 3, 34, "/algebra.pdf"),
    new Subject("8107567", "Cálculo II", 3, 38, "/calculo3.pdf"),
    new Subject("8107570", "Ética y Política", 4, 38, "/etica.pdf"),
    new Subject("8107566", "Física I", 4, 36, "/fisica.pdf"),
    new Subject("8108255", "Programación I", 4, 31, "/programacion1.pdf"),
    new Subject("8107569", "Expresión Gráfica y Geometría Descriptiva", 3, 49, "/expresion.pdf"),
], true);

export const semesters = [
    first,
    second
]

console.log(semesters[0].subjects[0])