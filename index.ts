import { Paciente, Ala } from "./types";
import * as queue from './fila';

// Lista de pacientes que chegam ao consultório
const pacientes: Paciente[] = [
    {
        nome: 'Alan Turing',
        setor: 'Ortopedista'
    },
    {
        nome: 'Ada Lovelace',
        setor: 'Ortopedista'
    },
    {
        nome: 'Grace Hopper',
        setor: 'Cardiologista'
    },
    {
        nome: 'Linus Torvalds',
        setor: 'Clínico Geral'
    },
    {
        nome: 'Margaret Hamilton',
        setor: 'Clínico Geral'
    },
    {
        nome: 'Tim Berners-Lee',
        setor: 'Cardiologista'
    },
]
console.log("\n Lista de Pacientes \n")
console.log(pacientes)
console.log('\n ----------- \n')


// Função para determinar a prioridade de cada paciente
function triagem(paciente: Paciente) {
    const prioridadesGeradas: Paciente['prioridade'][] = ['emergência', 'urgente', 'preferencial', 'comum'] // Pega as prioridades do Paciente (interface)
    const prioridadeDoPaciente = prioridadesGeradas[Math.floor(Math.random() * prioridadesGeradas.length)]; // Gera aleatório uma prioridade para cada paciente
    paciente.prioridade = prioridadeDoPaciente; // A prioridade do Paciente (interface) recebe a gerada aleatoriamente
    return paciente;
}
// "Cria" um novo array com base na função triagem e o de array de pacientes
const pacientesTriados = pacientes.map(triagem)
console.log("Lista de Pacientes com prioridades \n")
console.log(pacientesTriados)
console.log('\n ----------- \n')


// Função para organizar os pacientes por prioridade
function filaPorPrioridade(fila: Paciente[]) {
    const valorPrioridades = { // Da um numero para cada prioridade, pra depois colocar em ordem crescente (sort)
        'emergência': 1,
        'urgente': 2,
        'preferencial': 3,
        'comum': 4
    };
    // Compara dois pacientes (a e b) e suas prioridadesc
    // '!' propriedade 'prioridade' não é undefined
    return fila.sort((a, b) => valorPrioridades[a.prioridade!] - valorPrioridades[b.prioridade!])
}
const pacienteComPrioridade = filaPorPrioridade(pacientes)
console.log("Lista de Pacientes com prioridades e organizados \n")
console.log(pacienteComPrioridade)
console.log('\n ----------- \n')


// Cria as alas do consultório
const consultorio: Ala[] = [
    {
        nome: "triagem",
        fila: []
    },
    {
        nome: "Clínico Geral",
        fila: queue.create(2)
    },
    {
        nome: "Cardiologista",
        fila: queue.create(2)

    },
    {
        nome: "Ortopedista",
        fila: queue.create(2)
    },
]
console.log("Fila dos setores \n")
console.log(consultorio)
console.log('\n ----------- \n')

// Adiciona pacientes na fila de triagem
// pacientes.forEach(paciente => {
//     const pacienteTriado = triagem(paciente);
//     queue.enqueue(consultorio[0].fila, pacienteTriado);
// });

console.log("Pacientes em seus setores \n")
function triar(paciente: Paciente[]) {
    // Anda por toda a triagem
    for (let i = 0; i < paciente.length; i++) {

        // Passa um paciente pela triagem e recebe uma prioridade
        const pacienteTriado = triagem(paciente[i])

        // Verifica que setor é, colocando ele na fila
        if(pacienteTriado.setor === "Clínico Geral"){
            queue.enqueue(consultorio[1].fila, pacienteTriado) // Insere na fila do setor
            queue.dequeue(paciente) // Retira da fila da triagem
        }
        else if(pacienteTriado.setor === "Cardiologista"){
            queue.enqueue(consultorio[2].fila, pacienteTriado) // Insere na fila do setor
            queue.dequeue(paciente) // Retira da fila da triagem
        }
        else if(pacienteTriado.setor === "Ortopedista"){
            queue.enqueue(consultorio[3].fila, pacienteTriado) // Insere na fila do setor
            queue.dequeue(paciente) // Retira da fila da triagem
        }
    }
}
triar(pacientes)
console.log("\n Fila do Clínico Geral \n")
console.log(consultorio[1])
console.log('\n ----------- \n')

console.log("\n Fila do Cardiologista \n")
console.log(consultorio[2])
console.log('\n ----------- \n')

console.log("\n Fila do Ortopedista \n")
console.log(consultorio[3])
console.log('\n ----------- \n')

// Função para simular a consulta dos pacientes
function realizarConsultas() {
    consultorio.slice(1).forEach(setor => {
        while (!queue.isEmpty(setor.fila)) {
            const paciente = queue.dequeue(setor.fila);
            if (paciente) {
                console.log(`Paciente ${paciente.nome} está sendo consultado no setor ${setor.nome}`);
                return
            }
        }
    });
}
realizarConsultas()
console.log('\n ----------- \n')

// // Simula o processo completo
// function simularConsultorio() {
//     console.log("Iniciando encaminhamento para setores...");
//     encaminharParaSetor();

//     console.log("\nIniciando consultas...");
//     realizarConsultas();
// }

// simularConsultorio();
