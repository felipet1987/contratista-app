export interface ICategory {
    id: string;
    title: string;
}

export interface IFile {
    name: string;
    percent: number;
    size: number;
    status: "error" | "success" | "done" | "uploading" | "removed";
    type: string;
    uid: string;
    url: string;
}

export interface IPost {
    id: string;
    title: string;
    content: string;
    categoryId: string;
    images: IFile[];
}

interface ICliente {
    id: string;
    nombre: string;
    correo: string;
    telefono: string | null;
    referencia: string | null;
}

interface IVisita {
    id: string;
    titulo: string;
    cliente: string;
    ubicacion: string;
    detalles: string;
}

interface ITarea {
    id:string
    titulo: string;
    description: string;
    fecha_inicio: Date;
    fecha_termino: Date;
    porcentaje: number;
    visita: string;
}


