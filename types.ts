export interface Paciente {
    nome: string;
    setor: string;
    prioridade?: 'emergência' | 'urgente' | 'preferencial' | 'comum';
}

export interface Ala {
    nome: string;
    fila: Paciente[];
}


