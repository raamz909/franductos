"use client";

import { useMemo, useState, useEffect } from "react";
import TableComponent from "../../components/TableComponent";
import { Plus, Pencil, Trash, X } from "lucide-react";

export default function ProductosPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [productos, setProductos] = useState([]);
    const [newProduct, setNewProduct] = useState({
        nombre: "",
        precio: "",
        stock: "",
        categoria: "",
        descripcion: "",
        proveedor: "",
        fecha_ingreso: "",
    });

    useEffect(() => {
        async function fetchProductos() {
            const response = await fetch("/api/productos");
            const data = await response.json();
            setProductos(data);
        }
        fetchProductos();
    }, []);

    const columns = useMemo(() => [
        { accessorKey: "id", header: "ID" },
        { accessorKey: "nombre", header: "Nombre" },
        { accessorKey: "precio", header: "Precio ($)", cell: (info) => `$${info.getValue().toFixed(2)}` },
        { accessorKey: "stock", header: "Stock" },
        {
            accessorKey: "acciones",
            header: "Acciones",
            cell: ({ row }) => (
                <div className="flex gap-2 justify-center">
                    <button 
                        className="p-2 rounded-md bg-[#E5E5E5] dark:bg-[#2C2C2C] hover:bg-[#D4D4D4] dark:hover:bg-[#3D3D3D] transition"
                        onClick={() => handleEdit(row.original)}
                    >
                        <Pencil size={18} className="text-black dark:text-white" />
                    </button>
                    <button className="p-2 rounded-md bg-[#E5E5E5] dark:bg-[#2C2C2C] hover:bg-[#D4D4D4] dark:hover:bg-[#3D3D3D] transition">
                        <Trash size={18} className="text-black dark:text-white" />
                    </button>
                </div>
            )
        },
    ], []);

    const formFields = [
        { name: "nombre", type: "text", placeholder: "Nombre del producto" },
        { name: "precio", type: "number", placeholder: "Precio" },
        { name: "stock", type: "number", placeholder: "Stock" },
        { name: "categoria", type: "text", placeholder: "Categoría" },
        { name: "descripcion", type: "text", placeholder: "Descripción" },
        { name: "proveedor", type: "text", placeholder: "Proveedor" },
        { name: "fecha_ingreso", type: "date", placeholder: "Fecha de Ingreso" },
    ];

    const handleAdd = () => {
        setNewProduct({
            nombre: "",
            precio: "",
            stock: "",
            categoria: "",
            descripcion: "",
            proveedor: "",
            fecha_ingreso: "",
        });
        setEditingProduct(null);
        setIsModalOpen(true);
    };

    const handleEdit = (product) => {
        setNewProduct(product);
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    return (
        <main className="p-6 bg-[#FAFAFA] dark:bg-[#0A0A0A] text-black dark:text-white transition-colors duration-300">
            <div className="p-5 rounded-lg shadow-md bg-white dark:bg-[#171717] dark:border-gray-700 flex justify-between items-center">
                <h1 className="text-3xl font-semibold">Productos</h1>
                
                <button 
                    className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    onClick={handleAdd}
                >
                    <Plus size={24} className="text-black dark:text-white" />
                </button>
            </div>

            <div className="mt-4">
                <TableComponent data={productos} columns={columns} />
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white dark:bg-[#171717] p-6 rounded-lg shadow-lg w-full max-w-md">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold">{editingProduct ? "Editar Producto" : "Agregar Producto"}</h2>
                            <button onClick={() => setIsModalOpen(false)}>
                                <X size={20} className="text-black dark:text-white" />
                            </button>
                        </div>

                        <div className="mt-4 space-y-3">
                            {formFields.map((field) => (
                                <input 
                                    key={field.name}
                                    type={field.type} 
                                    placeholder={field.placeholder}
                                    className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-[#2C2C2C] text-black dark:text-white"
                                    value={newProduct[field.name] || ""}
                                    onChange={(e) => setNewProduct({ ...newProduct, [field.name]: e.target.value })}
                                />
                            ))}
                        </div>

                        {/* Botones */}
                        <div className="flex justify-end gap-2 mt-4">
                            <button 
                                className="px-4 py-2 rounded-md bg-gray-300 dark:bg-gray-700 text-black dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancelar
                            </button>

                            <button 
                                className="px-4 py-2 rounded-md bg-[#2C2C2C] dark:bg-white text-white dark:text-black hover:bg-black dark:hover:bg-gray-200 transition"
                                onClick={() => {
                                    console.log(editingProduct ? "Producto editado:" : "Producto agregado:", newProduct);
                                    setIsModalOpen(false);
                                }}
                            >
                                {editingProduct ? "Guardar Cambios" : "Agregar"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
