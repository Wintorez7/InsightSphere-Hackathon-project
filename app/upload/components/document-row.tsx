import { Eye, Trash } from 'lucide-react';

type Props = {
  name: string;
  type: string;
  date: string;
  status: string;
};

export function DocumentRow({ name, type, date, status }: Props) {
  return (
    <tr className="border-b hover:bg-gray-50 transition">
      <td className="p-3">{name}</td>
      <td className="p-3">{type}</td>
      <td className="p-3">{date}</td>
      <td className="p-3">
        <span className="px-3 py-1 text-sm rounded bg-green-100 text-green-700">
          {status}
        </span>
      </td>
      <td className="p-3 flex gap-3">
        <button className="text-blue-600 hover:underline flex items-center gap-1">
          <Eye size={16} /> View
        </button>
        <button className="text-red-600 hover:underline flex items-center gap-1">
          <Trash size={16} /> Delete
        </button>
      </td>
    </tr>
  );
}
