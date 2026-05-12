import React from 'react';

export default function CrudTable({ title, columns, data, onAdd, onEdit, onDelete, onManageImages, loading }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#1e2730]">{title}</h1>
        {onAdd && (
          <button
            onClick={onAdd}
            className="px-4 py-2 bg-[#ea5959] text-white rounded-xl text-sm font-semibold hover:bg-[#d94848] transition-colors"
          >
            + Agregar
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400">Cargando...</div>
        ) : data.length === 0 ? (
          <div className="p-12 text-center text-gray-400">Sin registros</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                <tr>
                  {columns.map((col) => (
                    <th key={col.key} className="px-5 py-3.5 text-left font-semibold">
                      {col.label}
                    </th>
                  ))}
                  <th className="px-5 py-3.5 text-right font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                    {columns.map((col) => (
                      <td key={col.key} className="px-5 py-3.5 text-gray-700">
                        {col.render ? col.render(row[col.key], row) : (row[col.key] ?? '-')}
                      </td>
                    ))}
                    <td className="px-5 py-3.5 text-right whitespace-nowrap">
                      {onManageImages && (
                        <button
                          onClick={() => onManageImages(row)}
                          className="text-xs px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 font-semibold hover:bg-amber-100 transition-colors mr-2"
                        >
                          Imágenes
                        </button>
                      )}
                      {onEdit && (
                        <button
                          onClick={() => onEdit(row)}
                          className="text-xs px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 font-semibold hover:bg-blue-100 transition-colors mr-2"
                        >
                          Editar
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(row)}
                          className="text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-600 font-semibold hover:bg-red-100 transition-colors"
                        >
                          Eliminar
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
